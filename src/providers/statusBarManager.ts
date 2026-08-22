import * as vscode from 'vscode';
import { ProjectCostReport, PricingConfig } from '../types';
import { ReportGenerator } from '../engine/reportGenerator';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            95 // Đặt ngay cạnh Auto Quota
        );
        this.statusBarItem.command = 'antigravity-cost.menu';
        this.statusBarItem.text = '$(sparkle) AI Cost: Scanning...';
        this.statusBarItem.tooltip = 'Đang quét dữ liệu chi phí dự án...';
        this.statusBarItem.show();
    }

    public update(report: ProjectCostReport | null, config: PricingConfig) {
        if (!report || report.totalSessions === 0) {
            this.statusBarItem.text = '$(sparkle) AI Cost: $0.00';
            this.statusBarItem.tooltip = new vscode.MarkdownString('Chưa phát hiện phiên làm việc AI nào trong workspace này.');
            return;
        }

        const isVnd = config.currency === 'VND';
        const costStr = isVnd
            ? `${ReportGenerator.formatNumber(report.totalCostVND)} ₫`
            : `$${report.totalCostUSD.toFixed(2)}`;

        const tokStr = report.totalTokens > 1_000_000
            ? `${(report.totalTokens / 1_000_000).toFixed(1)}M`
            : `${Math.round(report.totalTokens / 1000)}k`;

        const timeStr = ReportGenerator.formatDuration(report.activeDurationSeconds);

        this.statusBarItem.text = `$(sparkle) ${costStr} (${tokStr} tok)`;

        // Tooltip phong phú với Markdown
        const tooltip = new vscode.MarkdownString();
        tooltip.isTrusted = true;
        tooltip.appendMarkdown(`### 📊 **Antigravity AI Cost & Valuation**\n\n`);
        tooltip.appendMarkdown(`- **Chi phí AI Token:** \`$${report.totalCostUSD.toFixed(4)}\` (~${ReportGenerator.formatNumber(report.totalCostVND)} ₫)\n`);
        tooltip.appendMarkdown(`- **Định giá đề xuất:** \`$${report.valuation.recommendedValuationUSD.toFixed(2)}\` (~${ReportGenerator.formatNumber(report.valuation.recommendedValuationVND)} ₫)\n`);
        tooltip.appendMarkdown(`- **Tổng Tokens:** \`${ReportGenerator.formatNumber(report.totalTokens)}\` tokens\n`);
        tooltip.appendMarkdown(`- **Active Coding Time:** \`${timeStr}\` (${report.totalSessions} sessions)\n\n`);

        if (report.models.length > 0) {
            tooltip.appendMarkdown(`**Models Sử Dụng:**\n`);
            for (const m of report.models) {
                tooltip.appendMarkdown(`- **${m.displayName}:** ${m.percentageOfCost}% ($${m.costUSD.toFixed(3)})\n`);
            }
        }
        tooltip.appendMarkdown(`\n*Nhấp để mở menu quản lý & xuất báo cáo.*`);

        this.statusBarItem.tooltip = tooltip;
    }

    public dispose() {
        this.statusBarItem.dispose();
    }
}
