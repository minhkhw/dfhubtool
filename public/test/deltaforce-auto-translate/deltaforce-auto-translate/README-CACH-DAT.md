# Bản sửa dịch tên vật phẩm Delta Force

## Các file
- `minigame.js`: ưu tiên bản dịch theo `objectID`, gọi endpoint dịch nếu tên còn là tiếng Trung, không hiển thị tên Trung khi dịch lỗi.
- `fun/crate/deltaforce-crate-data.js`: danh mục vật phẩm đã dịch hiện có, đặt đúng đường dẫn đang được `minigame.html` nạp.
- `api/crate/translate.php`: dịch ở phía máy chủ; cache bản dịch và ghi log lỗi.
- `minigame.html`: cập nhật query version để trình duyệt tải JS mới.
- `storage/.htaccess`: chặn truy cập trực tiếp cache/log khi máy chủ dùng Apache.

## Cài đặt
1. Sao lưu file cũ trước khi chép đè.
2. Chép `minigame.js` và `minigame.html` vào thư mục gốc trang web.
3. Chép `fun/crate/deltaforce-crate-data.js` đè lên file cùng tên hiện có.
4. Chép `api/crate/translate.php` vào đúng thư mục tương ứng. PHP cần bật extension cURL và quyền ghi thư mục `storage/`.
5. Tạo thư mục `storage/` ở thư mục gốc website, cho PHP quyền ghi; giữ `.htaccess` để cache/log không bị tải trực tiếp.
6. Có thể cấu hình biến môi trường máy chủ `DEEPL_API_KEY` để ưu tiên DeepL. Không ghi khóa vào HTML/JS, không commit khóa vào source code. `DEEPL_API_URL` là tùy chọn, mặc định dùng endpoint DeepL API Free.
7. Nếu không cấu hình DeepL, endpoint dùng MyMemory công khai làm dự phòng (có thể giới hạn tốc độ). Bản dịch thành công được cache ở `storage/df-translation-cache.json`; lỗi được ghi vào `storage/df-translation-errors.jsonl`.
8. Sau khi cài, mở trang và nhấn Ctrl+F5. Kiểm tra Network request `/api/crate/translate.php` khi có vật phẩm chưa dịch.

## Ghi chú
- Tên có trong danh mục sẽ dùng bản dịch theo `objectID`, không gọi dịch máy.
- Tên lạ chỉ được dịch khi API cung cấp một trường tên nguồn. Nếu thiếu tên nguồn hoặc dịch vụ không khả dụng, UI hiển thị `Vật phẩm #objectID` (hoặc `Vật phẩm chưa có bản dịch`) và ghi log; không hiện lại tên tiếng Trung.
- Tên dịch tự động có thể chưa chuẩn thuật ngữ game; nên kiểm tra log/cache và bổ sung bản dịch chuẩn vào danh mục khi cần.
