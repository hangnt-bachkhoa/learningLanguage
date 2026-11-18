# -*- coding: utf-8 -*-
from __future__ import annotations
"""
Script tự động tải dữ liệu nét chữ (SVG Stroke Order) từ kho mã nguồn mở KanjiVG
cho toàn bộ bảng Hiragana, Katakana và các chữ Kanji trong bộ jlpt_n5_vocab_seed.json,
sau đó đóng gói thành 1 file n5_strokes.json gọn nhẹ để nhúng vào Angular.

Cách chạy trên máy Mac của bạn:
  python3 fetch_kanjivg_n5.py path/to/jlpt_n5_vocab_seed.json
"""

import json
import os
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET

KANA_ALL = (
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
)

def is_jp_char(ch: str) -> bool:
    code = ord(ch)
    return (
        (0x3040 <= code <= 0x309F) or  # Hiragana
        (0x30A0 <= code <= 0x30FF) or  # Katakana
        (0x4E00 <= code <= 0x9FFF)     # CJK Unified Ideographs (Kanji)
    )

def collect_unique_chars(seed_path: str) -> list[str]:
    chars = set(KANA_ALL)
    if os.path.exists(seed_path):
        with open(seed_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        for topic in data.get("topics", []):
            for w in topic.get("words", []):
                for field in (w.get("scriptPrimary", ""), w.get("readingSub", "")):
                    for ch in field:
                        if is_jp_char(ch) and ch not in ("ー", "・"):
                            chars.add(ch)
    return sorted(chars)

def fetch_svg_strokes(ch: str) -> list[str] | None:
    hex5 = f"{ord(ch):05x}"
    url = f"https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/{hex5}.svg"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "LanguageFarm-Fetcher/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            svg_bytes = resp.read()
        root = ET.fromstring(svg_bytes)
        paths = []
        for elem in root.iter():
            if elem.tag.endswith("path") and elem.attrib.get("d"):
                paths.append(elem.attrib["d"])
        return paths if paths else None
    except Exception as e:
        print(f"  [Skip] {ch} ({hex5}): {e}")
        return None

def main():
    seed_path = sys.argv[1] if len(sys.argv) > 1 else "jlpt_n5_vocab_seed.json"
    chars = collect_unique_chars(seed_path)
    print(f"Tìm thấy {len(chars)} ký tự tiếng Nhật duy nhất (Kana + Kanji N5). Đang tải từ KanjiVG...")

    strokes_db = {}
    for idx, ch in enumerate(chars, 1):
        paths = fetch_svg_strokes(ch)
        if paths:
            strokes_db[ch] = paths
        if idx % 25 == 0 or idx == len(chars):
            print(f"  Tiến độ: {idx}/{len(chars)} ký tự...")
        time.sleep(0.03)

    out_path = "n5_strokes.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(strokes_db, f, ensure_ascii=False)

    print(f"Hoàn tất! Đã lưu {len(strokes_db)} ký tự vào {out_path} ({os.path.getsize(out_path) // 1024} KB).")

if __name__ == "__main__":
    main()