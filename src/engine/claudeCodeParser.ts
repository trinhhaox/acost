import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { SessionDetail } from '../types';
import { PricingEngine } from './pricingEngine';

export class ClaudeCodeParser {
    private pricingEngine: PricingEngine;

    constructor(pricingEngine: PricingEngine) {
        this.pricingEngine = pricingEngine;
    }

    /**
     * Phân tích một file session jsonl của Claude Code CLI
     */
    public async parseFile(filePath: string, targetWorkspacePath?: string): Promise<SessionDetail | null> {
        if (!fs.existsSync(filePath)) {
            return null;
        }

        const sessionId = path.basename(filePath, '.jsonl');
        const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let detectedWorkspace = '';
        let title = '';
        let currentModel = 'claude-3.7-sonnet';
        const modelsUsedSet = new Set<string>();
        const filesTouchedSet = new Set<string>();

        let inputTokens = 0;
        let outputTokens = 0;
        let cacheCreationTokens = 0;
        let cacheReadTokens = 0;
        let turnsCount = 0;

        let firstTimestamp: number | null = null;
        let lastTimestamp: number | null = null;
        let activeTimeSeconds = 0;
        let lastStepTime: number | null = null;

        for await (const line of rl) {
            if (!line.trim()) continue;
            try {
                const obj = JSON.parse(line);

                // 1. Timestamp & Active Time Tracking
                if (obj.timestamp) {
                    const parsedTime = new Date(obj.timestamp).getTime();
                    if (!isNaN(parsedTime)) {
                        if (firstTimestamp === null || parsedTime < firstTimestamp) {
                            firstTimestamp = parsedTime;
                        }
                        if (lastTimestamp === null || parsedTime > lastTimestamp) {
                            lastTimestamp = parsedTime;
                        }

                        if (lastStepTime !== null) {
                            const diffSec = (parsedTime - lastStepTime) / 1000;
                            if (diffSec > 0 && diffSec < 300) {
                                activeTimeSeconds += diffSec;
                            }
                        }
                        lastStepTime = parsedTime;
                    }
                }

                // 2. Detected CWD / Workspace
                if (obj.cwd && !detectedWorkspace) {
                    detectedWorkspace = obj.cwd;
                }

                // 3. User Prompts & Title
                if (obj.type === 'user' && obj.message) {
                    turnsCount++;
                    const content = obj.message.content;
                    let promptText = '';
                    if (typeof content === 'string') {
                        promptText = content;
                    } else if (Array.isArray(content)) {
                        promptText = content
                            .map((c: any) => (typeof c === 'string' ? c : c?.text || ''))
                            .filter(Boolean)
                            .join(' ');
                    }

                    if (
                        promptText &&
                        !title &&
                        !promptText.startsWith('Context: This summary will') &&
                        !promptText.startsWith('Warmup')
                    ) {
                        title = promptText
                            .replace(/<[^>]+>/g, '')
                            .trim()
                            .replace(/\n+/g, ' ')
                            .slice(0, 80);
                    }
                }

                // 4. Model & Token Usage
                if (obj.message) {
                    if (obj.message.model && obj.message.model !== '<synthetic>') {
                        const normModel = this.pricingEngine.normalizeModelKey(obj.message.model);
                        currentModel = normModel;
                        modelsUsedSet.add(normModel);
                    }

                    if (obj.message.usage) {
                        inputTokens += obj.message.usage.input_tokens || 0;
                        outputTokens += obj.message.usage.output_tokens || 0;
                        cacheCreationTokens += obj.message.usage.cache_creation_input_tokens || 0;
                        cacheReadTokens += obj.message.usage.cache_read_input_tokens || 0;
                    }
                }

                // 5. Tool Uses -> Files Touched
                if (obj.type === 'assistant' && obj.message && Array.isArray(obj.message.content)) {
                    for (const block of obj.message.content) {
                        if (block.type === 'tool_use' && block.input) {
                            const p =
                                block.input.file_path ||
                                block.input.path ||
                                block.input.filePath ||
                                block.input.targetFile ||
                                block.input.TargetFile ||
                                block.input.AbsolutePath;
                            if (p && typeof p === 'string' && p.startsWith('/')) {
                                filesTouchedSet.add(p);
                            }
                        }
                    }
                }
            } catch {
                // Ignore parse errors on corrupted lines
            }
        }

        if (modelsUsedSet.size === 0) {
            modelsUsedSet.add(currentModel);
        }

        // Bỏ qua session hoàn toàn rỗng không có token nào
        const totalTokens = inputTokens + outputTokens + cacheCreationTokens + cacheReadTokens;
        if (totalTokens === 0 && turnsCount === 0) {
            return null;
        }

        // Kiểm tra filter theo Workspace nếu có targetWorkspacePath
        if (targetWorkspacePath && detectedWorkspace) {
            const normTarget = path.normalize(targetWorkspacePath).toLowerCase();
            const normDetected = path.normalize(detectedWorkspace).toLowerCase();

            const isMatch =
                normDetected === normTarget ||
                normDetected.startsWith(normTarget + path.sep) ||
                normTarget.startsWith(normDetected + path.sep) ||
                (path.basename(normDetected) && path.basename(normDetected) === path.basename(normTarget));

            if (!isMatch) {
                return null;
            }
        }

        const durationSeconds =
            firstTimestamp && lastTimestamp
                ? Math.max(1, Math.round((lastTimestamp - firstTimestamp) / 1000))
                : Math.max(1, Math.round(activeTimeSeconds));

        const finalActiveTime = Math.min(durationSeconds, Math.max(10, Math.round(activeTimeSeconds)));

        const primaryModel = Array.from(modelsUsedSet)[0] || 'claude-3.7-sonnet';
        const costUSD = this.pricingEngine.calculateCostUSD(
            primaryModel,
            inputTokens,
            outputTokens,
            0,
            cacheCreationTokens,
            cacheReadTokens
        );
        const costVND = this.pricingEngine.usdToVnd(costUSD);

        return {
            sessionId,
            workspacePath: detectedWorkspace || targetWorkspacePath || 'Unknown Workspace',
            title: title || `Claude Code Session ${sessionId.slice(0, 8)}`,
            startTime: firstTimestamp ? new Date(firstTimestamp).toISOString() : new Date().toISOString(),
            endTime: lastTimestamp ? new Date(lastTimestamp).toISOString() : new Date().toISOString(),
            durationSeconds,
            activeTimeSeconds: finalActiveTime,
            modelsUsed: Array.from(modelsUsedSet),
            turnsCount: Math.max(1, turnsCount),
            inputTokens,
            outputTokens,
            thinkingTokens: 0,
            totalTokens,
            costUSD: Math.round(costUSD * 10000) / 10000,
            costVND,
            filesTouched: Array.from(filesTouchedSet),
            filePath
        };
    }
}
