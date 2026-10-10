#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Delta Force Vietnam - Tự dịch tên vật phẩm bằng DeepL và cập nhật catalog JS.
Chạy bằng Python 3 trên Windows; chỉ chạy thủ công từ terminal, không qua trình duyệt.
"""

from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

# 1) DÁN DeepL API key vào giữa hai dấu nháy đơn.
DEEPL_API_KEY = "6930c001-4df9-439b-be8c-71099d01d1bd:fx"

# DeepL API Free:
DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"
# Nếu dùng DeepL API Pro, đổi dòng trên thành:
# DEEPL_API_URL = "https://api.deepl.com/v2/translate"

# Mặc định script nằm ở thư mục gốc dự án; file dữ liệu ở fun/crate/.
CATALOG_FILE = Path(__file__).resolve().parent / "fun" / "crate" / "deltaforce-crate-data.js"

BATCH_SIZE = 30
REQUEST_TIMEOUT = 60


def has_chinese(text: str) -> bool:
    return bool(re.search(r"[\u3400-\u4dbf\u4e00-\u9fff]", text or ""))


def extract_items(source: str):
    """Trích mảng JSON DFT_ITEMS và trả về vị trí đầu/cuối của mảng."""
    match = re.search(r"\bconst\s+DFT_ITEMS\s*=\s*\[", source)
    if not match:
        raise ValueError("Không tìm thấy `const DFT_ITEMS = [` trong file JS.")

    start = source.find("[", match.start())
    in_string = False
    escaped = False
    depth = 0

    for pos in range(start, len(source)):
        ch = source[pos]
        if in_string:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == '"':
                in_string = False
            continue

        if ch == '"':
            in_string = True
        elif ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                array_text = source[start:pos + 1]
                try:
                    items = json.loads(array_text)
                except json.JSONDecodeError as exc:
                    raise ValueError(
                        f"Mảng DFT_ITEMS không phải JSON hợp lệ tại dòng {exc.lineno}, "
                        f"cột {exc.colno}: {exc.msg}"
                    ) from exc
                if not isinstance(items, list):
                    raise ValueError("DFT_ITEMS không phải một danh sách.")
                return items, start, pos + 1

    raise ValueError("Không tìm thấy dấu đóng ] của mảng DFT_ITEMS.")


def deepl_translate(batch: list[str]) -> list[str]:
    # DeepL cần nhiều tham số text= lặp lại, không phải text[0], text[1].
    pairs = [
        ("auth_key", DEEPL_API_KEY.strip()),
        ("source_lang", "ZH"),
        ("target_lang", "VI"),
    ]
    pairs.extend(("text", value) for value in batch)
    body = urlencode(pairs).encode("utf-8")

    request = Request(
        DEEPL_API_URL,
        data=body,
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "DeltaForceCrateAutoTranslate/1.0",
        },
        method="POST",
    )

    try:
        with urlopen(request, timeout=REQUEST_TIMEOUT) as response:
            response_body = response.read().decode("utf-8")
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"DeepL trả về HTTP {exc.code}: {detail[:1200]}") from exc
    except URLError as exc:
        raise RuntimeError(f"Không kết nối được DeepL: {exc.reason}") from exc
    except TimeoutError as exc:
        raise RuntimeError("Kết nối DeepL quá thời gian chờ.") from exc

    try:
        decoded = json.loads(response_body)
        translations = decoded["translations"]
        results = [str(item["text"]).strip() for item in translations]
    except (json.JSONDecodeError, KeyError, TypeError, ValueError) as exc:
        raise RuntimeError(f"Phản hồi DeepL không đúng định dạng: {response_body[:1000]}") from exc

    if len(results) != len(batch):
        raise RuntimeError(
            f"DeepL trả về {len(results)} bản dịch, nhưng đã gửi {len(batch)} tên."
        )
    for translated in results:
        if not translated or has_chinese(translated):
            raise RuntimeError(
                "DeepL trả về bản dịch rỗng hoặc vẫn còn ký tự Trung Quốc. "
                "Đã dừng, chưa ghi đè file."
            )
    return results


def main() -> int:
    if not DEEPL_API_KEY or DEEPL_API_KEY == "DAN_DEEPL_API_KEY_CUA_BAN_VAO_DAY":
        print("LỖI: Hãy mở translate_catalog.py và dán DeepL API key vào biến DEEPL_API_KEY.")
        return 1

    path = CATALOG_FILE
    if not path.is_file():
        print(f"LỖI: Không tìm thấy file dữ liệu:\n  {path}")
        print("Hãy sửa CATALOG_FILE ở đầu file Python cho đúng vị trí deltaforce-crate-data.js.")
        return 1

    try:
        source = path.read_text(encoding="utf-8-sig")
        items, array_start, array_end = extract_items(source)
    except (OSError, ValueError) as exc:
        print(f"LỖI đọc catalog: {exc}")
        return 1

    todo = []
    for index, item in enumerate(items):
        if not isinstance(item, dict):
            continue
        original = str(item.get("objectName") or "").strip()
        if original and has_chinese(original):
            todo.append((index, original, item.get("objectID", "unknown")))

    if not todo:
        print(f"Không tìm thấy tên tiếng Trung cần dịch trong {len(items)} vật phẩm. Không thay đổi file.")
        return 0

    print(f"Tìm thấy {len(todo)} tên tiếng Trung trong {len(items)} vật phẩm.")
    print(f"File dữ liệu: {path}")
    print("Bắt đầu dịch qua DeepL...")

    translations: dict[int, str] = {}
    total = len(todo)
    try:
        for offset in range(0, total, BATCH_SIZE):
            chunk = todo[offset:offset + BATCH_SIZE]
            translated_batch = deepl_translate([entry[1] for entry in chunk])
            for (index, _original, _object_id), translated in zip(chunk, translated_batch):
                translations[index] = translated

            done = min(offset + len(chunk), total)
            print(f"  Đã dịch {done}/{total} tên.")
            # Nghỉ ngắn giữa các nhóm để tránh gửi dồn dập.
            if done < total:
                time.sleep(0.3)
    except RuntimeError as exc:
        print(f"\nLỖI DỊCH: {exc}")
        print("Đã dừng và KHÔNG ghi đè file dữ liệu.")
        return 1

    for index, translated in translations.items():
        items[index]["name"] = translated
        items[index]["nameVi"] = translated
        items[index]["objectNameVi"] = translated
        items[index]["shortName"] = translated

    new_array = json.dumps(items, ensure_ascii=False, indent=2)
    new_source = source[:array_start] + new_array + source[array_end:]

    timestamp = time.strftime("%Y%m%d-%H%M%S")
    backup = path.with_name(path.name + f".backup-{timestamp}")
    temp = path.with_name(path.name + ".tmp")

    try:
        # Ghi backup trước; file gốc chỉ được thay sau khi tất cả bản dịch hợp lệ.
        backup.write_text(source, encoding="utf-8", newline="\n")
        temp.write_text(new_source, encoding="utf-8", newline="\n")
        temp.replace(path)
    except OSError as exc:
        try:
            if temp.exists():
                temp.unlink()
        except OSError:
            pass
        print(f"LỖI ghi file: {exc}")
        print(f"File gốc chưa được cập nhật hoàn chỉnh. Bản backup (nếu đã tạo): {backup}")
        return 1

    print("\nHOÀN TẤT!")
    print(f"Đã cập nhật {len(translations)} vật phẩm.")
    print(f"File đã cập nhật: {path}")
    print(f"Bản sao lưu: {backup}")
    print("Hãy tải lại website bằng Ctrl+F5.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("\nĐã hủy theo yêu cầu. Nếu chưa tới bước ghi file thì catalog chưa thay đổi.")
        raise SystemExit(130)
