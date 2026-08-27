import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { FileCostStat, ModelStat, PricingConfig, ProjectCostReport, ProjectSummaryItem, SessionDetail } from '../types';
import { PricingEngine } from './pricingEngine';
import { TranscriptParser } from './transcriptParser';
import { ClaudeCodeParser } from './claudeCodeParser';

export class LogScanner {
    private pricingEngine: PricingEngine;
    private parser: TranscriptParser;
    private claudeParser: ClaudeCodeParser;
    private brainDir: string;
    private claudeProjectsDir: string;
    private cache: Map<string, { mtime: number; data: SessionDetail | null }> = new Map();

    constructor(config: PricingConfig, customBrainDir?: string, customClaudeDir?: string) {
        this.pricingEngine = new PricingEngine(config);
        this.parser = new TranscriptParser(this.pricingEngine);
        this.claudeParser = new ClaudeCodeParser(this.pricingEngine);
        this.brainDir = customBrainDir || path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');
        this.claudeProjectsDir = customClaudeDir || path.join(os.homedir(), '.claude', 'projects');
    }

    public updateConfig(config: PricingConfig) {
        this.pricingEngine = new PricingEngine(config);
        this.parser = new TranscriptParser(this.pricingEngine);
        this.claudeParser = new ClaudeCodeParser(this.pricingEngine);
        this.cache.clear();
    }

    /**
     * Quét và tạo báo cáo chi phí cho workspace hiện tại với bộ lọc thời gian
     * Hỗ trợ cả Antigravity IDE và Claude Code CLI
     */
    public async scanWorkspace(
        workspacePath?: string,
        dateFilter: 'all' | 'today' | '7d' | '30d' = 'all'
    ): Promise<ProjectCostReport> {
        const projectName = workspacePath ? path.basename(workspacePath) : 'All Projects';
        const allSessions: SessionDetail[] = [];
        const projectSummaryMap = new Map<string, { sessions: number; tokens: number; costUSD: number; lastActive: string }>();

        // 1. Quét Antigravity IDE Brain logs
        if (fs.existsSync(this.brainDir)) {
            try {
                const convDirs = fs.readdirSync(this.brainDir);
                for (const dirName of convDirs) {
                    const transcriptPath = path.join(this.brainDir, dirName, '.system_generated', 'logs', 'transcript.jsonl');
                    if (fs.existsSync(transcriptPath)) {
                        try {
                            const stats = fs.statSync(transcriptPath);
                            const cached = this.cache.get(transcriptPath);

                            let session: SessionDetail | null = null;
                            if (cached && cached.mtime === stats.mtimeMs) {
                                session = cached.data;
                            } else {
                                session = await this.parser.parseFile(transcriptPath);
                                this.cache.set(transcriptPath, { mtime: stats.mtimeMs, data: session });
                            }

                            if (session) {
                                allSessions.push(session);
                                this.recordProjectSummary(projectSummaryMap, session);
                            }
                        } catch {}
                    }
                }
            } catch {}
        }

        // 2. Quét Claude Code CLI projects logs
        if (fs.existsSync(this.claudeProjectsDir)) {
            try {
                const projectDirs = fs.readdirSync(this.claudeProjectsDir);
                for (const pDir of projectDirs) {
                    const fullPDir = path.join(this.claudeProjectsDir, pDir);
                    try {
                        const pStat = fs.statSync(fullPDir);
                        if (!pStat.isDirectory()) continue;

                        const sessionFiles = fs.readdirSync(fullPDir).filter(f => f.endsWith('.jsonl'));
                        for (const sFile of sessionFiles) {
                            const sessionPath = path.join(fullPDir, sFile);
                            try {
                                const stats = fs.statSync(sessionPath);
                                const cached = this.cache.get(sessionPath);

                                let session: SessionDetail | null = null;
                                if (cached && cached.mtime === stats.mtimeMs) {
                                    session = cached.data;
                                } else {
                                    session = await this.claudeParser.parseFile(sessionPath);
                                    this.cache.set(sessionPath, { mtime: stats.mtimeMs, data: session });
                                }

                                if (session) {
                                    allSessions.push(session);
                                    this.recordProjectSummary(projectSummaryMap, session);
                                }
                            } catch {}
                        }
                    } catch {}
                }
            } catch {}
        }

        // Tạo danh sách allProjects
        const allProjects: ProjectSummaryItem[] = [];
        for (const [wsPath, pStat] of projectSummaryMap.entries()) {
            allProjects.push({
                workspacePath: wsPath,
                projectName: wsPath === 'Unknown' ? 'Unknown Project' : path.basename(wsPath),
                totalSessions: pStat.sessions,
                totalTokens: pStat.tokens,
                totalCostUSD: Math.round(pStat.costUSD * 10000) / 10000,
                totalCostVND: this.pricingEngine.usdToVnd(pStat.costUSD),
                lastActive: pStat.lastActive
            });
        }
        allProjects.sort((a, b) => b.totalCostUSD - a.totalCostUSD);

        // Lọc session theo Workspace
        let filteredSessions = allSessions;
        if (workspacePath && workspacePath !== 'ALL' && workspacePath !== 'All Projects') {
            filteredSessions = allSessions.filter(s => this.isWorkspaceMatch(s.workspacePath, workspacePath));
        }

        // Lọc session theo Date Filter
        const now = Date.now();
        if (dateFilter === 'today') {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const startMs = startOfDay.getTime();
            filteredSessions = filteredSessions.filter(s => new Date(s.startTime).getTime() >= startMs);
        } else if (dateFilter === '7d') {
            const limitMs = now - 7 * 24 * 3600 * 1000;
            filteredSessions = filteredSessions.filter(s => new Date(s.startTime).getTime() >= limitMs);
        } else if (dateFilter === '30d') {
            const limitMs = now - 30 * 24 * 3600 * 1000;
            filteredSessions = filteredSessions.filter(s => new Date(s.startTime).getTime() >= limitMs);
        }

        // Sắp xếp sessions theo thời gian mới nhất
        filteredSessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

        // Tổng hợp số liệu
        let totalInputTokens = 0;
        let totalOutputTokens = 0;
        let totalThinkingTokens = 0;
        let totalCostUSD = 0;
        let totalActiveDurationSeconds = 0;
        let totalDurationSeconds = 0;
        let totalTurns = 0;

        const modelStatsMap = new Map<string, { input: number; output: number; thinking: number; costUSD: number }>();
        const filesMap = new Map<string, { count: number; estimatedTokens: number; costUSD: number }>();

        for (const s of filteredSessions) {
            totalInputTokens += s.inputTokens;
            totalOutputTokens += s.outputTokens;
            totalThinkingTokens += s.thinkingTokens;
            totalCostUSD += s.costUSD;
            totalActiveDurationSeconds += s.activeTimeSeconds;
            totalDurationSeconds += s.durationSeconds;
            totalTurns += s.turnsCount;

            for (const modelKey of s.modelsUsed) {
                const existing = modelStatsMap.get(modelKey) || { input: 0, output: 0, thinking: 0, costUSD: 0 };
                const modelShare = 1 / s.modelsUsed.length;
                existing.input += Math.round(s.inputTokens * modelShare);
                existing.output += Math.round(s.outputTokens * modelShare);
                existing.thinking += Math.round(s.thinkingTokens * modelShare);
                existing.costUSD += s.costUSD * modelShare;
                modelStatsMap.set(modelKey, existing);
            }

            // Phân bổ chi phí theo file
            if (s.filesTouched && s.filesTouched.length > 0) {
                const perFileTokens = Math.round(s.totalTokens / s.filesTouched.length);
                const perFileCost = s.costUSD / s.filesTouched.length;
                for (const f of s.filesTouched) {
                    const fStat = filesMap.get(f) || { count: 0, estimatedTokens: 0, costUSD: 0 };
                    fStat.count++;
                    fStat.estimatedTokens += perFileTokens;
                    fStat.costUSD += perFileCost;
                    filesMap.set(f, fStat);
                }
            }
        }

        const totalTokens = totalInputTokens + totalOutputTokens + totalThinkingTokens;
        const totalCostVND = this.pricingEngine.usdToVnd(totalCostUSD);

        // Tạo ModelStat[]
        const models: ModelStat[] = [];
        for (const [modelKey, stat] of modelStatsMap.entries()) {
            const pricing = this.pricingEngine.getModelPricing(modelKey);
            const modelTotalTokens = stat.input + stat.output + stat.thinking;
            models.push({
                modelName: modelKey,
                displayName: pricing.displayName || modelKey,
                provider: pricing.provider || 'Other',
                inputTokens: stat.input,
                outputTokens: stat.output,
                thinkingTokens: stat.thinking,
                totalTokens: modelTotalTokens,
                costUSD: Math.round(stat.costUSD * 10000) / 10000,
                costVND: this.pricingEngine.usdToVnd(stat.costUSD),
                percentageOfCost: totalCostUSD > 0 ? Math.round((stat.costUSD / totalCostUSD) * 1000) / 10 : 0,
                percentageOfTokens: totalTokens > 0 ? Math.round((modelTotalTokens / totalTokens) * 1000) / 10 : 0
            });
        }
        models.sort((a, b) => b.costUSD - a.costUSD);

        // Tạo topFiles
        const topFiles: FileCostStat[] = [];
        for (const [fPath, fData] of filesMap.entries()) {
            topFiles.push({
                fileName: path.basename(fPath),
                filePath: fPath,
                touchesCount: fData.count,
                estimatedTokens: fData.estimatedTokens,
                estimatedCostUSD: Math.round(fData.costUSD * 10000) / 10000
            });
        }
        topFiles.sort((a, b) => b.estimatedCostUSD - a.estimatedCostUSD);

        // Tính toán Định giá dự án
        const valuation = this.pricingEngine.calculateValuation(
            totalCostUSD,
            totalActiveDurationSeconds,
            totalTokens,
            totalTurns
        );

        return {
            workspacePath: workspacePath || 'All Workspaces',
            projectName: (workspacePath && workspacePath !== 'ALL') ? projectName : 'Tất Cả Dự Án',
            generatedAt: new Date().toISOString(),
            dateFilter,
            totalSessions: filteredSessions.length,
            totalTurns,
            totalInputTokens,
            totalOutputTokens,
            totalThinkingTokens,
            totalTokens,
            totalCostUSD: Math.round(totalCostUSD * 10000) / 10000,
            totalCostVND,
            activeDurationSeconds: totalActiveDurationSeconds,
            totalDurationSeconds,
            models,
            topFiles: topFiles.slice(0, 20),
            sessions: filteredSessions,
            allProjects,
            valuation
        };
    }

    private recordProjectSummary(
        projectSummaryMap: Map<string, { sessions: number; tokens: number; costUSD: number; lastActive: string }>,
        session: SessionDetail
    ) {
        const ws = session.workspacePath || 'Unknown';
        const existingWs = projectSummaryMap.get(ws) || { sessions: 0, tokens: 0, costUSD: 0, lastActive: session.startTime };
        existingWs.sessions++;
        existingWs.tokens += session.totalTokens;
        existingWs.costUSD += session.costUSD;
        if (new Date(session.startTime).getTime() > new Date(existingWs.lastActive).getTime()) {
            existingWs.lastActive = session.startTime;
        }
        projectSummaryMap.set(ws, existingWs);
    }

    private isWorkspaceMatch(sessionWs: string, targetWs: string): boolean {
        if (!sessionWs || !targetWs) return false;
        let normSession = path.normalize(sessionWs).toLowerCase();
        let normTarget = path.normalize(targetWs).toLowerCase();

        // Chuẩn hóa mount drive /Volumes/.../Antigravity <-> /Users/.../Antigravity
        const cleanPath = (p: string) => {
            return p.replace(/^\/volumes\/[^\/]+\/antigravity/, '/antigravity')
                    .replace(/^\/users\/[^\/]+\/antigravity/, '/antigravity');
        };

        const cleanSession = cleanPath(normSession);
        const cleanTarget = cleanPath(normTarget);

        if (normSession === normTarget || cleanSession === cleanTarget) return true;
        if (cleanSession.startsWith(cleanTarget + path.sep) || cleanTarget.startsWith(cleanSession + path.sep)) return true;
        if (normSession.startsWith(normTarget + path.sep) || normTarget.startsWith(normSession + path.sep)) return true;

        const baseSession = path.basename(normSession);
        const baseTarget = path.basename(normTarget);
        if (baseSession && baseTarget && baseSession === baseTarget) {
            return true;
        }
        return false;
    }

    private buildEmptyReport(workspacePath: string, projectName: string, dateFilter: 'all' | 'today' | '7d' | '30d'): ProjectCostReport {
        const valuation = this.pricingEngine.calculateValuation(0, 0, 0, 0);
        return {
            workspacePath,
            projectName,
            generatedAt: new Date().toISOString(),
            dateFilter,
            totalSessions: 0,
            totalTurns: 0,
            totalInputTokens: 0,
            totalOutputTokens: 0,
            totalThinkingTokens: 0,
            totalTokens: 0,
            totalCostUSD: 0,
            totalCostVND: 0,
            activeDurationSeconds: 0,
            totalDurationSeconds: 0,
            models: [],
            topFiles: [],
            sessions: [],
            allProjects: [],
            valuation
        };
    }
}
