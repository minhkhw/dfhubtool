# Tự động dịch và cập nhật `deltaforce-crate-data.js` bằng DeepL

## Script làm gì?
- Đọc danh mục `DFT_ITEMS` từ `fun/crate/deltaforce-crate-data.js`.
- Tìm những `objectName` có ký tự Trung Quốc.
- Gửi theo nhóm tới DeepL, dịch từ Trung Quốc sang tiếng Việt.
- Cập nhật các trường `name`, `nameVi`, `objectNameVi`, `shortName`.
- Tạo bản backup trước khi ghi đè file.
- Nếu DeepL lỗi hoặc trả bản dịch không hợp lệ, script dừng và không ghi đè file gốc.

## Cài đặt
1. Sao lưu website trước.
2. Chép `translate-catalog.php` vào thư mục gốc website, cùng cấp với thư mục `fun`.
3. Chép `deltaforce-crate-data.js` đính kèm vào `fun/crate/deltaforce-crate-data.js` nếu bạn muốn dùng đúng danh mục đã gửi. Nếu file trên VPS đã có dữ liệu mới hơn, giữ file trên VPS và chỉ chép script.
4. Mở `translate-catalog.php`, sửa:
   - `$DEEPL_API_KEY = 'DAN_DEEPL_API_KEY_CUA_BAN_VAO_DAY';`
   - Nếu dùng DeepL API Pro, đổi endpoint thành `https://api.deepl.com/v2/translate`. Với API Free, giữ `https://api-free.deepl.com/v2/translate`.
   - Nếu script không nằm ở thư mục gốc website, sửa `$CATALOG_FILE` thành đường dẫn chính xác đến `fun/crate/deltaforce-crate-data.js`.
5. Đảm bảo VPS có PHP CLI và cURL:
   - `php -v`
   - `php -m | grep -i curl`
6. SSH vào VPS, chuyển đến thư mục chứa script rồi chạy:
   `php translate-catalog.php`
7. Khi báo `Hoàn tất`, tải lại website bằng `Ctrl+F5`.

## Lưu ý
- Script chỉ chạy qua SSH/CLI, không mở trực tiếp trên trình duyệt.
- Script dịch các `objectName` còn tiếng Trung và sẽ thay các tên hiển thị hiện tại bằng kết quả DeepL tương ứng.
- API key được đặt trực tiếp trong file PHP theo yêu cầu hiện tại; không chia sẻ file này công khai và xóa/đổi khóa nếu vô tình làm lộ.
- Mỗi lần chạy đều tạo bản backup `deltaforce-crate-data.js.backup-YYYYMMDD-HHMMSS`.
- Chạy thử trên bản sao trước khi dùng trên website thật.
