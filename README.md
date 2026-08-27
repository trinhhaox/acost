# Acost - AI Cost & Project Valuation Extension 📊

Extension độc lập cho **Antigravity IDE / VS Code** giúp đo lường toàn diện chi phí AI khi xây dựng dự án:
- 🤖 **Nhận diện Model:** Đo lường các model AI tham gia lập trình (Gemini 3.7 Flash, Claude 3.7 Sonnet, GPT-4o, Claude 3.5 Sonnet, v.v.).
- 🪙 **Đo Lường Token Chi Tiết:** Tính toán Prompt/Input tokens, Output tokens và Thinking/Reasoning tokens.
- ⏱️ **Thời Gian Thực Thi (Time Tracking):** Active coding time, session time, số lượt turns prompt.
- 💰 **Quy Đổi Chi Phí & Định Giá Dự Án (Valuation):**
  - Chi phí token API thực tế ($ USD và ₫ VND).
  - Định giá hoàn thành dự án với hệ số Markup (x2.5, x3.0...) + Công chuyên gia vận hành AI.
  - So sánh chi phí và tỷ lệ tiết kiệm so với thuê Dev truyền thống (ROI).
- 📄 **Xuất Báo Cáo Chuyên Nghiệp:** Xuất báo cáo `PROJECT_VALUATION_REPORT.md` hoặc `PROJECT_VALUATION_REPORT.html` đính kèm khi bàn giao dự án cho khách hàng.

---

## 🚀 Cài Đặt & Sử Dụng

### 1. Build & Đóng gói VSIX
```bash
npm install
npm run build
npx vsce package
```

### 2. Cài đặt vào Antigravity IDE / VS Code
- Chạy lệnh cài đặt từ terminal:
  ```bash
  code --install-extension acost-1.3.0.vsix
  # hoặc trong Antigravity CLI:
  agy --install-extension acost-1.3.0.vsix
  ```
- Hoặc mở Antigravity IDE -> Extensions -> `...` -> **Install from VSIX...** -> Chọn file `acost-1.3.0.vsix`.

---

## ⚙️ Cấu Hình (Settings)

Mở Settings (`Cmd+,`) và tìm `acost`:

| Cấu hình | Mặc định | Mô tả |
| :--- | :--- | :--- |
| `acost.currency` | `USD` | Tiền tệ hiển thị (`USD` hoặc `VND`) |
| `acost.vndExchangeRate` | `25500` | Tỷ giá quy đổi USD sang VND |
| `acost.markupMultiplier` | `2.5` | Hệ số nhân định giá dự án trên chi phí AI |
| `acost.humanHourlyRate` | `25` | Mức lương tương đương / giờ của Dev truyền thống ($) |
| `acost.customPricing` | `{}` | Tùy chỉnh giá token cho từng model cụ thể |

---

## 🔄 Cơ Chế Tự Động Cập Nhật (Auto-Update)

Extension được tích hợp sẵn hệ thống kiểm tra và thông báo phiên bản mới tự động:
1. **Khi người dùng mở IDE:** Extension tự động kiểm tra bản phát hành mới nhất từ GitHub Releases sau 3 giây và định kỳ mỗi 2 giờ.
2. **Khi có bản cập nhật:**
   - Người dùng sẽ nhận được popup thông báo: `🚀 Đã có phiên bản mới Acost vX.X.X! Bạn có muốn cập nhật ngay không?`.
   - Cung cấp nút **`⚡ 1-Click Update`** để extension tự động tải file VSIX từ GitHub về và cài đặt trực tiếp không cần thao tác thủ công.

### 📦 Quy Trình Phát Hành Phiên Bản Mới (Dành Cho Tác Giả):
1. Tăng version trong `package.json` (ví dụ `1.3.1`).
2. Build và đóng gói file VSIX:
   ```bash
   npm run build
   npx @vscode/vsce package --allow-missing-repository
   ```
3. Commit, gắn tag và push lên GitHub:
   ```bash
   git add -A
   git commit -m "release: v1.3.1"
   git tag v1.3.1
   git push origin main --tags
   ```
4. Truy cập **[GitHub Releases](https://github.com/trinhhaox/acost/releases)** -> Tạo **New Release** với tag `v1.3.1` và tải đính kèm file `acost-1.3.1.vsix`.
5. Tất cả người dùng đã cài đặt extension sẽ nhận được thông báo cập nhật tự động ngay trong IDE!


