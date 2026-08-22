import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { SessionDetail } from '../types';
import { Tokenizer } from './tokenizer';
import { PricingEngine } from './pricingEngine';

export class TranscriptParser {
    private pricingEngine: PricingEngine;

    constructor(pricingEngine: PricingEngine) {
        this.pricingEngine = pricingEngine;
    }

    /**
     * Phân tích một file transcript.jsonl
     */
    public async parseFile(filePath: string, targetWorkspacePath?: string): Promise<SessionDetail | null> {
        if (!fs.existsSync(filePath)) {
            return null;
        }

        const sessionId = path.basename(path.dirname(path.dirname(filePath)));
        const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let detectedWorkspace = '';
        let title = '';
        let currentModel = 'gemini-3.7-flash';
        const modelsUsedSet = new Set<string>();
        const filesTouchedSet = new Set<string>();

        let inputTokens = 0;
        let outputTokens = 0;
        let thinkingTokens = 0;
        let turnsCount = 0;

        let firstTimestamp: number | null = null;
        let lastTimestamp: number | null = null;
        let activeTimeSeconds = 0;
        let lastStepTime: number | null = null;

        for await (const line of rl) {
            if (!line.trim()) continue;
            try {
                const step = JSON.parse(line);
                const stepType = step.type || '';
                const source = step.source || '';
                const content = step.content || '';
                const createdAtStr = step.created_at;

                // Xử lý timestamp
                let stepTime: number | null = null;
                if (createdAtStr) {
                    const parsedTime = new Date(createdAtStr).getTime();
                    if (!isNaN(parsedTime)) {
                        stepTime = parsedTime;
                        if (firstTimestamp === null || parsedTime < firstTimestamp) {
                            firstTimestamp = parsedTime;
                        }
                        if (lastTimestamp === null || parsedTime > lastTimestamp) {
                            lastTimestamp = parsedTime;
                        }

                        if (lastStepTime !== null) {
                            const diffSec = (parsedTime - lastStepTime) / 1000;
                            // Nếu khoảng cách giữa 2 bước dưới 5 phút, tính vào active coding time
                            if (diffSec > 0 && diffSec < 300) {
                                activeTimeSeconds += diffSec;
                            }
                        }
                        lastStepTime = parsedTime;
                    }
                }

                // Phát hiện Model Selection
                if (content.includes('Model Selection') || content.includes('USER_SETTINGS_CHANGE')) {
                    const modelMatch = content.match(/Model Selection` from [^\n]+? to (.+?)\.\s*No need/i) ||
                                       content.match(/Model Selection` from [^\n]+? to ([^\.\n<]+)/i) ||
                                       content.match(/setting `Model Selection` from [^\n]+? to ([^\n<]+)/i);
                    if (modelMatch && modelMatch[1]) {
                        const mName = modelMatch[1].trim();
                        currentModel = this.pricingEngine.normalizeModelKey(mName);
                        modelsUsedSet.add(currentModel);
                    }
                }

                // Phát hiện Workspace từ Metadata
                if (!detectedWorkspace) {
                    const wsMatch = content.match(/\[URI\] -> \[CorpusName\]:\s*([^\s\n]+)/);
                    if (wsMatch && wsMatch[1]) {
                        detectedWorkspace = wsMatch[1].trim();
                    } else {
                        const docMatch = content.match(/Active Document:\s*([^\n\r]+)/);
                        if (docMatch && docMatch[1]) {
                            const fullDocPath = docMatch[1].trim();
                            detectedWorkspace = path.dirname(fullDocPath);
                        } else {
                            const mentionMatch = content.match(/@\[([^\]]+)\]/);
                            if (mentionMatch && mentionMatch[1]) {
                                const mentionPath = mentionMatch[1].trim();
                                if (mentionPath.startsWith('/')) {
                                    detectedWorkspace = mentionPath;
                                }
                            }
                        }
                    }
                }

                // Tiêu đề conversation từ prompt đầu tiên
                if (stepType === 'USER_INPUT' && !title) {
                    const reqMatch = content.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
                    if (reqMatch && reqMatch[1]) {
                        title = reqMatch[1].trim().replace(/\n+/g, ' ').slice(0, 80);
                    } else {
                        title = content.replace(/<[^>]+>/g, '').trim().slice(0, 80);
                    }
                }

                // Đếm Token & Bắt File Touched
                if (stepType === 'USER_INPUT') {
                    turnsCount++;
                    inputTokens += Tokenizer.estimateTokens(content);
                } else if (
                    stepType === 'KNOWLEDGE_ARTIFACTS' ||
                    stepType === 'CONVERSATION_HISTORY' ||
                    stepType === 'SYSTEM_MESSAGE' ||
                    stepType === 'VIEW_FILE' ||
                    stepType === 'GREP_SEARCH' ||
                    stepType === 'LIST_DIRECTORY' ||
                    stepType === 'RUN_COMMAND' ||
                    stepType === 'READ_URL_CONTENT' ||
                    stepType === 'MCP_TOOL'
                ) {
                    inputTokens += Tokenizer.estimateTokens(content);
                } else if (stepType === 'PLANNER_RESPONSE') {
                    if (step.thinking) {
                        thinkingTokens += Tokenizer.estimateTokens(step.thinking);
                    }
                    if (content) {
                        outputTokens += Tokenizer.estimateTokens(content);
                    }
                    if (step.tool_calls && Array.isArray(step.tool_calls)) {
                        for (const tc of step.tool_calls) {
                            outputTokens += Tokenizer.estimateObjectTokens(tc);

                            // Trích xuất file path từ tool calls
                            const args = tc.args || {};
                            const filePath = args.AbsolutePath || args.TargetFile || args.DirectoryPath;
                            if (filePath && typeof filePath === 'string' && filePath.startsWith('/')) {
                                filesTouchedSet.add(filePath.replace(/^"|"$/g, ''));
                            }
                        }
                    }
                } else {
                    if (source === 'MODEL') {
                        outputTokens += Tokenizer.estimateTokens(content);
                    } else {
                        inputTokens += Tokenizer.estimateTokens(content);
                    }
                }

            } catch (err) {
                // Bỏ qua dòng json lỗi
            }
        }

        if (modelsUsedSet.size === 0) {
            modelsUsedSet.add(currentModel);
        }

        // Lọc workspace nếu có targetWorkspacePath
        if (targetWorkspacePath && detectedWorkspace) {
            const normTarget = path.normalize(targetWorkspacePath).toLowerCase();
            const normDetected = path.normalize(detectedWorkspace).toLowerCase();

            const isMatch = normDetected.startsWith(normTarget) || normTarget.startsWith(normDetected);
            if (!isMatch) {
                return null;
            }
        }

        const durationSeconds = (firstTimestamp && lastTimestamp)
            ? Math.max(1, Math.round((lastTimestamp - firstTimestamp) / 1000))
            : Math.max(1, Math.round(activeTimeSeconds));

        const finalActiveTime = Math.min(durationSeconds, Math.max(15, Math.round(activeTimeSeconds)));

        const primaryModel = Array.from(modelsUsedSet)[0] || 'gemini-3.7-flash';
        const costUSD = this.pricingEngine.calculateCostUSD(primaryModel, inputTokens, outputTokens, thinkingTokens);
        const costVND = this.pricingEngine.usdToVnd(costUSD);

        return {
            sessionId,
            workspacePath: detectedWorkspace || targetWorkspacePath || 'Unknown Workspace',
            title: title || `Session ${sessionId.slice(0, 8)}`,
            startTime: firstTimestamp ? new Date(firstTimestamp).toISOString() : new Date().toISOString(),
            endTime: lastTimestamp ? new Date(lastTimestamp).toISOString() : new Date().toISOString(),
            durationSeconds,
            activeTimeSeconds: finalActiveTime,
            modelsUsed: Array.from(modelsUsedSet),
            turnsCount: Math.max(1, turnsCount),
            inputTokens,
            outputTokens,
            thinkingTokens,
            totalTokens: inputTokens + outputTokens + thinkingTokens,
            costUSD: Math.round(costUSD * 10000) / 10000,
            costVND,
            filesTouched: Array.from(filesTouchedSet),
            filePath
        };
    }
}
