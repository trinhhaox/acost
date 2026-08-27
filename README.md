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

## 📋 Báo Cáo Định Giá Mẫu
Khi xuất báo cáo (`acost.exportReport`), extension sẽ tạo file `PROJECT_VALUATION_REPORT.md` ngay tại thư mục gốc dự án chứa đầy đủ bảng số liệu chi tiết, tỷ lệ phần trăm từng model và bảng phân tích tiết kiệm chi phí.

