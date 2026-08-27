import * as vscode from 'vscode';
import { ProjectCostReport, PricingConfig } from '../types';
import { ReportGenerator } from '../engine/reportGenerator';
import { getTranslation } from '../i18n';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            95
        );
        this.statusBarItem.command = 'acost.menu';
        this.statusBarItem.text = '$(sparkle) Acost: Scanning...';
        this.statusBarItem.tooltip = 'Đang quét dữ liệu chi phí dự án...';
        this.statusBarItem.show();
    }

    public update(report: ProjectCostReport | null, config: PricingConfig) {
        const t = getTranslation(config.language);
        const isEn = config.language === 'en';

        if (!report || report.totalSessions === 0) {
            this.statusBarItem.text = '$(sparkle) Acost: $0.00';
            this.statusBarItem.tooltip = new vscode.MarkdownString(t.noSessionsFound);
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

        this.statusBarItem.text = `$(sparkle) Acost: ${costStr} (${tokStr} tok)`;

        // Tooltip phong phú với Markdown song ngữ
        const tooltip = new vscode.MarkdownString();
        tooltip.isTrusted = true;

        if (isEn) {
            tooltip.appendMarkdown(`### 📊 **Acost - AI Cost & Valuation**\n\n`);
            tooltip.appendMarkdown(`- **AI Token Cost:** \`$${report.totalCostUSD.toFixed(4)}\` (~${ReportGenerator.formatNumber(report.totalCostVND)} ₫)\n`);
            tooltip.appendMarkdown(`- **Recommended Valuation:** \`$${report.valuation.recommendedValuationUSD.toFixed(2)}\` (~${ReportGenerator.formatNumber(report.valuation.recommendedValuationVND)} ₫)\n`);
            tooltip.appendMarkdown(`- **Total Tokens:** \`${ReportGenerator.formatNumber(report.totalTokens)}\` tokens\n`);
            tooltip.appendMarkdown(`- **Active Coding Time:** \`${timeStr}\` (${report.totalSessions} sessions)\n\n`);

            if (report.models.length > 0) {
                tooltip.appendMarkdown(`**Models Used:**\n`);
                for (const m of report.models) {
                    tooltip.appendMarkdown(`- **${m.displayName}:** ${m.percentageOfCost}% ($${m.costUSD.toFixed(3)})\n`);
                }
            }
            tooltip.appendMarkdown(`\n*Click to open menu & export report.*`);
        } else {
            tooltip.appendMarkdown(`### 📊 **Acost - AI Cost & Valuation**\n\n`);
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
        }

        this.statusBarItem.tooltip = tooltip;
    }

    public dispose() {
        this.statusBarItem.dispose();
    }
}
