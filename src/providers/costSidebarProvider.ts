import * as vscode from 'vscode';
import { ProjectCostReport, PricingConfig } from '../types';
import { ReportGenerator } from '../engine/reportGenerator';

export class CostSidebarProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    private _currentReport: ProjectCostReport | null = null;
    private _currentConfig: PricingConfig;
    private _onRefreshCallback: (workspacePath?: string, dateFilter?: 'all' | 'today' | '7d' | '30d') => Promise<void>;
    private _onExportCallback: (type: 'markdown' | 'html' | 'json') => Promise<void>;
    private _onUpdateConfigCallback: (newConfig: Partial<PricingConfig>) => Promise<void>;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        config: PricingConfig,
        onRefresh: (workspacePath?: string, dateFilter?: 'all' | 'today' | '7d' | '30d') => Promise<void>,
        onExport: (type: 'markdown' | 'html' | 'json') => Promise<void>,
        onUpdateConfig: (newConfig: Partial<PricingConfig>) => Promise<void>
    ) {
        this._currentConfig = config;
        this._onRefreshCallback = onRefresh;
        this._onExportCallback = onExport;
        this._onUpdateConfigCallback = onUpdateConfig;
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'refresh':
                    await this._onRefreshCallback(data.workspacePath, data.dateFilter);
                    break;
                case 'exportReport':
                    await this._onExportCallback(data.format || 'markdown');
                    break;
                case 'updateConfig':
                    await this._onUpdateConfigCallback(data.config);
                    break;
                case 'copySummary': {
                    if (this._currentReport) {
                        const isVnd = this._currentConfig.currency === 'VND';
                        const cost = isVnd
                            ? `${ReportGenerator.formatNumber(this._currentReport.totalCostVND)} ₫`
                            : `$${this._currentReport.totalCostUSD.toFixed(3)}`;
                        const val = isVnd
                            ? `${ReportGenerator.formatNumber(this._currentReport.valuation.recommendedValuationVND)} ₫`
                            : `$${this._currentReport.valuation.recommendedValuationUSD.toFixed(2)}`;
                        const summary = `📊 [Antigravity AI Cost] Dự án: ${this._currentReport.projectName}\n- Chi phí Token AI: ${cost}\n- Định giá đề xuất: ${val}\n- Tổng Tokens: ${ReportGenerator.formatNumber(this._currentReport.totalTokens)}\n- Active Time: ${ReportGenerator.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`;
                        await vscode.env.clipboard.writeText(summary);
                        vscode.window.showInformationMessage('Đã sao chép tóm tắt định giá vào Clipboard!');
                    }
                    break;
                }
                case 'openSettings':
                    vscode.commands.executeCommand('workbench.action.openSettings', 'antigravityCost');
                    break;
            }
        });

        if (this._currentReport) {
            this.updateReport(this._currentReport, this._currentConfig);
        }
    }

    public updateReport(report: ProjectCostReport, config: PricingConfig) {
        this._currentReport = report;
        this._currentConfig = config;
        if (this._view) {
            this._view.webview.postMessage({
                type: 'update',
                report,
                config
            });
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Antigravity Project AI Cost</title>
    <style>
        :root {
            --bg-color: var(--vscode-sideBar-background, #18181b);
            --card-bg: var(--vscode-editor-background, #27272a);
            --card-border: var(--vscode-widget-border, #3f3f46);
            --text-color: var(--vscode-foreground, #f4f4f5);
            --text-muted: var(--vscode-descriptionForeground, #a1a1aa);
            --primary: #38bdf8;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --purple: #a855f7;
        }

        body {
            font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
            font-size: var(--vscode-font-size, 13px);
            color: var(--text-color);
            background-color: var(--bg-color);
            padding: 12px;
            margin: 0;
            line-height: 1.5;
            box-sizing: border-box;
        }

        * { box-sizing: border-box; }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--card-border);
        }

        .header-title {
            font-weight: 700;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .header-actions {
            display: flex;
            gap: 6px;
        }

        .btn-icon {
            background: transparent;
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .btn-icon:hover {
            background: var(--card-bg);
            border-color: var(--primary);
        }

        /* Project Switcher Dropdown */
        .project-select-box {
            margin-bottom: 10px;
        }
        .select-full {
            width: 100%;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 6px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
        }

        /* Filter Pills */
        .filter-pills {
            display: flex;
            gap: 4px;
            margin-bottom: 12px;
        }
        .pill {
            flex: 1;
            text-align: center;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-muted);
            padding: 4px 0;
            border-radius: 4px;
            font-size: 11px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .pill.active {
            background: var(--primary);
            color: #0f172a;
            border-color: var(--primary);
            font-weight: 700;
        }

        /* Valuation Hero Card */
        .hero-card {
            background: linear-gradient(145deg, rgba(56, 189, 248, 0.12), rgba(16, 185, 129, 0.08));
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 8px;
            padding: 14px;
            margin-bottom: 12px;
            text-align: center;
            position: relative;
        }

        .hero-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--primary);
            font-weight: 600;
        }

        .hero-value {
            font-size: 24px;
            font-weight: 800;
            margin: 4px 0;
            color: #fff;
        }

        .hero-sub {
            font-size: 12px;
            color: var(--text-muted);
        }

        .btn-copy-float {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255,255,255,0.06);
            border: 1px solid var(--card-border);
            color: var(--text-muted);
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 11px;
            cursor: pointer;
        }
        .btn-copy-float:hover {
            background: var(--primary);
            color: #000;
        }

        /* Stats Grid */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 12px;
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 6px;
            padding: 10px;
        }

        .stat-label {
            font-size: 11px;
            color: var(--text-muted);
            margin-bottom: 4px;
        }

        .stat-val {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-color);
        }

        .stat-sub {
            font-size: 11px;
            color: var(--text-muted);
            margin-top: 2px;
        }

        /* Section Titles & Tabs */
        .section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 14px 0 8px 0;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tab-bar {
            display: flex;
            border-bottom: 1px solid var(--card-border);
            margin-bottom: 10px;
        }
        .tab-item {
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            cursor: pointer;
            border-bottom: 2px solid transparent;
        }
        .tab-item.active {
            color: var(--primary);
            border-bottom-color: var(--primary);
        }

        /* Model Distribution Bars */
        .model-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 14px;
        }

        .model-item {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 6px;
            padding: 8px 10px;
        }

        .model-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            margin-bottom: 6px;
        }

        .model-name {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .model-badge {
            font-size: 9px;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .badge-google { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
        .badge-anthropic { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
        .badge-openai { background: rgba(16, 185, 129, 0.2); color: #34d399; }
        .badge-other { background: rgba(168, 85, 247, 0.2); color: #c084fc; }

        .progress-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 3px;
            overflow: hidden;
            position: relative;
        }

        .progress-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.3s ease;
        }

        .fill-google { background: #3b82f6; }
        .fill-anthropic { background: #f59e0b; }
        .fill-openai { background: #10b981; }
        .fill-other { background: #a855f7; }

        /* Configuration / Controls Form */
        .controls-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 14px;
        }

        .form-group {
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .form-group:last-child { margin-bottom: 0; }

        .form-label {
            font-size: 11px;
            color: var(--text-muted);
        }

        .form-input, .form-select {
            background: var(--bg-color);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 4px 6px;
            border-radius: 4px;
            font-size: 12px;
            width: 100px;
            text-align: right;
        }

        /* Buttons Action Bar */
        .action-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            margin-top: 14px;
        }

        .btn-primary {
            background: var(--primary);
            color: #0f172a;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }
        .btn-primary:hover { opacity: 0.9; }

        .btn-secondary {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: 500;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }
        .btn-secondary:hover { border-color: var(--primary); }

        /* File List & Sessions List */
        .list-item {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 4px;
            padding: 8px;
            margin-bottom: 6px;
            font-size: 11px;
        }
        .list-title {
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 2px;
        }
        .list-meta {
            display: flex;
            justify-content: space-between;
            color: var(--text-muted);
        }

        .empty-state {
            text-align: center;
            padding: 24px 12px;
            color: var(--text-muted);
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-title">
            <span>✨ AI Project Cost</span>
        </div>
        <div class="header-actions">
            <button class="btn-icon" id="btnRefresh" title="Làm mới dữ liệu">🔄</button>
            <button class="btn-icon" id="btnSettings" title="Cài đặt">⚙️</button>
        </div>
    </div>

    <!-- Project Switcher -->
    <div class="project-select-box">
        <select class="select-full" id="selectProject">
            <option value="CURRENT">Đang tải danh sách dự án...</option>
        </select>
    </div>

    <!-- Filter Pills -->
    <div class="filter-pills">
        <div class="pill active" data-filter="all">Tất cả</div>
        <div class="pill" data-filter="today">Hôm nay</div>
        <div class="pill" data-filter="7d">7 ngày</div>
        <div class="pill" data-filter="30d">30 ngày</div>
    </div>

    <!-- Hero Card: Valuation -->
    <div class="hero-card">
        <button class="btn-copy-float" id="btnCopySummary" title="Sao chép tóm tắt">📋 Copy</button>
        <div class="hero-label">Định Giá Hoàn Thành Đề Xuất</div>
        <div class="hero-value" id="valRecommended">$0.00</div>
        <div class="hero-sub" id="valSub">Markup x2.5 + Công vận hành AI</div>
    </div>

    <!-- Stats Grid -->
    <div class="grid-2">
        <div class="stat-card">
            <div class="stat-label">Chi Phí AI Token</div>
            <div class="stat-val" id="statApiCost">$0.00</div>
            <div class="stat-sub" id="statApiTokens">0 tokens</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Dev Truyền Thống</div>
            <div class="stat-val" id="statHumanCost">$0</div>
            <div class="stat-sub" id="statHumanHours">0h @ $25/h</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Active Coding Time</div>
            <div class="stat-val" id="statActiveTime">0s</div>
            <div class="stat-sub" id="statSessions">0 sessions</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Tiết Kiệm Ngân Sách</div>
            <div class="stat-val" style="color: var(--success);" id="statSavings">$0</div>
            <div class="stat-sub" id="statSavingsPct">0% tiết kiệm</div>
        </div>
    </div>

    <!-- Pricing / Valuation Settings -->
    <div class="section-title">
        <span>⚙️ Tham Số Định Giá</span>
    </div>
    <div class="controls-card">
        <div class="form-group">
            <span class="form-label">Tiền tệ</span>
            <select class="form-select" id="selectCurrency">
                <option value="USD">USD ($)</option>
                <option value="VND">VND (₫)</option>
            </select>
        </div>
        <div class="form-group">
            <span class="form-label">Markup Multiplier</span>
            <input class="form-input" type="number" step="0.1" min="1" max="10" id="inputMarkup" value="2.5" />
        </div>
        <div class="form-group">
            <span class="form-label">Dev Hourly Rate ($)</span>
            <input class="form-input" type="number" step="1" min="5" max="200" id="inputHourlyRate" value="25" />
        </div>
    </div>

    <!-- Models Breakdown -->
    <div class="section-title">
        <span>🤖 Tỷ Lệ AI Models</span>
    </div>
    <div class="model-list" id="modelList">
        <div class="empty-state">Đang tải dữ liệu...</div>
    </div>

    <!-- Actions -->
    <div class="action-grid">
        <button class="btn-primary" id="btnExportMd">📄 Xuất Markdown</button>
        <button class="btn-secondary" id="btnExportHtml">🌐 Xuất HTML / In</button>
    </div>

    <!-- Tabs for Sessions vs Top Files -->
    <div style="margin-top: 18px;">
        <div class="tab-bar">
            <div class="tab-item active" id="tabSessionsBtn">📝 Phiên Gần Đây (<span id="sessionCount">0</span>)</div>
            <div class="tab-item" id="tabFilesBtn">📂 File Chi Phí Cao (<span id="fileCount">0</span>)</div>
        </div>
        <div id="tabSessionsContent">
            <div id="sessionList"></div>
        </div>
        <div id="tabFilesContent" style="display: none;">
            <div id="fileList"></div>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let currentFilter = 'all';
        let currentSelectedWs = '';

        function formatNumber(num) {
            return new Intl.NumberFormat('en-US').format(Math.round(num));
        }

        function formatDuration(sec) {
            if (!sec || sec <= 0) return '0s';
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = Math.floor(sec % 60);
            if (h > 0) return h + 'h ' + m + 'm';
            if (m > 0) return m + 'm ' + s + 's';
            return s + 's';
        }

        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'update') {
                render(message.report, message.config);
            }
        });

        function render(report, config) {
            if (!report) return;

            const isVnd = config.currency === 'VND';
            document.getElementById('selectCurrency').value = config.currency;
            document.getElementById('inputMarkup').value = config.markupMultiplier;
            document.getElementById('inputHourlyRate').value = config.humanHourlyRate;

            // Project Switcher populate
            const selectProject = document.getElementById('selectProject');
            if (report.allProjects && report.allProjects.length > 0) {
                let optionsHtml = '<option value="CURRENT">📍 Dự án hiện tại (' + report.projectName + ')</option>';
                optionsHtml += '<option value="ALL">🌐 Tất Cả Dự Án Trong Máy</option>';
                for (const p of report.allProjects) {
                    const pCost = isVnd ? formatNumber(p.totalCostVND) + ' ₫' : '$' + p.totalCostUSD.toFixed(2);
                    optionsHtml += '<option value="' + p.workspacePath + '">' + p.projectName + ' (' + pCost + ')</option>';
                }
                selectProject.innerHTML = optionsHtml;
                if (currentSelectedWs) {
                    selectProject.value = currentSelectedWs;
                }
            }

            // Filter pills active update
            document.querySelectorAll('.pill').forEach(p => {
                if (p.getAttribute('data-filter') === report.dateFilter) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });

            // Hero Valuation
            const recVal = isVnd
                ? formatNumber(report.valuation.recommendedValuationVND) + ' ₫'
                : '$' + report.valuation.recommendedValuationUSD.toFixed(2);
            document.getElementById('valRecommended').innerText = recVal;
            document.getElementById('valSub').innerText = 'Markup x' + report.valuation.markupMultiplier + ' + Công vận hành AI';

            // Stats
            document.getElementById('statApiCost').innerText = isVnd
                ? formatNumber(report.totalCostVND) + ' ₫'
                : '$' + report.totalCostUSD.toFixed(3);
            document.getElementById('statApiTokens').innerText = formatNumber(report.totalTokens) + ' tokens';

            document.getElementById('statHumanCost').innerText = isVnd
                ? formatNumber(report.valuation.humanCostEquivalentVND) + ' ₫'
                : '$' + report.valuation.humanCostEquivalentUSD;
            document.getElementById('statHumanHours').innerText = report.valuation.humanHoursEquivalent + 'h @ $' + report.valuation.humanHourlyRate + '/h';

            document.getElementById('statActiveTime').innerText = formatDuration(report.activeDurationSeconds);
            document.getElementById('statSessions').innerText = report.totalSessions + ' sessions (' + report.totalTurns + ' turns)';

            const savingsVal = isVnd
                ? formatNumber(report.valuation.savingsVND) + ' ₫'
                : '$' + report.valuation.savingsUSD;
            const savingsPct = report.valuation.humanCostEquivalentUSD > 0
                ? Math.round((report.valuation.savingsUSD / report.valuation.humanCostEquivalentUSD) * 100)
                : 0;
            document.getElementById('statSavings').innerText = savingsVal;
            document.getElementById('statSavingsPct').innerText = savingsPct + '% tiết kiệm';

            // Render Models
            const modelListEl = document.getElementById('modelList');
            if (!report.models || report.models.length === 0) {
                modelListEl.innerHTML = '<div class="empty-state">Chưa phát hiện dữ liệu model trong bộ lọc này.</div>';
            } else {
                modelListEl.innerHTML = report.models.map(m => {
                    const provClass = m.provider ? m.provider.toLowerCase() : 'other';
                    const costDisplay = isVnd ? formatNumber(m.costVND) + ' ₫' : '$' + m.costUSD.toFixed(3);
                    return \`
                    <div class="model-item">
                        <div class="model-header">
                            <div class="model-name">
                                <span>\${m.displayName}</span>
                                <span class="model-badge badge-\${provClass}">\${m.provider}</span>
                            </div>
                            <div><strong>\${m.percentageOfCost}%</strong> (\${costDisplay})</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill fill-\${provClass}" style="width: \${m.percentageOfCost}%"></div>
                        </div>
                    </div>
                    \`;
                }).join('');
            }

            // Render Sessions
            const sessionListEl = document.getElementById('sessionList');
            document.getElementById('sessionCount').innerText = report.sessions ? report.sessions.length : 0;
            if (!report.sessions || report.sessions.length === 0) {
                sessionListEl.innerHTML = '<div class="empty-state">Chưa có session nào.</div>';
            } else {
                sessionListEl.innerHTML = report.sessions.slice(0, 15).map(s => {
                    const costDisplay = isVnd ? formatNumber(s.costVND) + ' ₫' : '$' + s.costUSD.toFixed(3);
                    return \`
                    <div class="list-item">
                        <div class="list-title" title="\${s.title}">\${s.title}</div>
                        <div class="list-meta">
                            <span>\${s.modelsUsed.join(', ')} • \${formatDuration(s.activeTimeSeconds)}</span>
                            <strong>\${costDisplay}</strong>
                        </div>
                    </div>
                    \`;
                }).join('');
            }

            // Render Top Files
            const fileListEl = document.getElementById('fileList');
            document.getElementById('fileCount').innerText = report.topFiles ? report.topFiles.length : 0;
            if (!report.topFiles || report.topFiles.length === 0) {
                fileListEl.innerHTML = '<div class="empty-state">Chưa có dữ liệu file.</div>';
            } else {
                fileListEl.innerHTML = report.topFiles.slice(0, 15).map(f => {
                    const costDisplay = isVnd ? formatNumber(Math.round(f.estimatedCostUSD * config.vndExchangeRate)) + ' ₫' : '$' + f.estimatedCostUSD.toFixed(3);
                    return \`
                    <div class="list-item">
                        <div class="list-title" title="\${f.filePath}">\${f.fileName}</div>
                        <div class="list-meta">
                            <span>\${f.touchesCount} lần sửa • ~\${formatNumber(f.estimatedTokens)} tok</span>
                            <strong>\${costDisplay}</strong>
                        </div>
                    </div>
                    \`;
                }).join('');
            }
        }

        // Tabs switcher
        document.getElementById('tabSessionsBtn').addEventListener('click', () => {
            document.getElementById('tabSessionsBtn').classList.add('active');
            document.getElementById('tabFilesBtn').classList.remove('active');
            document.getElementById('tabSessionsContent').style.display = 'block';
            document.getElementById('tabFilesContent').style.display = 'none';
        });

        document.getElementById('tabFilesBtn').addEventListener('click', () => {
            document.getElementById('tabFilesBtn').classList.add('active');
            document.getElementById('tabSessionsBtn').classList.remove('active');
            document.getElementById('tabFilesContent').style.display = 'block';
            document.getElementById('tabSessionsContent').style.display = 'none';
        });

        // Filter Pills Click
        document.querySelectorAll('.pill').forEach(pill => {
            pill.addEventListener('click', () => {
                currentFilter = pill.getAttribute('data-filter');
                document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                vscode.postMessage({
                    type: 'refresh',
                    workspacePath: currentSelectedWs,
                    dateFilter: currentFilter
                });
            });
        });

        // Project Dropdown Change
        document.getElementById('selectProject').addEventListener('change', (e) => {
            currentSelectedWs = e.target.value;
            vscode.postMessage({
                type: 'refresh',
                workspacePath: currentSelectedWs,
                dateFilter: currentFilter
            });
        });

        // Copy Summary
        document.getElementById('btnCopySummary').addEventListener('click', () => {
            vscode.postMessage({ type: 'copySummary' });
        });

        // Refresh & Settings
        document.getElementById('btnRefresh').addEventListener('click', () => {
            vscode.postMessage({
                type: 'refresh',
                workspacePath: currentSelectedWs,
                dateFilter: currentFilter
            });
        });

        document.getElementById('btnSettings').addEventListener('click', () => {
            vscode.postMessage({ type: 'openSettings' });
        });

        document.getElementById('btnExportMd').addEventListener('click', () => {
            vscode.postMessage({ type: 'exportReport', format: 'markdown' });
        });

        document.getElementById('btnExportHtml').addEventListener('click', () => {
            vscode.postMessage({ type: 'exportReport', format: 'html' });
        });

        document.getElementById('selectCurrency').addEventListener('change', (e) => {
            vscode.postMessage({
                type: 'updateConfig',
                config: { currency: e.target.value }
            });
        });

        document.getElementById('inputMarkup').addEventListener('change', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val > 0) {
                vscode.postMessage({
                    type: 'updateConfig',
                    config: { markupMultiplier: val }
                });
            }
        });

        document.getElementById('inputHourlyRate').addEventListener('change', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val > 0) {
                vscode.postMessage({
                    type: 'updateConfig',
                    config: { humanHourlyRate: val }
                });
            }
        });
    </script>
</body>
</html>`;
    }
}
