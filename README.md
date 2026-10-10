
## 🚀 Cách khởi động server Local (1-Click)

Chỉ cần **nhấp đúp chuột (Double Click)** vào một trong hai file:

- **`start_server.bat`** (Trình khởi động máy chủ thông minh tự động mở trình duyệt web)
- **`run.bat`** (Phím tắt khởi động nhanh)

> **Cơ chế tự động & Chống xung đột cổng:**
> 1. Script tự động kiểm tra và giải phóng cổng 8080 nếu có tiến trình cũ chiếm dụng.
> 2. Ưu tiên chạy **PHP** (`php -S 127.0.0.1:8080 router.php`) nếu máy có PHP.
> 3. Tự động chuyển mượt mà sang **Python 3** (`python server.py 8080`) hoặc **Node.js** (`node server.js 8080`) có sẵn trên Windows.
> 4. Tự động mở trình duyệt web đến địa chỉ: **`http://localhost:8080`**.

---


## 🎮 Các tính năng chính của DFVN

| Trang | Đường dẫn | Chức năng chính |
| :--- | :--- | :--- |
| **Trang chủ** | `/` | Menu Drawer, đa ngôn ngữ VI/ENG, thống kê Discord, Banner mascot, Slider Creator, Tin tức. |
| **Bản đồ chiến thuật** | `/map.html` | Bản đồ tương tác Đập Zero, Rừng Layali, Space City, Radar Station; lớp lọc cửa thẻ khóa, két sắt, boss, điểm rút quân. |
| **Kho vũ khí & Code súng** | `/weapons.html` | Danh mục súng, sao chép 1-click mã code 5v5 và OP, đăng bài chia sẻ kinh nghiệm. |
| **Wiki Delta Force** | `/wiki.html` | Chợ đấu giá giá vật phẩm, kho catalog, công thức chế tạo tính lợi nhuận/giờ. |
| **Tin tức & Sự kiện** | `/news.html`, `/events.html` | Tin tức Garena, đồng hồ đếm ngược sự kiện theo giây. |

---
