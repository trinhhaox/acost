/**
 * Tokenizer & Token Estimator
 * Ước lượng chính xác số lượng token cho Code, English text, Vietnamese text, JSON metadata và Tool outputs.
 */

export class Tokenizer {
    /**
     * Ước lượng số token cho một chuỗi văn bản bất kỳ
     */
    public static estimateTokens(text: string | null | undefined): number {
        if (!text || text.length === 0) {
            return 0;
        }

        const len = text.length;
        if (len < 4) {
            return 1;
        }

        // Kiểm tra tỷ lệ ký tự Unicode / Tiếng Việt (dấu thanh)
        let vietnameseCharCount = 0;
        let codeSymbolCount = 0;
        let whitespaceCount = 0;

        for (let i = 0; i < Math.min(len, 2000); i++) {
            const code = text.charCodeAt(i);
            if (code > 255) {
                vietnameseCharCount++;
            } else if (code === 32 || code === 10 || code === 9 || code === 13) {
                whitespaceCount++;
            } else if (
                (code >= 33 && code <= 47) ||
                (code >= 58 && code <= 64) ||
                (code >= 91 && code <= 96) ||
                (code >= 123 && code <= 126)
            ) {
                codeSymbolCount++;
            }
        }

        const sampleSize = Math.min(len, 2000);
        const vnRatio = vietnameseCharCount / sampleSize;
        const codeRatio = codeSymbolCount / sampleSize;

        let charPerToken = 3.8; // Mặc định cho English / Code thông thường

        if (vnRatio > 0.15) {
            // Tiếng Việt nhiều dấu thanh thường tốn 2.4 - 2.8 ký tự / token
            charPerToken = 2.6;
        } else if (codeRatio > 0.25) {
            // Code dày đặc symbol, JSON thường tốn 3.2 - 3.5 ký tự / token
            charPerToken = 3.3;
        }

        return Math.ceil(len / charPerToken);
    }

    /**
     * Ước lượng token từ object (JSON payloads, tool arguments)
     */
    public static estimateObjectTokens(obj: any): number {
        if (!obj) return 0;
        try {
            const str = typeof obj === 'string' ? obj : JSON.stringify(obj);
            return this.estimateTokens(str);
        } catch {
            return 0;
        }
    }
}
