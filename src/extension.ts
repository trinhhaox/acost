import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PricingConfig, ProjectCostReport } from './types';
import { LogScanner } from './engine/logScanner';
import { ReportGenerator } from './engine/reportGenerator';
import { StatusBarManager } from './providers/statusBarManager';
import { CostSidebarProvider } from './providers/costSidebarProvider';
import { getTranslation } from './i18n';
import { checkForUpdates } from './updater';

let scanner: LogScanner;
let statusBar: StatusBarManager;
let sidebarProvider: CostSidebarProvider;
let currentReport: ProjectCostReport | null = null;
let currentConfig: PricingConfig;
let refreshTimer: NodeJS.Timeout | null = null;
let brainWatcher: fs.FSWatcher | null = null;
let currentSelectedWorkspace: string | undefined = undefined;
let currentDateFilter: 'all' | 'today' | '7d' | '30d' = 'all';

function loadConfig(): PricingConfig {
    const wsConfig = vscode.workspace.getConfiguration('antigravityCost');
    const defaultLang = vscode.env.language.startsWith('vi') ? 'vi' : 'vi';
    return {
        language: wsConfig.get<'vi' | 'en'>('language', defaultLang),
        currency: wsConfig.get<'USD' | 'VND'>('currency', 'USD'),
        vndExchangeRate: wsConfig.get<number>('vndExchangeRate', 25500),
        markupMultiplier: wsConfig.get<number>('markupMultiplier', 2.5),
        humanHourlyRate: wsConfig.get<number>('humanHourlyRate', 25),
        customPricing: wsConfig.get<Record<string, any>>('customPricing', {})
    };
}

function getActiveWorkspacePath(): string | undefined {
    if (currentSelectedWorkspace && currentSelectedWorkspace !== 'CURRENT') {
        if (currentSelectedWorkspace === 'ALL') return undefined;
        return currentSelectedWorkspace;
    }
    const folders = vscode.workspace.workspaceFolders;
    if (folders && folders.length > 0) {
        return folders[0].uri.fsPath;
    }
    return undefined;
}

async function performScan(showNotification = false, targetWs?: string, dateFilter?: 'all' | 'today' | '7d' | '30d') {
    if (targetWs !== undefined) {
        currentSelectedWorkspace = targetWs;
    }
    if (dateFilter !== undefined) {
        currentDateFilter = dateFilter;
    }

    const wsPath = getActiveWorkspacePath();
    currentReport = await scanner.scanWorkspace(wsPath, currentDateFilter);
    statusBar.update(currentReport, currentConfig);
    sidebarProvider.updateReport(currentReport, currentConfig);

    if (showNotification && currentReport) {
        const isEn = currentConfig.language === 'en';
        if (isEn) {
            vscode.window.showInformationMessage(
                `Antigravity Cost [${currentReport.projectName}]: Scanned ${currentReport.totalSessions} sessions (${ReportGenerator.formatNumber(currentReport.totalTokens)} tokens, ~$${currentReport.totalCostUSD.toFixed(3)})`
            );
        } else {
            vscode.window.showInformationMessage(
                `Antigravity Cost [${currentReport.projectName}]: Đã quét ${currentReport.totalSessions} sessions (${ReportGenerator.formatNumber(currentReport.totalTokens)} tokens, ~$${currentReport.totalCostUSD.toFixed(3)})`
            );
        }
    }
}

async function handleExportReport(format: 'markdown' | 'html' | 'json' = 'markdown') {
    const t = getTranslation(currentConfig.language);
    if (!currentReport || currentReport.totalSessions === 0) {
        vscode.window.showWarningMessage(currentConfig.language === 'en' ? 'No cost data available to export.' : 'Chưa có dữ liệu chi phí để xuất báo cáo.');
        return;
    }

    const wsPath = getActiveWorkspacePath();
    const defaultDir = wsPath || vscode.Uri.file(process.cwd()).fsPath;

    let filename = `PROJECT_VALUATION_REPORT.md`;
    let content = '';

    if (format === 'html') {
        filename = `PROJECT_VALUATION_REPORT.html`;
        content = ReportGenerator.generateHtml(currentReport, currentConfig);
    } else if (format === 'json') {
        filename = `project_cost_data.json`;
        content = ReportGenerator.generateJson(currentReport);
    } else {
        content = ReportGenerator.generateMarkdown(currentReport, currentConfig);
    }

    const targetPath = path.join(defaultDir, filename);

    try {
        fs.writeFileSync(targetPath, content, 'utf8');
        const openAction = t.openFile;
        const successMsg = t.reportExportSuccess.replace('{filename}', filename);
        const choice = await vscode.window.showInformationMessage(successMsg, openAction);
        if (choice === openAction) {
            const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(targetPath));
            await vscode.window.showTextDocument(doc);
        }
    } catch (err: any) {
        vscode.window.showErrorMessage(t.exportError.replace('{err}', err?.message || err));
    }
}

function initLiveWatcher() {
    try {
        const brainDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');
        if (fs.existsSync(brainDir)) {
            let debounceTimer: NodeJS.Timeout | null = null;
            brainWatcher = fs.watch(brainDir, { recursive: true }, (eventType, filename) => {
                if (filename && filename.endsWith('transcript.jsonl')) {
                    if (debounceTimer) clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        performScan();
                    }, 1500);
                }
            });
        }
    } catch (err) {
        // Watcher fallback
    }
}

export function activate(context: vscode.ExtensionContext) {
    currentConfig = loadConfig();
    scanner = new LogScanner(currentConfig);
    statusBar = new StatusBarManager();

    sidebarProvider = new CostSidebarProvider(
        context.extensionUri,
        currentConfig,
        async (wsPath, filter) => {
            await performScan(true, wsPath, filter);
        },
        async (format) => {
            await handleExportReport(format);
        },
        async (newPartialConfig) => {
            currentConfig = { ...currentConfig, ...newPartialConfig };
            scanner.updateConfig(currentConfig);
            if (currentReport) {
                await performScan();
            }
        }
    );

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('antigravity-cost.sidebar', sidebarProvider)
    );

    context.subscriptions.push(statusBar);

    // Đăng ký Commands
    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-cost.refresh', async () => {
            await performScan(true);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-cost.exportReport', async () => {
            await handleExportReport('markdown');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-cost.exportHtmlReport', async () => {
            await handleExportReport('html');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-cost.openDashboard', () => {
            vscode.commands.executeCommand('antigravity-cost.sidebar.focus');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-cost.checkUpdate', async () => {
            await checkForUpdates(context, currentConfig, true);
        })
    );

    // Quick Pick Menu song ngữ
    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-cost.menu', async () => {
            const t = getTranslation(currentConfig.language);
            type MenuItem = vscode.QuickPickItem & { id: string };
            const items: MenuItem[] = [
                { id: 'dashboard', label: t.menuOpenDashboard, description: t.menuOpenDashboardDesc },
                { id: 'refresh', label: t.menuRefresh, description: t.menuRefreshDesc },
                { id: 'export_md', label: t.menuExportMd, description: t.menuExportMdDesc },
                { id: 'export_html', label: t.menuExportHtml, description: t.menuExportHtmlDesc },
                { id: 'check_update', label: t.menuCheckUpdate, description: t.menuCheckUpdateDesc },
                { id: 'toggle_currency', label: t.menuToggleCurrency, description: `Current: ${currentConfig.currency}` },
                { id: 'toggle_language', label: t.menuToggleLanguage, description: `Current: ${currentConfig.language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}` },
                { id: 'settings', label: t.menuSettings, description: t.menuSettingsDesc }
            ];

            const pick = await vscode.window.showQuickPick(items, {
                placeHolder: `Antigravity AI Cost & Valuation (${currentConfig.language.toUpperCase()})`
            });

            if (!pick) return;

            switch (pick.id) {
                case 'dashboard':
                    vscode.commands.executeCommand('antigravity-cost.sidebar.focus');
                    break;
                case 'refresh':
                    await performScan(true);
                    break;
                case 'export_md':
                    await handleExportReport('markdown');
                    break;
                case 'export_html':
                    await handleExportReport('html');
                    break;
                case 'check_update':
                    await checkForUpdates(context, currentConfig, true);
                    break;
                case 'toggle_currency': {
                    const newCurr = currentConfig.currency === 'USD' ? 'VND' : 'USD';
                    currentConfig.currency = newCurr;
                    scanner.updateConfig(currentConfig);
                    await performScan();
                    vscode.window.showInformationMessage(currentConfig.language === 'en' ? `Switched currency to: ${newCurr}` : `Đã đổi đơn vị tiền tệ sang: ${newCurr}`);
                    break;
                }
                case 'toggle_language': {
                    const newLang = currentConfig.language === 'vi' ? 'en' : 'vi';
                    currentConfig.language = newLang;
                    scanner.updateConfig(currentConfig);
                    await performScan();
                    vscode.window.showInformationMessage(newLang === 'en' ? 'Switched language to English 🇬🇧' : 'Đã đổi ngôn ngữ sang Tiếng Việt 🇻🇳');
                    break;
                }
                case 'settings':
                    vscode.commands.executeCommand('workbench.action.openSettings', 'antigravityCost');
                    break;
            }
        })
    );

    // Lắng nghe thay đổi config
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(async (e) => {
            if (e.affectsConfiguration('antigravityCost')) {
                currentConfig = loadConfig();
                scanner.updateConfig(currentConfig);
                await performScan();
            }
        })
    );

    // Lắng nghe thay đổi workspace
    context.subscriptions.push(
        vscode.workspace.onDidChangeWorkspaceFolders(async () => {
            await performScan();
        })
    );

    // Khởi động live watcher
    initLiveWatcher();

    // Scan lần đầu
    setTimeout(() => {
        performScan();
    }, 1000);

    // Tự động kiểm tra cập nhật sau 3 giây khởi động
    const autoCheck = vscode.workspace.getConfiguration('antigravityCost').get<boolean>('autoCheckUpdates', true);
    if (autoCheck) {
        setTimeout(() => {
            checkForUpdates(context, currentConfig, false);
        }, 3000);
    }

    // Định kỳ quét cập nhật mỗi 60s
    refreshTimer = setInterval(() => {
        performScan();
    }, 60000);
}

export function deactivate() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
    }
    if (brainWatcher) {
        brainWatcher.close();
        brainWatcher = null;
    }
}
