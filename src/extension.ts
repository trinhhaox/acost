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
let claudeWatcher: fs.FSWatcher | null = null;
let currentSelectedWorkspace: string | undefined = undefined;
let currentDateFilter: 'all' | 'today' | '7d' | '30d' = 'all';

function loadConfig(): PricingConfig {
    const wsConfig = vscode.workspace.getConfiguration('acost');
    const legacyConfig = vscode.workspace.getConfiguration('antigravityCost');
    const defaultLang = vscode.env.language.startsWith('vi') ? 'vi' : 'vi';
    return {
        language: wsConfig.get<'vi' | 'en'>('language', legacyConfig.get<'vi' | 'en'>('language', defaultLang)),
        currency: wsConfig.get<'USD' | 'VND'>('currency', legacyConfig.get<'USD' | 'VND'>('currency', 'USD')),
        vndExchangeRate: wsConfig.get<number>('vndExchangeRate', legacyConfig.get<number>('vndExchangeRate', 25500)),
        markupMultiplier: wsConfig.get<number>('markupMultiplier', legacyConfig.get<number>('markupMultiplier', 2.5)),
        humanHourlyRate: wsConfig.get<number>('humanHourlyRate', legacyConfig.get<number>('humanHourlyRate', 25)),
        customPricing: wsConfig.get<Record<string, any>>('customPricing', legacyConfig.get<Record<string, any>>('customPricing', {}))
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
                `Acost [${currentReport.projectName}]: Scanned ${currentReport.totalSessions} sessions (${ReportGenerator.formatNumber(currentReport.totalTokens)} tokens, ~$${currentReport.totalCostUSD.toFixed(3)})`
            );
        } else {
            vscode.window.showInformationMessage(
                `Acost [${currentReport.projectName}]: Đã quét ${currentReport.totalSessions} sessions (${ReportGenerator.formatNumber(currentReport.totalTokens)} tokens, ~$${currentReport.totalCostUSD.toFixed(3)})`
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
    let debounceTimer: NodeJS.Timeout | null = null;
    const triggerDebouncedScan = () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performScan();
        }, 1500);
    };

    // Watch Antigravity Brain logs
    try {
        const brainDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');
        if (fs.existsSync(brainDir)) {
            brainWatcher = fs.watch(brainDir, { recursive: true }, (eventType, filename) => {
                if (filename && filename.endsWith('transcript.jsonl')) {
                    triggerDebouncedScan();
                }
            });
        }
    } catch (err) {}

    // Watch Claude Code CLI logs
    try {
        const claudeDir = path.join(os.homedir(), '.claude', 'projects');
        if (fs.existsSync(claudeDir)) {
            claudeWatcher = fs.watch(claudeDir, { recursive: true }, (eventType, filename) => {
                if (filename && filename.endsWith('.jsonl')) {
                    triggerDebouncedScan();
                }
            });
        }
    } catch (err) {}
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
        vscode.window.registerWebviewViewProvider('acost.sidebar', sidebarProvider)
    );
    try {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider('antigravity-cost.sidebar', sidebarProvider)
        );
    } catch (e) {}

    context.subscriptions.push(statusBar);

    // Đăng ký Commands
    context.subscriptions.push(
        vscode.commands.registerCommand('acost.refresh', async () => {
            await performScan(true);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('acost.exportReport', async () => {
            await handleExportReport('markdown');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('acost.exportHtmlReport', async () => {
            await handleExportReport('html');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('acost.searchProject', async () => {
            const t = getTranslation(currentConfig.language);
            if (!currentReport || !currentReport.allProjects || currentReport.allProjects.length === 0) {
                await performScan();
            }

            if (!currentReport || !currentReport.allProjects || currentReport.allProjects.length === 0) {
                vscode.window.showWarningMessage(currentConfig.language === 'en' ? 'No projects found.' : 'Chưa tìm thấy dự án nào.');
                return;
            }

            const isEn = currentConfig.language === 'en';
            const isVnd = currentConfig.currency === 'VND';

            type ProjectPickItem = vscode.QuickPickItem & { wsPath: string };
            const items: ProjectPickItem[] = [];

            // 1. Option Dự án hiện tại
            items.push({
                label: `$(folder) ${isEn ? 'Current Project' : 'Dự Án Hiện Tại'}`,
                description: `(${currentReport.projectName})`,
                detail: `📍 ${currentReport.workspacePath}`,
                wsPath: 'CURRENT'
            });

            // 2. Option Tất Cả Dự Án
            items.push({
                label: `$(globe) ${isEn ? 'All Projects on Machine' : 'Tất Cả Dự Án Trong Máy'}`,
                description: `(${currentReport.allProjects.length} projects)`,
                detail: `🌐 ${isEn ? 'Summarize token & cost across all workspaces' : 'Tổng hợp token & chi phí của tất cả các dự án'}`,
                wsPath: 'ALL'
            });

            // 3. Từng dự án cụ thể
            for (const p of currentReport.allProjects) {
                const costStr = isVnd
                    ? `${ReportGenerator.formatNumber(p.totalCostVND)} ₫`
                    : `$${p.totalCostUSD.toFixed(2)}`;
                const tokStr = `${ReportGenerator.formatNumber(p.totalTokens)} tok`;
                const sessStr = `${p.totalSessions} sess`;

                items.push({
                    label: `$(file-directory) ${p.projectName}`,
                    description: `💰 ${costStr}  •  ⚡ ${tokStr}  •  📝 ${sessStr}`,
                    detail: `📍 ${p.workspacePath}`,
                    wsPath: p.workspacePath
                });
            }

            const pick = await vscode.window.showQuickPick(items, {
                placeHolder: isEn ? '🔍 Search projects by name or directory path...' : '🔍 Tìm kiếm dự án theo tên hoặc đường dẫn thư mục...',
                matchOnDescription: true,
                matchOnDetail: true
            });

            if (pick) {
                await performScan(true, pick.wsPath);
                vscode.commands.executeCommand('acost.sidebar.focus');
            }
        })
    );

    // Quick Pick Menu song ngữ
    context.subscriptions.push(
        vscode.commands.registerCommand('acost.menu', async () => {
            const t = getTranslation(currentConfig.language);
            type MenuItem = vscode.QuickPickItem & { id: string };
            const items: MenuItem[] = [
                { id: 'search_project', label: '$(search) Tìm Kiếm Dự Án (Search Projects)', description: 'Tìm nhanh theo tên, token, chi phí hoặc đường dẫn' },
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
                placeHolder: `Acost - AI Cost & Valuation (${currentConfig.language.toUpperCase()})`
            });

            if (!pick) return;

            switch (pick.id) {
                case 'search_project':
                    vscode.commands.executeCommand('acost.searchProject');
                    break;
                case 'dashboard':
                    vscode.commands.executeCommand('acost.sidebar.focus');
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
                    vscode.commands.executeCommand('workbench.action.openSettings', 'acost');
                    break;
            }
        })
    );

    // Lắng nghe thay đổi config
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(async (e) => {
            if (e.affectsConfiguration('acost') || e.affectsConfiguration('antigravityCost')) {
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

    // Tự động kiểm tra cập nhật sau 3 giây khởi động & định kỳ mỗi 2 giờ
    const autoCheck = vscode.workspace.getConfiguration('acost').get<boolean>('autoCheckUpdates',
        vscode.workspace.getConfiguration('antigravityCost').get<boolean>('autoCheckUpdates', true)
    );
    if (autoCheck) {
        setTimeout(() => {
            checkForUpdates(context, currentConfig, false);
        }, 3000);

        // Định kỳ kiểm tra cập nhật mỗi 2 giờ
        const updateCheckInterval = 2 * 60 * 60 * 1000;
        const updateTimer = setInterval(() => {
            checkForUpdates(context, currentConfig, false);
        }, updateCheckInterval);
        context.subscriptions.push({
            dispose: () => clearInterval(updateTimer)
        });
    }

    // Định kỳ quét logs mỗi 60s
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
    if (claudeWatcher) {
        claudeWatcher.close();
        claudeWatcher = null;
    }
}
