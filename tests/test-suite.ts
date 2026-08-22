import { LogScanner } from '../src/engine/logScanner';
import { PricingEngine, DEFAULT_MODEL_PRICING } from '../src/engine/pricingEngine';
import { Tokenizer } from '../src/engine/tokenizer';
import { ReportGenerator } from '../src/engine/reportGenerator';
import { PricingConfig } from '../src/types';

async function runTestSuite() {
    console.log('====================================================');
    console.log('🧪 BẮT ĐẦU KIỂM THỬ TOÀN DIỆN EXTENSION ANTIGRAVITY-COST');
    console.log('====================================================\n');

    let passedTests = 0;
    let failedTests = 0;

    function assert(condition: boolean, testName: string, detail?: string) {
        if (condition) {
            console.log(`  ✅ [PASS] ${testName}`);
            passedTests++;
        } else {
            console.error(`  ❌ [FAIL] ${testName} - ${detail || ''}`);
            failedTests++;
        }
    }

    const testConfig: PricingConfig = {
        language: 'vi',
        currency: 'USD',
        vndExchangeRate: 25500,
        markupMultiplier: 2.5,
        humanHourlyRate: 25
    };

    // 1. TEST TOKENIZER
    console.log('--- 1. Kiểm thử Tokenizer Engine ---');
    const emptyTokens = Tokenizer.estimateTokens('');
    assert(emptyTokens === 0, 'Đếm token chuỗi rỗng trả về 0');

    const sampleEnglish = 'Hello world, this is a test prompt for Antigravity AI Cost extension.';
    const engTokens = Tokenizer.estimateTokens(sampleEnglish);
    assert(engTokens > 10 && engTokens < 30, `Đếm token English hợp lý (${engTokens} tokens)`);

    const sampleVietnamese = 'Xin chào, đây là dự án đo lường chi phí lập trình và định giá mã nguồn AI.';
    const vnTokens = Tokenizer.estimateTokens(sampleVietnamese);
    assert(vnTokens > 15 && vnTokens < 40, `Đếm token Tiếng Việt có dấu hợp lý (${vnTokens} tokens)`);

    const sampleCode = 'function calculateCost(tokens: number, rate: number): number { return (tokens / 1000000) * rate; }';
    const codeTokens = Tokenizer.estimateTokens(sampleCode);
    assert(codeTokens > 15 && codeTokens < 40, `Đếm token Code TypeScript hợp lý (${codeTokens} tokens)`);


    // 2. TEST PRICING ENGINE
    console.log('\n--- 2. Kiểm thử Pricing Engine & Model Normalization ---');
    const pricing = new PricingEngine(testConfig);

    assert(pricing.normalizeModelKey('Gemini 3.7 Flash (Medium)') === 'gemini-3.7-flash', 'Nhận diện Gemini 3.7 Flash');
    assert(pricing.normalizeModelKey('Gemini 3.6 Flash (High)') === 'gemini-3.6-flash', 'Nhận diện Gemini 3.6 Flash');
    assert(pricing.normalizeModelKey('Gemini 3.1 Pro (High)') === 'gemini-3.1-pro', 'Nhận diện Gemini 3.1 Pro');
    assert(pricing.normalizeModelKey('Claude Sonnet 4.6 (Thinking)') === 'claude-sonnet-4.6', 'Nhận diện Claude Sonnet 4.6');
    assert(pricing.normalizeModelKey('Claude Opus 4.6 (Thinking)') === 'claude-opus-4.6', 'Nhận diện Claude Opus 4.6');
    assert(pricing.normalizeModelKey('GPT-4o') === 'gpt-4o', 'Nhận diện GPT-4o');

    // Test tính chi phí 1M input + 1M output Gemini 3.7 Flash
    // Giá: Input $0.15/1M, Output $0.60/1M => Tổng $0.75
    const costGemini = pricing.calculateCostUSD('gemini-3.7-flash', 1_000_000, 1_000_000, 0);
    assert(Math.abs(costGemini - 0.75) < 0.0001, `Tính đúng chi phí Gemini 3.7 Flash ($${costGemini} / 2M tok)`);

    // Test tính chi phí Claude Sonnet 4.6 (Input $3.00, Output $15.00)
    const costClaude = pricing.calculateCostUSD('claude-sonnet-4.6', 1_000_000, 1_000_000, 500_000);
    // 1M input ($3) + 1.5M output ($22.5) = $25.5
    assert(Math.abs(costClaude - 25.5) < 0.0001, `Tính đúng chi phí Claude Sonnet 4.6 kèm thinking ($${costClaude})`);

    // Test quy đổi VND
    const vndVal = pricing.usdToVnd(10);
    assert(vndVal === 255000, `Chuyển đổi USD sang VND chính xác ($10 -> ${vndVal} ₫)`);

    // Test Valuation calculation
    const val = pricing.calculateValuation(10, 3600 * 5, 200_000, 50);
    assert(val.apiCostUSD === 10, 'Valuation API cost USD đúng');
    assert(val.markupMultiplier === 2.5, 'Valuation markup đúng');
    assert(val.recommendedValuationUSD > 25, `Định giá đề xuất hợp lý ($${val.recommendedValuationUSD})`);
    assert(val.humanCostEquivalentUSD > val.recommendedValuationUSD, `Tiết kiệm ngân sách so với thuê Dev ($${val.savingsUSD} savings)`);


    // 3. TEST LOG SCANNER TRÊN LOGS THỰC TẾ
    console.log('\n--- 3. Kiểm thử LogScanner trên Dữ Liệu Thực Tế ---');
    const scanner = new LogScanner(testConfig);

    // Test scan All Projects
    const allReport = await scanner.scanWorkspace();
    assert(allReport.totalSessions > 0, `Đã quét thành công ${allReport.totalSessions} sessions`);
    assert(allReport.totalTokens > 0, `Đã tính được ${allReport.totalTokens.toLocaleString()} tokens`);
    assert(allReport.totalCostUSD > 0, `Đã tính tổng chi phí: $${allReport.totalCostUSD}`);
    assert(allReport.models.length >= 3, `Phát hiện ${allReport.models.length} loại AI Models khác nhau`);
    assert(allReport.allProjects.length > 0, `Danh sách ${allReport.allProjects.length} dự án đã từng làm việc`);

    // Test Date Filters
    console.log('\n--- 4. Kiểm thử Bộ Lọc Thời Gian (Date Filters) ---');
    const reportToday = await scanner.scanWorkspace(undefined, 'today');
    assert(reportToday.dateFilter === 'today', 'Date filter Today hoạt động');
    assert(reportToday.totalSessions <= allReport.totalSessions, `Sessions hôm nay: ${reportToday.totalSessions} / ${allReport.totalSessions}`);

    const report7d = await scanner.scanWorkspace(undefined, '7d');
    assert(report7d.dateFilter === '7d', 'Date filter 7d hoạt động');
    assert(report7d.totalSessions <= allReport.totalSessions, `Sessions 7 ngày qua: ${report7d.totalSessions} / ${allReport.totalSessions}`);

    const report30d = await scanner.scanWorkspace(undefined, '30d');
    assert(report30d.dateFilter === '30d', 'Date filter 30d hoạt động');
    assert(report30d.totalSessions <= allReport.totalSessions, `Sessions 30 ngày qua: ${report30d.totalSessions} / ${allReport.totalSessions}`);


    // 5. TEST REPORT GENERATOR (VI & EN)
    console.log('\n--- 5. Kiểm thử Xuất Báo Cáo Định Giá (Song Ngữ VI / EN) ---');
    const markdownReportVi = ReportGenerator.generateMarkdown(allReport, { ...testConfig, language: 'vi' });
    assert(markdownReportVi.includes('# 📊 BÁO CÁO ĐỊNH GIÁ & CHI PHÍ LẬP TRÌNH AI'), 'Sinh đúng tiêu đề Markdown Report (VI)');
    assert(markdownReportVi.includes('Tổng Chi Phí AI API Thực Tế'), 'Markdown có bảng Tổng quan định giá (VI)');

    const markdownReportEn = ReportGenerator.generateMarkdown(allReport, { ...testConfig, language: 'en' });
    assert(markdownReportEn.includes('# 📊 AI PROJECT VALUATION & COST REPORT'), 'Sinh đúng tiêu đề Markdown Report (EN)');
    assert(markdownReportEn.includes('Total Actual AI API Cost'), 'Markdown có bảng Valuation Summary (EN)');
    assert(markdownReportEn.includes('AI Models Breakdown'), 'Markdown có bảng AI Models Breakdown (EN)');

    const htmlReportVi = ReportGenerator.generateHtml(allReport, { ...testConfig, language: 'vi' });
    assert(htmlReportVi.includes('Báo Cáo Định Giá & Chi Phí Lập Trình AI'), 'HTML có giao diện Tiếng Việt');

    const htmlReportEn = ReportGenerator.generateHtml(allReport, { ...testConfig, language: 'en' });
    assert(htmlReportEn.includes('AI Project Valuation & Cost Report'), 'HTML có giao diện Tiếng Anh');
    assert(htmlReportEn.includes('Print / Save as PDF'), 'HTML Tiếng Anh có nút Print PDF');

    const jsonReport = ReportGenerator.generateJson(allReport);
    const parsedJson = JSON.parse(jsonReport);
    assert(parsedJson.totalTokens === allReport.totalTokens, 'JSON xuất đầy đủ dữ liệu');

    // 6. TEST UPDATER ENGINE
    console.log('\n--- 6. Kiểm thử Updater Engine (So sánh phiên bản GitHub) ---');
    const { isNewerVersion } = require('../src/utils/version');
    assert(isNewerVersion('1.2.0', '1.3.0') === true, 'Phát hiện minor version mới (1.2.0 -> 1.3.0)');
    assert(isNewerVersion('1.2.0', '1.2.1') === true, 'Phát hiện patch version mới (1.2.0 -> 1.2.1)');
    assert(isNewerVersion('1.2.0', '2.0.0') === true, 'Phát hiện major version mới (1.2.0 -> 2.0.0)');
    assert(isNewerVersion('1.2.0', '1.2.0') === false, 'Không báo update khi cùng version (1.2.0 == 1.2.0)');
    assert(isNewerVersion('1.2.0', '1.1.9') === false, 'Không báo update khi version thấp hơn (1.2.0 > 1.1.9)');
    assert(isNewerVersion('v1.2.0', 'v1.3.0') === true, 'Xử lý tiền tố v tốt (v1.2.0 -> v1.3.0)');


    // TỔNG KẾT
    console.log('\n====================================================');
    console.log(`🏁 KẾT QUẢ TEST SUITE: ${passedTests} PASSED, ${failedTests} FAILED`);
    console.log('====================================================\n');

    if (failedTests > 0) {
        process.exit(1);
    }
}

runTestSuite().catch(err => {
    console.error('Lỗi khi chạy test suite:', err);
    process.exit(1);
});
