export interface ModelPricing {
    inputPricePerMillion: number;
    outputPricePerMillion: number;
    cacheReadPricePerMillion?: number;
    displayName?: string;
    provider?: 'Google' | 'Anthropic' | 'OpenAI' | 'Other';
}

export interface ModelStat {
    modelName: string;
    displayName: string;
    provider: string;
    inputTokens: number;
    outputTokens: number;
    thinkingTokens: number;
    totalTokens: number;
    costUSD: number;
    costVND: number;
    percentageOfCost: number;
    percentageOfTokens: number;
}

export interface FileCostStat {
    fileName: string;
    filePath: string;
    touchesCount: number;
    estimatedTokens: number;
    estimatedCostUSD: number;
}

export interface SessionDetail {
    sessionId: string;
    workspacePath: string;
    title: string;
    startTime: string;
    endTime: string;
    durationSeconds: number;
    activeTimeSeconds: number;
    modelsUsed: string[];
    turnsCount: number;
    inputTokens: number;
    outputTokens: number;
    thinkingTokens: number;
    totalTokens: number;
    costUSD: number;
    costVND: number;
    filesTouched: string[];
    filePath?: string;
}

export interface ProjectValuation {
    apiCostUSD: number;
    apiCostVND: number;
    humanHoursEquivalent: number;
    humanHourlyRate: number;
    humanCostEquivalentUSD: number;
    humanCostEquivalentVND: number;
    markupMultiplier: number;
    recommendedValuationUSD: number;
    recommendedValuationVND: number;
    savingsUSD: number;
    savingsVND: number;
}

export interface ProjectSummaryItem {
    workspacePath: string;
    projectName: string;
    totalSessions: number;
    totalTokens: number;
    totalCostUSD: number;
    totalCostVND: number;
    lastActive: string;
}

export interface ProjectCostReport {
    workspacePath: string;
    projectName: string;
    generatedAt: string;
    dateFilter: 'all' | 'today' | '7d' | '30d';
    totalSessions: number;
    totalTurns: number;
    totalInputTokens: number;
    totalOutputTokens: number;
    totalThinkingTokens: number;
    totalTokens: number;
    totalCostUSD: number;
    totalCostVND: number;
    activeDurationSeconds: number;
    totalDurationSeconds: number;
    models: ModelStat[];
    topFiles: FileCostStat[];
    sessions: SessionDetail[];
    allProjects: ProjectSummaryItem[];
    valuation: ProjectValuation;
}

export interface PricingConfig {
    language: 'vi' | 'en';
    currency: 'USD' | 'VND';
    vndExchangeRate: number;
    markupMultiplier: number;
    humanHourlyRate: number;
    customPricing?: Record<string, Partial<ModelPricing>>;
}
