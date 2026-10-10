<?php
/**
 * Delta Force Vietnam - Dịch và cập nhật tên vật phẩm trong deltaforce-crate-data.js
 *
 * CHẠY BẰNG CLI, KHÔNG CHẠY TRÊN TRÌNH DUYỆT:
 *   php translate-catalog.php
 *
 * Cần PHP CLI + cURL extension.
 */

// 1) DÁN DeepL API key của bạn vào đây.
// Khóa API không được có dấu cách hoặc xuống dòng.
$DEEPL_API_KEY = '6930c001-4df9-439b-be8c-71099d01d1bd:fx';

// 2) Chọn endpoint đúng loại khóa:
// DeepL API Free: https://api-free.deepl.com/v2/translate
// DeepL API Pro:  https://api.deepl.com/v2/translate
$DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

// Đường dẫn mặc định: script đặt cạnh thư mục fun/crate.
// Nếu cấu trúc VPS khác, chỉnh biến này thành đường dẫn tuyệt đối tới file dữ liệu.
$CATALOG_FILE = __DIR__ . '/fun/crate/deltaforce-crate-data.js';

// Mỗi request dịch tối đa 30 tên để tránh request quá lớn.
$BATCH_SIZE = 30;

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("Chỉ được chạy bằng PHP CLI qua SSH, không chạy từ trình duyệt.\n");
}
if ($DEEPL_API_KEY === '6930c001-4df9-439b-be8c-71099d01d1bd:fx' || trim($DEEPL_API_KEY) === '') {
    fwrite(STDERR, "Bạn chưa dán DeepL API key vào biến \$DEEPL_API_KEY trong translate-catalog.php\n");
    exit(1);
}
if (!extension_loaded('curl')) {
    fwrite(STDERR, "PHP chưa bật extension cURL. Hãy cài/bật php-curl rồi thử lại.\n");
    exit(1);
}
if (!is_file($CATALOG_FILE) || !is_readable($CATALOG_FILE) || !is_writable($CATALOG_FILE)) {
    fwrite(STDERR, "Không đọc/ghi được file dữ liệu: {$CATALOG_FILE}\n");
    fwrite(STDERR, "Hãy sửa \$CATALOG_FILE cho đúng đường dẫn trên VPS.\n");
    exit(1);
}

$source = file_get_contents($CATALOG_FILE);
if ($source === false || !preg_match('/const\s+DFT_ITEMS\s*=\s*(\[.*?\]);/s', $source, $match)) {
    fwrite(STDERR, "Không tìm thấy mảng const DFT_ITEMS trong file dữ liệu.\n");
    exit(1);
}
$items = json_decode($match[1], true);
if (!is_array($items)) {
    fwrite(STDERR, "Không đọc được mảng DFT_ITEMS dưới dạng JSON: " . json_last_error_msg() . "\n");
    exit(1);
}

function containsChineseText($value) {
    return is_string($value) && preg_match('/[\x{3400}-\x{9FFF}]/u', $value) === 1;
}

// Dịch các tên gốc có ký tự Trung Quốc. Tên Việt đã có sẵn sẽ được cập nhật
// bằng bản DeepL để đồng nhất với tên nguồn objectName.
$todo = [];
foreach ($items as $index => $item) {
    $sourceName = trim((string)($item['objectName'] ?? ''));
    if ($sourceName !== '' && containsChineseText($sourceName)) {
        $todo[] = ['index' => $index, 'sourceName' => $sourceName, 'objectID' => $item['objectID'] ?? null];
    }
}
if (!$todo) {
    echo "Không tìm thấy tên tiếng Trung cần dịch. Không thay đổi file.\n";
    exit(0);
}

echo "Tìm thấy " . count($todo) . " tên cần dịch trong " . count($items) . " vật phẩm.\n";
$translations = [];
$total = count($todo);

foreach (array_chunk($todo, $BATCH_SIZE) as $batchNumber => $batch) {
    // DeepL yêu cầu nhiều tham số "text=" lặp lại; không gửi dạng text[0], text[1].
    $formPairs = [
        'auth_key=' . urlencode($DEEPL_API_KEY),
        'source_lang=ZH',
        'target_lang=VI',
    ];
    foreach ($batch as $entry) {
        $formPairs[] = 'text=' . urlencode($entry['sourceName']);
    }
    $postBody = implode('&', $formPairs);

    $ch = curl_init($DEEPL_API_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postBody,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    ]);
    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $httpCode < 200 || $httpCode >= 300) {
        fwrite(STDERR, "\nLỗi DeepL ở nhóm " . ($batchNumber + 1) . " (HTTP {$httpCode}).\n");
        if ($curlError) fwrite(STDERR, "cURL: {$curlError}\n");
        fwrite(STDERR, substr((string)$response, 0, 1500) . "\n");
        fwrite(STDERR, "Đã dừng và KHÔNG ghi đè file dữ liệu. Kiểm tra API key, endpoint và hạn mức.\n");
        exit(1);
    }

    $decoded = json_decode($response, true);
    if (!isset($decoded['translations']) || count($decoded['translations']) !== count($batch)) {
        fwrite(STDERR, "\nPhản hồi DeepL không đúng định dạng ở nhóm " . ($batchNumber + 1) . ". Không ghi file.\n");
        fwrite(STDERR, substr((string)$response, 0, 1000) . "\n");
        exit(1);
    }

    foreach ($batch as $offset => $entry) {
        $translated = trim((string)($decoded['translations'][$offset]['text'] ?? ''));
        if ($translated === '' || containsChineseText($translated)) {
            fwrite(STDERR, "\nBản dịch rỗng hoặc còn ký tự Trung Quốc: objectID=" . ($entry['objectID'] ?? 'unknown') . "\n");
            fwrite(STDERR, "Không ghi đè file để tránh lưu dữ liệu lỗi.\n");
            exit(1);
        }
        $translations[$entry['index']] = $translated;
    }

    $done = min(($batchNumber + 1) * $BATCH_SIZE, $total);
    echo "\rĐã dịch {$done}/{$total} tên...";
}
echo "\nĐang cập nhật dữ liệu...\n";

foreach ($translations as $index => $translated) {
    // Cập nhật các trường mà giao diện/engine có thể dùng để hiển thị tên.
    $items[$index]['name'] = $translated;
    $items[$index]['nameVi'] = $translated;
    $items[$index]['objectNameVi'] = $translated;
    $items[$index]['shortName'] = $translated;
}

// JSON_PRETTY_PRINT giữ định dạng dễ đọc; các phần khác của JS được giữ nguyên.
$newArray = json_encode($items, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
if ($newArray === false) {
    fwrite(STDERR, "Không mã hóa được dữ liệu: " . json_last_error_msg() . "\n");
    exit(1);
}
$newSource = preg_replace('/const\s+DFT_ITEMS\s*=\s*\[.*?\];/s', 'const DFT_ITEMS = ' . $newArray . ';', $source, 1, $replaceCount);
if ($newSource === null || $replaceCount !== 1) {
    fwrite(STDERR, "Không thể thay thế mảng DFT_ITEMS. File chưa bị thay đổi.\n");
    exit(1);
}

// Backup trước khi ghi đè.
$backup = $CATALOG_FILE . '.backup-' . date('Ymd-His');
if (!copy($CATALOG_FILE, $backup)) {
    fwrite(STDERR, "Không tạo được bản sao lưu: {$backup}. File chưa bị thay đổi.\n");
    exit(1);
}
$tmp = $CATALOG_FILE . '.tmp';
if (file_put_contents($tmp, $newSource, LOCK_EX) === false || !rename($tmp, $CATALOG_FILE)) {
    @unlink($tmp);
    fwrite(STDERR, "Ghi file thất bại. Bản backup ở: {$backup}\n");
    exit(1);
}

echo "Hoàn tất! Đã cập nhật " . count($translations) . " tên vật phẩm.\n";
echo "File: {$CATALOG_FILE}\n";
echo "Backup: {$backup}\n";
echo "Bây giờ hãy tải lại website bằng Ctrl+F5.\n";
