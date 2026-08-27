import { ModelPricing, PricingConfig, ProjectValuation } from '../types';

export const DEFAULT_MODEL_PRICING: Record<string, ModelPricing> = {
    // Google Gemini Models
    'gemini-3.7-flash': {
        displayName: 'Gemini 3.7 Flash',
        provider: 'Google',
        inputPricePerMillion: 0.15,
        outputPricePerMillion: 0.60,
        cacheReadPricePerMillion: 0.0375
    },
    'gemini-3.6-flash': {
        displayName: 'Gemini 3.6 Flash',
        provider: 'Google',
        inputPricePerMillion: 0.15,
        outputPricePerMillion: 0.60,
        cacheReadPricePerMillion: 0.0375
    },
    'gemini-3.5-flash': {
        displayName: 'Gemini 3.5 Flash',
        provider: 'Google',
        inputPricePerMillion: 0.10,
        outputPricePerMillion: 0.40,
        cacheReadPricePerMillion: 0.025
    },
    'gemini-3.1-pro': {
        displayName: 'Gemini 3.1 Pro',
        provider: 'Google',
        inputPricePerMillion: 1.25,
        outputPricePerMillion: 5.00,
        cacheReadPricePerMillion: 0.3125
    },
    'gemini-2.5-pro': {
        displayName: 'Gemini 2.5 Pro',
        provider: 'Google',
        inputPricePerMillion: 1.25,
        outputPricePerMillion: 5.00,
        cacheReadPricePerMillion: 0.3125
    },
    'gemini-2.5-flash': {
        displayName: 'Gemini 2.5 Flash',
        provider: 'Google',
        inputPricePerMillion: 0.075,
        outputPricePerMillion: 0.30,
        cacheReadPricePerMillion: 0.01875
    },
    'gemini-1.5-pro': {
        displayName: 'Gemini 1.5 Pro',
        provider: 'Google',
        inputPricePerMillion: 1.25,
        outputPricePerMillion: 5.00,
        cacheReadPricePerMillion: 0.3125
    },
    'gemini-1.5-flash': {
        displayName: 'Gemini 1.5 Flash',
        provider: 'Google',
        inputPricePerMillion: 0.075,
        outputPricePerMillion: 0.30,
        cacheReadPricePerMillion: 0.01875
    },

    // Anthropic Claude Models
    'claude-sonnet-4.6': {
        displayName: 'Claude Sonnet 4.6 (Thinking)',
        provider: 'Anthropic',
        inputPricePerMillion: 3.00,
        outputPricePerMillion: 15.00,
        cacheReadPricePerMillion: 0.30
    },
    'claude-opus-4.6': {
        displayName: 'Claude Opus 4.6 (Thinking)',
        provider: 'Anthropic',
        inputPricePerMillion: 15.00,
        outputPricePerMillion: 75.00,
        cacheReadPricePerMillion: 1.50
    },
    'claude-3.7-sonnet': {
        displayName: 'Claude 3.7 Sonnet',
        provider: 'Anthropic',
        inputPricePerMillion: 3.00,
        outputPricePerMillion: 15.00,
        cacheReadPricePerMillion: 0.30
    },
    'claude-3.5-sonnet': {
        displayName: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        inputPricePerMillion: 3.00,
        outputPricePerMillion: 15.00,
        cacheReadPricePerMillion: 0.30
    },
    'claude-3.5-haiku': {
        displayName: 'Claude 3.5 Haiku',
        provider: 'Anthropic',
        inputPricePerMillion: 0.80,
        outputPricePerMillion: 4.00,
        cacheReadPricePerMillion: 0.08
    },
    'claude-3-opus': {
        displayName: 'Claude 3 Opus',
        provider: 'Anthropic',
        inputPricePerMillion: 15.00,
        outputPricePerMillion: 75.00,
        cacheReadPricePerMillion: 1.50
    },

    // OpenAI Models
    'gpt-4o': {
        displayName: 'GPT-4o',
        provider: 'OpenAI',
        inputPricePerMillion: 2.50,
        outputPricePerMillion: 10.00,
        cacheReadPricePerMillion: 1.25
    },
    'gpt-4o-mini': {
        displayName: 'GPT-4o mini',
        provider: 'OpenAI',
        inputPricePerMillion: 0.15,
        outputPricePerMillion: 0.60,
        cacheReadPricePerMillion: 0.075
    },
    'o3-mini': {
        displayName: 'o3-mini',
        provider: 'OpenAI',
        inputPricePerMillion: 1.10,
        outputPricePerMillion: 4.40,
        cacheReadPricePerMillion: 0.55
    },
    'o1': {
        displayName: 'o1',
        provider: 'OpenAI',
        inputPricePerMillion: 15.00,
        outputPricePerMillion: 60.00,
        cacheReadPricePerMillion: 7.50
    },

    // Fallback Default
    'default': {
        displayName: 'Standard AI Model',
        provider: 'Other',
        inputPricePerMillion: 0.50,
        outputPricePerMillion: 1.50,
        cacheReadPricePerMillion: 0.10
    }
};

export class PricingEngine {
    private pricingTable: Record<string, ModelPricing>;
    private config: PricingConfig;

    constructor(config: PricingConfig) {
        this.config = config;
        this.pricingTable = { ...DEFAULT_MODEL_PRICING };

        if (config.customPricing) {
            for (const [key, val] of Object.entries(config.customPricing)) {
                if (this.pricingTable[key]) {
                    this.pricingTable[key] = { ...this.pricingTable[key], ...val };
                } else if (val.inputPricePerMillion !== undefined && val.outputPricePerMillion !== undefined) {
                    this.pricingTable[key] = {
                        displayName: val.displayName || key,
                        provider: val.provider || 'Other',
                        inputPricePerMillion: val.inputPricePerMillion,
                        outputPricePerMillion: val.outputPricePerMillion,
                        cacheReadPricePerMillion: val.cacheReadPricePerMillion || 0
                    };
                }
            }
        }
    }

    /**
     * Chuẩn hóa tên model từ transcript sang key tra cứu bảng giá
     */
    public normalizeModelKey(rawName: string | null | undefined): string {
        if (!rawName) return 'gemini-3.7-flash'; // Mặc định trong Antigravity

        const lower = rawName.toLowerCase();

        // Gemini
        if (lower.includes('3.7') && lower.includes('flash')) return 'gemini-3.7-flash';
        if (lower.includes('3.6') && lower.includes('flash')) return 'gemini-3.6-flash';
        if (lower.includes('3.5') && lower.includes('flash')) return 'gemini-3.5-flash';
        if (lower.includes('3.1') && lower.includes('pro')) return 'gemini-3.1-pro';
        if (lower.includes('2.5') && lower.includes('pro')) return 'gemini-2.5-pro';
        if (lower.includes('2.5') && lower.includes('flash')) return 'gemini-2.5-flash';
        if (lower.includes('1.5') && lower.includes('pro')) return 'gemini-1.5-pro';
        if (lower.includes('1.5') && lower.includes('flash')) return 'gemini-1.5-flash';

        // Claude
        if (lower.includes('claude') && lower.includes('sonnet') && lower.includes('4.6')) return 'claude-sonnet-4.6';
        if (lower.includes('claude') && lower.includes('opus') && lower.includes('4.6')) return 'claude-opus-4.6';
        if (lower.includes('claude') && lower.includes('3.7') && lower.includes('sonnet')) return 'claude-3.7-sonnet';
        if (lower.includes('claude-3-7-sonnet')) return 'claude-3.7-sonnet';
        if (lower.includes('claude') && lower.includes('3.5') && lower.includes('sonnet')) return 'claude-3.5-sonnet';
        if (lower.includes('claude-3-5-sonnet')) return 'claude-3.5-sonnet';
        if (lower.includes('claude') && lower.includes('haiku')) return 'claude-3.5-haiku';
        if (lower.includes('claude-haiku')) return 'claude-3.5-haiku';
        if (lower.includes('claude') && lower.includes('opus')) return 'claude-3-opus';
        if (lower.includes('claude-3-opus')) return 'claude-3-opus';

        // OpenAI
        if (lower.includes('gpt-4o-mini') || lower.includes('4o-mini')) return 'gpt-4o-mini';
        if (lower.includes('gpt-4o') || lower.includes('4o')) return 'gpt-4o';
        if (lower.includes('o3-mini')) return 'o3-mini';
        if (lower.includes('o1')) return 'o1';

        // General Fallbacks
        if (lower.includes('gemini')) return 'gemini-3.7-flash';
        if (lower.includes('claude')) return 'claude-3.7-sonnet';
        if (lower.includes('gpt')) return 'gpt-4o';

        return 'default';
    }

    public getModelPricing(modelKey: string): ModelPricing {
        const normalized = this.normalizeModelKey(modelKey);
        return this.pricingTable[normalized] || this.pricingTable['default'];
    }

    /**
     * Tính chi phí token theo USD (hỗ trợ cả Cache Read và Cache Creation)
     */
    public calculateCostUSD(
        modelKey: string,
        inputTokens: number,
        outputTokens: number,
        thinkingTokens: number = 0,
        cacheCreationTokens: number = 0,
        cacheReadTokens: number = 0
    ): number {
        const pricing = this.getModelPricing(modelKey);
        const totalOutput = outputTokens + thinkingTokens;

        const inputCost = (inputTokens / 1_000_000) * pricing.inputPricePerMillion;
        const outputCost = (totalOutput / 1_000_000) * pricing.outputPricePerMillion;
        const cacheReadRate = pricing.cacheReadPricePerMillion !== undefined ? pricing.cacheReadPricePerMillion : (pricing.inputPricePerMillion * 0.1);
        const cacheReadCost = (cacheReadTokens / 1_000_000) * cacheReadRate;
        const cacheCreateCost = (cacheCreationTokens / 1_000_000) * (pricing.inputPricePerMillion * 1.25);

        return inputCost + outputCost + cacheReadCost + cacheCreateCost;
    }

    /**
     * Chuyển đổi USD sang VND
     */
    public usdToVnd(usd: number): number {
        return Math.round(usd * this.config.vndExchangeRate);
    }

    /**
     * Tính toán toàn diện Định giá dự án (Project Valuation)
     */
    public calculateValuation(
        apiCostUSD: number,
        activeDurationSeconds: number,
        totalTokens: number,
        turnsCount: number
    ): ProjectValuation {
        const apiCostVND = this.usdToVnd(apiCostUSD);

        // Ước tính giờ công Dev truyền thống để hoàn thành khối lượng tương đương
        // AI có thể tăng tốc từ 5x đến 10x tốc độ code thủ công
        // 1 giờ active AI coding + hàng trăm nghìn tokens code tương đương khoảng 4 - 8 giờ dev truyền thống
        const activeHours = activeDurationSeconds / 3600;
        const humanHoursEquivalent = Math.max(1, Math.round((activeHours * 4.5 + (totalTokens / 50_000) * 1.5) * 10) / 10);

        const humanHourlyRate = this.config.humanHourlyRate;
        const humanCostEquivalentUSD = Math.round(humanHoursEquivalent * humanHourlyRate);
        const humanCostEquivalentVND = this.usdToVnd(humanCostEquivalentUSD);

        // Định giá đề xuất: Chi phí AI * Markup + Chi phí vận hành AI Operator (Prompt Engineering Time)
        const operatorHourlyRate = humanHourlyRate * 0.6; // Giá công chuyên gia vận hành AI
        const operatorCost = activeHours * operatorHourlyRate;
        const recommendedValuationUSD = Math.round((apiCostUSD * this.config.markupMultiplier + operatorCost + (turnsCount * 0.5)) * 100) / 100;
        const recommendedValuationVND = this.usdToVnd(recommendedValuationUSD);

        const savingsUSD = Math.max(0, humanCostEquivalentUSD - recommendedValuationUSD);
        const savingsVND = this.usdToVnd(savingsUSD);

        return {
            apiCostUSD: Math.round(apiCostUSD * 10000) / 10000,
            apiCostVND,
            humanHoursEquivalent,
            humanHourlyRate,
            humanCostEquivalentUSD,
            humanCostEquivalentVND,
            markupMultiplier: this.config.markupMultiplier,
            recommendedValuationUSD,
            recommendedValuationVND,
            savingsUSD,
            savingsVND
        };
    }
}
