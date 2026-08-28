# Phân Tích Dự Án Acost & Đề Xuất Cải Tiến

> Phạm vi: toàn bộ mã nguồn tại commit `f8969c0` (v1.3.2) — 14 file TypeScript, ~4.100 dòng.
> Mục tiêu: đánh giá kiến trúc, độ chính xác số liệu, bảo mật, hiệu năng và khả năng phát hành rộng rãi.

---

## 1. Tổng Quan Kiến Trúc

Acost là extension VS Code / Antigravity IDE đo chi phí AI và định giá dự án. Luồng dữ liệu:

```
~/.gemini/antigravity-ide/brain/*/transcript.jsonl ──> TranscriptParser  ──┐
                                                                           ├──> LogScanner ──> ProjectCostReport ──┬──> CostSidebarProvider (webview)
~/.claude/projects/*/*.jsonl ──────────────────────> ClaudeCodeParser  ──┘         ▲                                ├──> StatusBarManager
                                                                          PricingEngine (giá + định giá)            └──> ReportGenerator (MD / HTML / JSON)
```

| Tầng | File | Dòng | Trách nhiệm |
| :--- | :--- | ---: | :--- |
| Entry | `src/extension.ts` | 395 | Activate, commands, watcher, timer 60s |
| Quét & tổng hợp | `src/engine/logScanner.ts` | 541 | Duyệt log, phân giải project, gộp số liệu |
| Parser | `src/engine/transcriptParser.ts` | 216 | Antigravity — token **ước lượng** |
| Parser | `src/engine/claudeCodeParser.ts` | 227 | Claude Code — token **đo thật** từ `usage` |
| Giá & định giá | `src/engine/pricingEngine.ts` | 345 | Bảng giá 25 model, công thức valuation |
| Báo cáo | `src/engine/reportGenerator.ts` | 377 | Xuất MD / HTML / JSON |
| UI | `src/providers/costSidebarProvider.ts` | 1.175 | Toàn bộ webview trong 1 template string |
| Khác | `updater.ts`, `i18n`, `statusBarManager`, `types`, `utils` | 584 | Auto-update, song ngữ, status bar |

**Điểm mạnh đáng ghi nhận**

- Tách tầng sạch: parser / pricing / scanner / UI độc lập, dễ thêm nguồn log mới.
- Hỗ trợ đồng thời 2 hệ sinh thái (Antigravity + Claude Code CLI) — hiếm extension nào làm.
- Có cache theo `mtime` nên lần quét thứ hai gần như miễn phí.
- Đọc jsonl bằng `readline` streaming, không nạp cả file vào RAM.
- Song ngữ VI/EN xuyên suốt, báo cáo HTML in được ra PDF cho khách — đúng nhu cầu thực tế.
- Auto-update 1-click qua GitHub Releases, hoạt động tốt.

---

## 2. Vấn Đề Theo Mức Độ Ưu Tiên

### P0 — Sai số liệu / chặn phát hành

**P0-1. Token cache bị mất khi tổng hợp — số liệu dashboard mâu thuẫn với chi phí**

`ClaudeCodeParser` cộng `cache_creation_input_tokens` và `cache_read_input_tokens` vào `session.totalTokens`
(`claudeCodeParser.ts:157`) và **tính tiền trên chúng** (`:198-205`), nhưng `SessionDetail` không có trường riêng để lưu,
nên `LogScanner` tính lại tổng bằng `input + output + thinking` (`logScanner.ts:189`) — cache biến mất.

Hệ quả: với Claude Code, cache read thường chiếm 70-90% token. Dashboard hiển thị thiếu phần lớn token trong khi
chi phí vẫn tính đủ ⇒ "chi phí / 1M token" hiển thị sai lệch nhiều lần, và tổng ở màn hình dự án khác tổng ở từng session.

**P0-2. Chi phí gán sai model — chia đều 1/n và tính giá theo một model duy nhất**

- `logScanner.ts:170-179`: token và chi phí của session được chia đều cho mọi model đã dùng (`modelShare = 1 / s.modelsUsed.length`).
- `claudeCodeParser.ts:186-205`: toàn bộ token của session được tính giá theo **một** `primaryModel` (ưu tiên Opus).

Một session dùng Haiku cho việc vặt và Opus cho việc chính sẽ bị tính toàn bộ token theo giá Opus — chênh tới **~19x**
($0.80 vs $15.00 / 1M input). Biểu đồ "Tỷ lệ AI Models" vì thế cũng không phản ánh thực tế.

Hướng sửa: cộng dồn `usage` theo từng model ngay trong parser (`Map<model, {in, out, cacheCreate, cacheRead}>`) và tính
tiền theo từng model, thay vì gộp rồi chia.

**P0-3. Hardcode đường dẫn máy cá nhân — extension chỉ chạy đúng trên một máy**

```
logScanner.ts:286   '/Volumes/Hao512gb/Antigravity'
logScanner.ts:351   `/Volumes/Hao512gb/Antigravity/${cleanName}`
logScanner.ts:401   `/Volumes/Hao512gb/Antigravity/${pName}`
logScanner.ts:422   checkDir !== '/Volumes/Hao512gb'
logScanner.ts:265   danh sách bỏ qua chứa 'trinhhao', 'hao512gb'
```

Người dùng khác sẽ mất dự án khỏi danh sách hoặc bị gán `workspacePath` không tồn tại. Đây là rào cản số một nếu muốn
đưa lên Marketplace. Đề xuất: thêm setting `acost.projectRoots: string[]` (mặc định `[]`), suy ra gốc dự án từ `cwd`
trong log Claude Code và từ `workspace.workspaceFolders`, bỏ hoàn toàn đường dẫn tuyệt đối trong mã.

**P0-4. Gộp nhầm dự án trùng tên thư mục**

`isWorkspaceMatch` (`logScanner.ts:504-508`) trả về `true` khi `basename` giống nhau. Hai dự án khác nhau cùng có thư mục
`api`, `web`, `client`, `mobile` sẽ bị gộp chung số liệu. Commit `f8969c0` đã siết nhánh prefix nhưng chưa bỏ nhánh này.

**P0-5. Phát hiện ngôn ngữ IDE bị vô hiệu**

```ts
// extension.ts:27
const defaultLang = vscode.env.language.startsWith('vi') ? 'vi' : 'vi';
```

Cả hai nhánh đều trả `'vi'`. Người dùng IDE tiếng Anh vẫn thấy giao diện tiếng Việt cho tới khi tự đổi setting.

**P0-6. Số phiên bản trong báo cáo sai**

`reportGenerator.ts:55,111` in cứng `v1.3.0` trong khi `package.json` là `1.3.2`. Báo cáo gửi khách ghi sai phiên bản
công cụ đo. Nên truyền version từ `context.extension.packageJSON.version`.

**P0-7. Không phân biệt số "đo thật" và số "ước lượng" trong báo cáo khách hàng**

Claude Code cho token thật từ `usage`; Antigravity chỉ có ước lượng theo tỷ lệ ký tự/token (`tokenizer.ts:48-58`,
sai số thực tế ±20-30%). Ngoài ra `transcriptParser.ts:132-142` cộng `CONVERSATION_HISTORY` và `KNOWLEDGE_ARTIFACTS` vào
input ở **mỗi** bước, dễ phồng token.

Báo cáo hiện trộn hai loại số này mà không ghi chú. Khi khách hàng chất vấn con số định giá, đây là điểm yếu nhất.
Đề xuất: thêm `tokenSource: 'measured' | 'estimated'` vào `SessionDetail`, hiển thị nhãn "ước lượng" và ghi rõ phương
pháp luận ở cuối báo cáo.

### P1 — Bảo mật & bàn giao

**P1-1. Không escape HTML — vỡ báo cáo gửi khách và XSS trong webview**

- `reportGenerator.ts:357`: `<td>${s.title}</td>` — tiêu đề lấy nguyên văn từ prompt người dùng.
- `costSidebarProvider.ts:980, 1006, 1027`: dựng danh sách model/session/file bằng `innerHTML`.

Một prompt chứa `<img src=x onerror=...>` hoặc chỉ đơn giản là `<div>` sẽ làm vỡ layout báo cáo HTML gửi khách hàng,
và thực thi script trong webview. Cần một hàm `escapeHtml()` dùng chung cho mọi nội dung nội suy.

**P1-2. Webview bật script nhưng không có CSP**

`costSidebarProvider.ts:34-39` đặt `enableScripts: true` mà HTML không có `<meta http-equiv="Content-Security-Policy">`
và không dùng nonce cho `<script>`. Đây là yêu cầu chuẩn của VS Code Extension Guidelines.

**P1-3. Updater cài VSIX không xác thực**

`updater.ts:216-240`: tải VSIX rồi gọi `workbench.extensions.installExtension` mà không kiểm tra checksum/chữ ký; hàm
`downloadFile` bám theo redirect **không giới hạn số lần và không giới hạn host**. Đề xuất: giới hạn 5 redirect, chỉ chấp
nhận host thuộc `github.com` / `objects.githubusercontent.com`, đối chiếu SHA-256 công bố trong release notes, và hiển thị
kích thước + hash trước khi cài.

**P1-4. Quyền riêng tư: quét toàn máy ngay khi khởi động**

Extension activate `onStartupFinished` và quét **toàn bộ** `~/.claude/projects` cùng brain logs của mọi dự án, kể cả khi
người dùng chỉ mở một workspace. Dữ liệu không rời máy, nhưng nên có setting `acost.scanScope: 'workspace' | 'all'`
(mặc định `workspace`) và một mục "Dữ liệu nào được đọc" trong README.

### P1 — Hiệu năng

**P1-5. Quét lại toàn bộ mỗi 60 giây**

`extension.ts:378-380` chạy `performScan()` mỗi 60s, cộng thêm watcher debounce 1,5s (`:113-146`). Mỗi lần quét đều duyệt
lại toàn bộ thư mục, `statSync` mọi file và gọi lại `getKnownProjects()` (readdir `$HOME` + 3 thư mục khác). Cache mtime
tránh được việc parse lại, nhưng chi phí duyệt vẫn tuyến tính theo số session — với vài nghìn file jsonl sẽ thấy rõ.

Đề xuất: (a) quét tăng dần — nhớ byte offset đã đọc, chỉ parse phần đuôi mới ghi thêm; (b) cache `getKnownProjects()`
theo TTL; (c) chỉ quét lại đúng file mà watcher báo thay đổi; (d) nâng chu kỳ nền lên 5 phút khi cửa sổ không focus.

**P1-6. Không có khoá chống quét chồng**

`performScan` (`extension.ts:51`) có thể được gọi đồng thời từ timer, watcher, command và thay đổi config. Cần cờ
`isScanning` + hàng đợi một slot để tránh chạy chồng và ghi đè `currentReport` không theo thứ tự.

**P1-7. Cache không có giới hạn và không dọn rác**

`logScanner.ts:15` — `Map` lớn dần theo mọi file từng gặp, không xoá entry của file đã bị xoá. Nên giới hạn LRU và
cân nhắc persist vào `context.globalState` để lần mở IDE sau không phải parse lại từ đầu.

### P2 — Chất lượng kỹ thuật & vận hành

| # | Vấn đề | Vị trí | Đề xuất |
| :-- | :--- | :--- | :--- |
| P2-1 | Test không hermetic: assert dựa trên log máy thật (`totalSessions > 0`, `models.length >= 3`) | `tests/test-suite.ts:97-101` | Thêm `tests/fixtures/*.jsonl`, chạy scanner trên fixtures qua tham số `customBrainDir`/`customClaudeDir` đã có sẵn |
| P2-2 | Không có script `npm test`, không có CI | `package.json` | Thêm `"test": "ts-node tests/test-suite.ts"` (hoặc vitest) + GitHub Actions chạy build + typecheck + test |
| P2-3 | `npm run build` chỉ chạy esbuild — **không type-check** | `esbuild.js` | Thêm `tsc --noEmit` vào `build` và CI |
| P2-4 | Artifact build nằm trong git: `dist/extension.js`, `acost-1.3.2.vsix` (93 KB) | repo root | Đưa vào `.gitignore`, phát hành qua GitHub Releases từ CI |
| P2-5 | Thiếu `LICENSE`, `CHANGELOG.md`, trường `repository` và `license` trong package.json | — | Bổ sung (đang phải dùng `--allow-missing-repository` khi đóng gói) |
| P2-6 | Dead code `buildEmptyReport` không nơi nào gọi | `logScanner.ts:520` | Xoá hoặc dùng cho nhánh không có log |
| P2-7 | Chuỗi song ngữ hardcode rải rác thay vì dùng `TRANSLATIONS` | `extension.ts:63-72,197-260`, `statusBarManager.ts:47-80` | Gom hết về `src/i18n` |
| P2-8 | Bảng giá 25 model hardcode trong mã — mỗi lần đổi giá phải phát hành bản mới | `pricingEngine.ts:3-190` | Tách `pricing.json`, cho phép ghi đè bằng setting và cập nhật từ xa có phiên bản |
| P2-9 | Hệ số định giá là magic number: `4.5` giờ dev / giờ AI, `tokens/50_000 * 1.5`, `turns * 0.5`, operator `= rate * 0.6` | `pricingEngine.ts:317-330` | Đưa vào settings, ghi rõ công thức trong báo cáo — nếu không, con số "tiết kiệm 95%" rất khó bảo vệ trước khách hàng |
| P2-10 | `normalizeModelKey` khớp chuỗi lỏng: `includes('o1')`, `includes('4o')`, kết quả phụ thuộc thứ tự `if` | `pricingEngine.ts:236-290` | Chuyển sang bảng `[regex, key]` có test cho từng model |
| P2-11 | `costSidebarProvider.ts` 1.175 dòng HTML+CSS+JS trong một template string | toàn file | Tách `media/main.js`, `media/style.css`, nạp qua `webview.asWebviewUri` + nonce |
| P2-12 | `downloadFile` resolve ở sự kiện `finish` thay vì `close`; không huỷ response khi status ≠ 200 | `updater.ts:245-275` | Resolve trong callback của `close()`, `res.resume()` khi lỗi |

---

## 3. Lộ Trình Đề Xuất

### v1.3.3 — Hotfix (1-2 ngày)
Sửa những lỗi rẻ tiền nhưng nhìn thấy ngay:
P0-5 (`defaultLang`), P0-6 (version trong báo cáo), P1-1 (escape HTML), P2-6 (dead code), P2-3 (typecheck),
P2-4 (gitignore artifact), P2-5 (LICENSE + repository).

### v1.4 — Đúng số liệu (~1 tuần) — *ưu tiên cao nhất*
Sản phẩm này bán bằng con số; con số sai thì mọi thứ khác vô nghĩa.
- P0-1: thêm `cacheCreationTokens` / `cacheReadTokens` vào `SessionDetail`, hiển thị riêng trên dashboard và báo cáo.
- P0-2: gom `usage` theo từng model trong parser, tính tiền theo từng model.
- P0-3: bỏ mọi đường dẫn hardcode, thay bằng `acost.projectRoots` + suy ra từ `cwd`.
- P0-4: bỏ nhánh so khớp `basename`.
- P0-7: gắn nhãn measured/estimated + phụ lục phương pháp luận trong báo cáo.
- Bổ sung fixtures + test hồi quy cho từng mục trên (P2-1, P2-2).

### v1.5 — Hiệu năng & tin cậy (~1 tuần)
P1-5 (quét tăng dần theo byte offset), P1-6 (khoá chống quét chồng), P1-7 (LRU + persist cache),
P1-2 (CSP + nonce), P1-3 (siết updater), P2-11 (tách webview assets), CI đầy đủ.

### v2.0 — Mở rộng sản phẩm
- `pricing.json` cập nhật từ xa, không cần phát hành lại extension khi giá đổi.
- `acost.scanScope` + tài liệu quyền riêng tư (P1-4) — điều kiện cần để lên Marketplace.
- Thêm nguồn log: Cursor, GitHub Copilot, Codex CLI.
- Xuất PDF/Excel trực tiếp, so sánh nhiều dự án theo thời gian, biểu đồ chi phí theo ngày.
- Ngân sách & cảnh báo: đặt hạn mức $/tháng cho từng dự án, thông báo khi vượt.

---

## 4. Ba Việc Nên Làm Trước Tiên

1. **Sửa P0-1 và P0-2.** Đây là hai lỗi khiến chi phí và biểu đồ model sai lệch nhiều lần — ảnh hưởng trực tiếp tới
   giá trị cốt lõi của extension.
2. **Bỏ hardcode `/Volumes/Hao512gb/...` (P0-3).** Không sửa thì extension không dùng được cho bất kỳ ai khác.
3. **Escape HTML (P1-1).** Rẻ nhất trong ba việc, nhưng là thứ khách hàng nhìn thấy đầu tiên nếu báo cáo bị vỡ.
