import { ProjectCostReport, PricingConfig } from '../types';

export class ReportGenerator {
    /**
     * Format số với dấu phẩy ngăn cách hàng nghìn
     */
    public static formatNumber(num: number): string {
        return new Intl.NumberFormat('en-US').format(Math.round(num));
    }

    /**
     * Format thời gian giây sang "Xh Ym Zs"
     */
    public static formatDuration(seconds: number): string {
        if (seconds <= 0) return '0s';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const parts: string[] = [];
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}m`);
        if (s > 0 || parts.length === 0) parts.push(`${s}s`);
        return parts.join(' ');
    }

    /**
     * Sinh báo cáo Markdown định giá dự án (hỗ trợ Tiếng Việt & Tiếng Anh)
     */
    public static generateMarkdown(report: ProjectCostReport, config: PricingConfig): string {
        const isEn = config.language === 'en';
        const isVnd = config.currency === 'VND';

        const formatCost = (usd: number, vnd: number) => {
            if (isVnd) {
                return `${this.formatNumber(vnd)} ₫ (${usd.toFixed(4)} USD)`;
            }
            return `$${usd.toFixed(4)} (${this.formatNumber(vnd)} ₫)`;
        };

        const formatValuation = (usd: number, vnd: number) => {
            if (isVnd) {
                return `${this.formatNumber(vnd)} ₫ ($${usd.toFixed(2)} USD)`;
            }
            return `$${usd.toFixed(2)} (${this.formatNumber(vnd)} ₫)`;
        };

        const localeStr = isEn ? 'en-US' : 'vi-VN';

        if (isEn) {
            let md = `# 📊 AI PROJECT VALUATION & COST REPORT\n\n`;
            md += `> **Project:** \`${report.projectName}\`  \n`;
            md += `> **Workspace:** \`${report.workspacePath}\`  \n`;
            md += `> **Generated Date:** \`${new Date(report.generatedAt).toLocaleString(localeStr)}\`  \n`;
            md += `> **Measurement Tool:** Antigravity AI Cost & Valuation Extension v1.2.0\n\n`;
            md += `---\n\n`;

            md += `## 1. 💰 Executive Valuation & Cost Summary\n\n`;
            md += `| Metric | Measured Value | Notes |\n`;
            md += `| :--- | :--- | :--- |\n`;
            md += `| **Total Actual AI API Cost** | **${formatCost(report.totalCostUSD, report.totalCostVND)}** | Raw token cost paid to AI model providers |\n`;
            md += `| **Recommended Project Valuation** | **${formatValuation(report.valuation.recommendedValuationUSD, report.valuation.recommendedValuationVND)}** | Applied **x${report.valuation.markupMultiplier}** Markup + AI Prompt Engineering Operator Cost |\n`;
            md += `| **Equivalent Traditional Dev Cost** | **${formatValuation(report.valuation.humanCostEquivalentUSD, report.valuation.humanCostEquivalentVND)}** | Estimated ${report.valuation.humanHoursEquivalent} hrs @ $${report.valuation.humanHourlyRate}/hr |\n`;
            md += `| **Budget Savings vs Traditional Dev** | **${formatValuation(report.valuation.savingsUSD, report.valuation.savingsVND)}** | Saved ~${report.valuation.humanCostEquivalentUSD > 0 ? Math.round((report.valuation.savingsUSD / report.valuation.humanCostEquivalentUSD) * 100) : 0}% engineering budget |\n`;
            md += `| **Total Tokens Consumed** | **${this.formatNumber(report.totalTokens)} tokens** | In: ${this.formatNumber(report.totalInputTokens)} \| Out: ${this.formatNumber(report.totalOutputTokens)} \| Thinking: ${this.formatNumber(report.totalThinkingTokens)} |\n`;
            md += `| **Active Coding Duration** | **${this.formatDuration(report.activeDurationSeconds)}** | Total active AI generation & thinking duration |\n`;
            md += `| **Total Coding Sessions** | **${report.totalSessions} sessions** | ${report.totalTurns} prompts & turn interactions |\n\n`;

            md += `## 2. 🤖 AI Models Breakdown\n\n`;
            md += `| AI Model | Provider | Input Tokens | Output Tokens | Thinking Tokens | Cost (USD) | Cost Share |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
            for (const m of report.models) {
                md += `| **${m.displayName}** | ${m.provider} | ${this.formatNumber(m.inputTokens)} | ${this.formatNumber(m.outputTokens)} | ${this.formatNumber(m.thinkingTokens)} | $${m.costUSD.toFixed(4)} | **${m.percentageOfCost}%** |\n`;
            }
            md += `\n`;

            if (report.topFiles && report.topFiles.length > 0) {
                md += `## 3. 📂 Top Cost Impact Files\n\n`;
                md += `| File Name | Touches/Edits | Est. Tokens | Est. Cost (USD) |\n`;
                md += `| :--- | :--- | :--- | :--- |\n`;
                for (const f of report.topFiles.slice(0, 10)) {
                    md += `| \`${f.fileName}\` | ${f.touchesCount} edits | ~${this.formatNumber(f.estimatedTokens)} | $${f.estimatedCostUSD.toFixed(4)} |\n`;
                }
                md += `\n`;
            }

            md += `## 4. 📝 Detailed Coding Sessions Breakdown\n\n`;
            md += `| Timestamp | User Request / Task | Models | Tokens | Active Time | Cost (USD) |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
            for (const s of report.sessions.slice(0, 50)) {
                const timeStr = new Date(s.startTime).toLocaleString(localeStr);
                const cleanTitle = s.title.replace(/\|/g, '\\|');
                const modelStr = s.modelsUsed.join(', ');
                md += `| ${timeStr} | ${cleanTitle} | ${modelStr} | ${this.formatNumber(s.totalTokens)} | ${this.formatDuration(s.activeTimeSeconds)} | $${s.costUSD.toFixed(4)} |\n`;
            }

            if (report.sessions.length > 50) {
                md += `\n*...and ${report.sessions.length - 50} other sessions aggregated into total cost metrics.*\n`;
            }

            md += `\n---\n`;
            md += `*Report automatically generated by [Antigravity AI Cost & Valuation Extension](file://${report.workspacePath}).*\n`;
            return md;
        }

        // Default Tiếng Việt
        let md = `# 📊 BÁO CÁO ĐỊNH GIÁ & CHI PHÍ LẬP TRÌNH AI (AI PROJECT VALUATION REPORT)\n\n`;
        md += `> **Dự án:** \`${report.projectName}\`  \n`;
        md += `> **Đường dẫn:** \`${report.workspacePath}\`  \n`;
        md += `> **Thời gian xuất báo cáo:** \`${new Date(report.generatedAt).toLocaleString(localeStr)}\`  \n`;
        md += `> **Công cụ đo lường:** Antigravity Cost & Valuation Extension v1.2.0\n\n`;
        md += `---\n\n`;

        md += `## 1. 💰 Tổng Quan Định Giá & Chi Phí (Executive Summary)\n\n`;
        md += `| Chỉ Số | Giá Trị Đo Lường | Ghi Chú |\n`;
        md += `| :--- | :--- | :--- |\n`;
        md += `| **Tổng Chi Phí AI API Thực Tế** | **${formatCost(report.totalCostUSD, report.totalCostVND)}** | Chi phí token trả cho nhà cung cấp AI |\n`;
        md += `| **Định Giá Hoàn Thành Đề Xuất** | **${formatValuation(report.valuation.recommendedValuationUSD, report.valuation.recommendedValuationVND)}** | Áp dụng hệ số Markup **x${report.valuation.markupMultiplier}** + Công vận hành AI |\n`;
        md += `| **Chi Phí Dev Truyền Thống Tương Đương** | **${formatValuation(report.valuation.humanCostEquivalentUSD, report.valuation.humanCostEquivalentVND)}** | Ước tính ${report.valuation.humanHoursEquivalent}h @ $${report.valuation.humanHourlyRate}/h |\n`;
        md += `| **Tiết Kiệm So Với Dev Truyền Thống** | **${formatValuation(report.valuation.savingsUSD, report.valuation.savingsVND)}** | Tiết kiệm ~${report.valuation.humanCostEquivalentUSD > 0 ? Math.round((report.valuation.savingsUSD / report.valuation.humanCostEquivalentUSD) * 100) : 0}% ngân sách |\n`;
        md += `| **Tổng Token Tiêu Thụ** | **${this.formatNumber(report.totalTokens)} tokens** | In: ${this.formatNumber(report.totalInputTokens)} \| Out: ${this.formatNumber(report.totalOutputTokens)} \| Thinking: ${this.formatNumber(report.totalThinkingTokens)} |\n`;
        md += `| **Thời Gian Active Coding** | **${this.formatDuration(report.activeDurationSeconds)}** | Tổng thời gian AI trực tiếp tạo code & suy nghĩ |\n`;
        md += `| **Tổng Số Phiên Làm Việc (Sessions)** | **${report.totalSessions} sessions** | ${report.totalTurns} lượt prompt/tương tác |\n\n`;

        md += `## 2. 🤖 Phân Bổ Theo AI Models\n\n`;
        md += `| AI Model | Nhà Cung Cấp | Input Tokens | Output Tokens | Thinking Tokens | Chi Phí (USD) | Tỷ Lệ Chi Phí |\n`;
        md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
        for (const m of report.models) {
            md += `| **${m.displayName}** | ${m.provider} | ${this.formatNumber(m.inputTokens)} | ${this.formatNumber(m.outputTokens)} | ${this.formatNumber(m.thinkingTokens)} | $${m.costUSD.toFixed(4)} | **${m.percentageOfCost}%** |\n`;
        }
        md += `\n`;

        if (report.topFiles && report.topFiles.length > 0) {
            md += `## 3. 📂 Top File Tiêu Tốn Chi Phí Lớn Nhất\n\n`;
            md += `| Tên File | Lượt Chỉnh Sửa | Ước Tính Tokens | Ước Tính Chi Phí (USD) |\n`;
            md += `| :--- | :--- | :--- | :--- |\n`;
            for (const f of report.topFiles.slice(0, 10)) {
                md += `| \`${f.fileName}\` | ${f.touchesCount} lần sửa | ~${this.formatNumber(f.estimatedTokens)} | $${f.estimatedCostUSD.toFixed(4)} |\n`;
            }
            md += `\n`;
        }

        md += `## 4. 📝 Lịch Sử Chi Tiết Các Phiên Coding (Session Breakdown)\n\n`;
        md += `| Thời Gian | Yêu Cầu / Nội Dung | Model | Tokens | Thời Lượng | Chi Phí (USD) |\n`;
        md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
        for (const s of report.sessions.slice(0, 50)) {
            const timeStr = new Date(s.startTime).toLocaleString(localeStr);
            const cleanTitle = s.title.replace(/\|/g, '\\|');
            const modelStr = s.modelsUsed.join(', ');
            md += `| ${timeStr} | ${cleanTitle} | ${modelStr} | ${this.formatNumber(s.totalTokens)} | ${this.formatDuration(s.activeTimeSeconds)} | $${s.costUSD.toFixed(4)} |\n`;
        }

        if (report.sessions.length > 50) {
            md += `\n*...và ${report.sessions.length - 50} phiên làm việc khác đã được tổng hợp vào chi phí chung.*\n`;
        }

        md += `\n---\n`;
        md += `*Báo cáo được sinh tự động bởi [Antigravity Cost & Valuation Extension](file://${report.workspacePath}).*\n`;
        return md;
    }

    /**
     * Sinh báo cáo HTML hoàn chỉnh (hỗ trợ Tiếng Việt & Tiếng Anh)
     */
    public static generateHtml(report: ProjectCostReport, config: PricingConfig): string {
        const isEn = config.language === 'en';
        const isVnd = config.currency === 'VND';
        const localeStr = isEn ? 'en-US' : 'vi-VN';

        const titleText = isEn ? `Project AI Cost & Valuation Report - ${report.projectName}` : `Báo Cáo Định Giá Dự Án - ${report.projectName}`;
        const headerTitle = isEn ? `📊 AI Project Valuation & Cost Report` : `📊 Báo Cáo Định Giá & Chi Phí Lập Trình AI`;
        const projectLabel = isEn ? 'Project' : 'Dự án';
        const dateLabel = isEn ? 'Generated Date' : 'Ngày tạo';
        const printBtnText = isEn ? '🖨️ Print / Save as PDF' : '🖨️ In / Xuất PDF';

        const card1Label = isEn ? 'Actual AI Token Cost' : 'Chi Phí AI Token Thực Tế';
        const card2Label = isEn ? 'Recommended Valuation' : 'Định Giá Đề Xuất (Valuation)';
        const card3Label = isEn ? 'Equivalent Traditional Dev' : 'Dev Truyền Thống Tương Đương';
        const card4Label = isEn ? 'Total Tokens Consumed' : 'Tổng Tokens Tiêu Thụ';

        const modelsTitle = isEn ? '🤖 AI Models Breakdown' : '🤖 Phân Bổ Theo AI Models';
        const sessionsTitle = isEn ? '📝 Detailed Sessions Breakdown' : '📝 Chi Tiết Các Phiên Làm Việc (Sessions)';

        const thModel = isEn ? 'AI Model' : 'AI Model';
        const thProvider = isEn ? 'Provider' : 'Nhà Cung Cấp';
        const thInput = isEn ? 'Input Tokens' : 'Input Tokens';
        const thOutput = isEn ? 'Output Tokens' : 'Output Tokens';
        const thThinking = isEn ? 'Thinking Tokens' : 'Thinking Tokens';
        const thCost = isEn ? 'Cost (USD)' : 'Chi Phí (USD)';
        const thShare = isEn ? 'Cost Share' : 'Tỷ Lệ';

        const thTime = isEn ? 'Timestamp' : 'Thời Gian';
        const thRequest = isEn ? 'Request / Task' : 'Yêu Cầu / Prompt';
        const thDuration = isEn ? 'Duration' : 'Thời Lượng';

        return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'vi'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titleText}</title>
    <style>
        :root {
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f8fafc;
            --text-muted: #94a3b8;
            --primary: #38bdf8;
            --success: #10b981;
            --warning: #f59e0b;
            --border: #334155;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 32px;
            line-height: 1.6;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        .header {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid var(--border);
            padding: 28px;
            border-radius: 16px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        h1 { margin: 0 0 8px 0; color: #fff; font-size: 26px; }
        .meta { color: var(--text-muted); font-size: 14px; }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        .card-label { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .card-value { font-size: 24px; font-weight: bold; margin: 8px 0; color: var(--primary); }
        .card-sub { font-size: 13px; color: var(--text-muted); }
        .card.highlight { border-color: var(--success); background: linear-gradient(180deg, rgba(16, 185, 129, 0.1), var(--card-bg)); }
        .card.highlight .card-value { color: var(--success); }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0 32px 0;
            background: var(--card-bg);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border);
        }
        th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--border); font-size: 14px; }
        th { background: #182234; color: var(--text-muted); font-weight: 600; }
        tr:last-child td { border-bottom: none; }
        .badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #334155; }
        .badge.google { background: #1e3a8a; color: #93c5fd; }
        .badge.anthropic { background: #78350f; color: #fde68a; }
        .badge.openai { background: #064e3b; color: #6ee7b7; }
        .btn-print { background: var(--primary); color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; float: right; }
        @media print {
            body { background: #fff; color: #000; padding: 0; }
            .btn-print { display: none; }
            .card, table, .header { border-color: #ddd; background: #fff; color: #000; box-shadow: none; }
            .card-value { color: #0284c7; }
            th { background: #f1f5f9; color: #333; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <button class="btn-print" onclick="window.print()">${printBtnText}</button>
            <h1>${headerTitle}</h1>
            <div class="meta">
                ${projectLabel}: <strong>${report.projectName}</strong> | Workspace: <code>${report.workspacePath}</code><br>
                ${dateLabel}: ${new Date(report.generatedAt).toLocaleString(localeStr)}
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-label">${card1Label}</div>
                <div class="card-value">$${report.totalCostUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(report.totalCostVND)} ₫</div>
            </div>
            <div class="card highlight">
                <div class="card-label">${card2Label}</div>
                <div class="card-value">$${report.valuation.recommendedValuationUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(report.valuation.recommendedValuationVND)} ₫ (x${report.valuation.markupMultiplier} Markup)</div>
            </div>
            <div class="card">
                <div class="card-label">${card3Label}</div>
                <div class="card-value">$${report.valuation.humanCostEquivalentUSD}</div>
                <div class="card-sub">${report.valuation.humanHoursEquivalent}h @ $${report.valuation.humanHourlyRate}/h</div>
            </div>
            <div class="card">
                <div class="card-label">${card4Label}</div>
                <div class="card-value">${this.formatNumber(report.totalTokens)}</div>
                <div class="card-sub">Active Time: ${this.formatDuration(report.activeDurationSeconds)}</div>
            </div>
        </div>

        <h2>${modelsTitle}</h2>
        <table>
            <thead>
                <tr>
                    <th>${thModel}</th>
                    <th>${thProvider}</th>
                    <th>${thInput}</th>
                    <th>${thOutput}</th>
                    <th>${thThinking}</th>
                    <th>${thCost}</th>
                    <th>${thShare}</th>
                </tr>
            </thead>
            <tbody>
                ${report.models.map(m => `
                <tr>
                    <td><strong>${m.displayName}</strong></td>
                    <td><span class="badge ${m.provider.toLowerCase()}">${m.provider}</span></td>
                    <td>${this.formatNumber(m.inputTokens)}</td>
                    <td>${this.formatNumber(m.outputTokens)}</td>
                    <td>${this.formatNumber(m.thinkingTokens)}</td>
                    <td>$${m.costUSD.toFixed(4)}</td>
                    <td><strong>${m.percentageOfCost}%</strong></td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <h2>${sessionsTitle}</h2>
        <table>
            <thead>
                <tr>
                    <th>${thTime}</th>
                    <th>${thRequest}</th>
                    <th>${thModel}</th>
                    <th>Tokens</th>
                    <th>${thDuration}</th>
                    <th>${thCost}</th>
                </tr>
            </thead>
            <tbody>
                ${report.sessions.slice(0, 100).map(s => `
                <tr>
                    <td>${new Date(s.startTime).toLocaleString(localeStr)}</td>
                    <td>${s.title}</td>
                    <td>${s.modelsUsed.join(', ')}</td>
                    <td>${this.formatNumber(s.totalTokens)}</td>
                    <td>${this.formatDuration(s.activeTimeSeconds)}</td>
                    <td>$${s.costUSD.toFixed(4)}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
</body>
</html>`;
    }

    /**
     * Sinh dữ liệu JSON
     */
    public static generateJson(report: ProjectCostReport): string {
        return JSON.stringify(report, null, 2);
    }
}
