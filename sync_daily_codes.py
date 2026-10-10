import os
import json
import re
import urllib.request
from datetime import datetime, timezone

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://deltaforcetools.gg/'
}

MAP_META = {
    'Dam': {'id': 'zero-dam', 'name': 'Dam', 'image': 'images/lhdb-bg.png'},
    'Layali Grove': {'id': 'layali-grove', 'name': 'Layali Grove', 'image': 'images/cgxg-bg.png'},
    'Brakkesh': {'id': 'brakkesh', 'name': 'Brakkesh', 'image': 'images/bks-bg.png'},
    'Space City': {'id': 'space-city', 'name': 'Space City', 'image': 'images/htjd-bg.png'},
    'Tide Prison': {'id': 'tide-prison', 'name': 'Tide Prison', 'image': 'images/cxjy-bg.png'},
    'AZ3': {'id': 'az3', 'name': 'AZ3', 'image': 'images/az3-bg.png'}
}

FALLBACK_CODES = [
    {"id": "zero-dam", "name": "Dam", "code": "0629", "date": "2026/10/10", "time": "08:00", "image": "images/lhdb-bg.png"},
    {"id": "layali-grove", "name": "Layali Grove", "code": "0685", "date": "2026/10/10", "time": "08:00", "image": "images/cgxg-bg.png"},
    {"id": "brakkesh", "name": "Brakkesh", "code": "0914", "date": "2026/10/10", "time": "08:00", "image": "images/bks-bg.png"},
    {"id": "space-city", "name": "Space City", "code": "0177", "date": "2026/10/10", "time": "08:00", "image": "images/htjd-bg.png"},
    {"id": "tide-prison", "name": "Tide Prison", "code": "0975", "date": "2026/10/10", "time": "08:00", "image": "images/cxjy-bg.png"},
    {"id": "az3", "name": "AZ3", "code": "0530", "date": "2026/10/10", "time": "08:00", "image": "images/az3-bg.png"}
]

def fetch_daily_codes(dest_file="public/data/daily_codes.json", timeout=6):
    codes_list = []
    now_iso = datetime.now(timezone.utc).isoformat()
    today_formatted = datetime.now().strftime("%Y/%m/%d")

    try:
        req = urllib.request.Request('https://deltaforcetools.gg/', headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as res:
            html = res.read().decode('utf-8', errors='ignore')

        card_blocks = re.findall(r'data-track-module="daily_codes".*?</div></div></div></div>', html, re.DOTALL)
        for b in card_blocks:
            name_m = re.search(r'data-track-prop="\{&quot;card_name&quot;:&quot;([^&]+)&quot;\}"', b)
            code_m = re.search(r'font-din text-3xl font-bold">(\d{4})</div>', b)
            date_m = re.search(r'mb-1\.5">([^<]+)</div>', b)
            time_m = re.search(r'mb-1\.5">.*?</div>\s*<div class="[^"]*">([^<]+)</div>', b)
            
            if name_m and code_m:
                raw_name = name_m.group(1).strip()
                code = code_m.group(1).strip()
                date_str = date_m.group(1).strip() if date_m else today_formatted
                time_str = time_m.group(1).strip() if time_m else "08:00"

                meta = MAP_META.get(raw_name, {
                    'id': raw_name.lower().replace(' ', '-'),
                    'name': raw_name,
                    'image': 'images/lhdb-bg.png'
                })

                codes_list.append({
                    "id": meta["id"],
                    "name": meta["name"],
                    "code": code,
                    "date": date_str,
                    "time": time_str,
                    "image": meta["image"]
                })

    except Exception as e:
        print(f"[!] Warning: Live daily codes crawl failed ({e}), using fallback/cached data.")

    if not codes_list or len(codes_list) < 4:
        # Try loading previous saved file
        if os.path.isfile(dest_file):
            try:
                with open(dest_file, "r", encoding="utf-8") as f:
                    saved = json.load(f)
                    if saved.get("codes"):
                        return saved
            except Exception:
                pass
        codes_list = FALLBACK_CODES

    result = {
        "success": True,
        "fetchedAt": now_iso,
        "source": "https://deltaforcetools.gg/",
        "codes": codes_list
    }

    try:
        os.makedirs(os.path.dirname(dest_file), exist_ok=True)
        with open(dest_file, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"[!] Failed to write {dest_file}: {e}")

    return result

if __name__ == "__main__":
    data = fetch_daily_codes()
    print("Fetched daily codes result:")
    print(json.dumps(data, indent=2, ensure_ascii=False))
