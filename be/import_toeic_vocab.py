#!/usr/bin/env python3
"""
Import TOEIC Vocabulary from IRIS English into LanguageFarmDb (SQL Server)
- 50 Topics
- 1,332 Vocabularies with Phonetic, Meaning, and Example sentences
- Auto-generates Quiz questions for each lesson
- Sets Progression & Crop Unlock mechanics
- SpriteKey = NULL for vocabularies as requested (No images for vocabularies)
"""

import re
import json
import random
import os
import subprocess
from collections import defaultdict

RAW_FILE = os.path.join(os.path.dirname(__file__), 'raw_toeic_input.txt')
SQL_OUT_FILE = os.path.join(os.path.dirname(__file__), 'Seed_Toeic_Vocab.sql')

def escape_sql(text):
    if text is None:
        return 'NULL'
    return "'" + str(text).replace("'", "''").strip() + "'"

def parse_raw_data():
    with open(RAW_FILE, 'r', encoding='utf-8') as f:
        text = f.read()

    sections = re.split(r'Từ vựng TOEIC theo chủ đề:\s*', text)
    topics_dict = defaultdict(list)

    for s in sections[1:]:
        lines = [l.strip() for l in s.split('\n') if l.strip()]
        if not lines:
            continue
        topic_title = lines[0]

        content_lines = []
        for l in lines[1:]:
            if l in ['Từ vựng TOEIC', 'Phiên âm', 'Dịch nghĩa', 'Ví dụ']:
                continue
            if 'Từ vựng TOEIC theo chủ đề:' in l or l.startswith('[') or l.startswith('http'):
                continue
            content_lines.append(l)

        i = 0
        while i < len(content_lines) - 3:
            w = content_lines[i]
            p = content_lines[i+1]
            m = content_lines[i+2]
            e = content_lines[i+3]

            is_valid_word = (
                len(w) <= 35 and
                not any(c in 'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ[]()' for c in w) and
                (p.startswith('/') or p.endswith('/') or 'ˈ' in p or 'ˌ' in p) and
                len(e) >= 5 and ' ' in e
            )

            if is_valid_word:
                if not any(item['word'].lower() == w.lower() for item in topics_dict[topic_title]):
                    topics_dict[topic_title].append({
                        'word': w,
                        'phonetic': p,
                        'meaning': m,
                        'example': e
                    })
                i += 4
            else:
                i += 1

    return [(k, v) for k, v in topics_dict.items() if len(v) > 0]

def detect_word_type(word):
    w = word.lower().strip()
    if w.endswith(('ment', 'tion', 'sion', 'ence', 'ance', 'er', 'or', 'ist', 'ity', 'ness', 'ship')):
        return 'noun'
    if w.endswith(('able', 'ible', 'ive', 'al', 'ful', 'ous', 'ic', 'ish')):
        return 'adjective'
    if w.endswith('ly'):
        return 'adverb'
    if w.endswith(('ize', 'ise', 'ate', 'fy')):
        return 'verb'
    return 'noun'

def generate_sql(topics):
    sql_lines = [
        "-- ==========================================================================",
        "-- SEED SCRIPT: 1000+ TOEIC VOCABULARIES BY 50 TOPICS (LANGUAGE FARM)",
        "-- ==========================================================================",
        "USE LanguageFarmDb;",
        "GO",
        "SET NOCOUNT ON;",
        "PRINT N'Bắt đầu nạp 50 chủ đề từ vựng TOEIC...';",
        ""
    ]

    order_idx = 3 # Lessons 1 and 2 already exist

    for t_idx, (topic_title, words) in enumerate(topics, 1):
        # Determine Level and Crop requirement
        if t_idx <= 15:
            level_tag = 'TOEIC 450'
        elif t_idx <= 35:
            level_tag = 'TOEIC 650'
        else:
            level_tag = 'TOEIC 800'

        if t_idx <= 5:
            crop_id = 'NULL'
            crop_qty = 0
        elif t_idx <= 15:
            crop_id = '1' # carrot
            crop_qty = 2
        elif t_idx <= 30:
            crop_id = '2' # corn
            crop_qty = 3
        else:
            crop_id = '3' # tomato
            crop_qty = 3

        esc_title = escape_sql(topic_title)
        sql_lines.append(f"-- Chủ đề {t_idx}: {topic_title} ({len(words)} từ)")
        sql_lines.append(f"DECLARE @LessonId_{t_idx} INT;")
        sql_lines.append(f"SELECT @LessonId_{t_idx} = Id FROM dbo.Lessons WHERE Title = N{esc_title} AND LanguageCode = 'en';")
        sql_lines.append(f"IF @LessonId_{t_idx} IS NULL")
        sql_lines.append("BEGIN")
        sql_lines.append(f"    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)")
        sql_lines.append(f"    VALUES (N{esc_title}, 'en', '{level_tag}', {order_idx}, {crop_id}, {crop_qty});")
        sql_lines.append(f"    SET @LessonId_{t_idx} = SCOPE_IDENTITY();")
        sql_lines.append("END")
        order_idx += 1

        # Insert Vocabularies
        for w in words:
            word_str = escape_sql(w['word'])
            pho_str = escape_sql(w['phonetic'])
            mean_str = escape_sql(w['meaning'])
            ex_str = escape_sql(w['example'])
            w_type = escape_sql(detect_word_type(w['word']))

            sql_lines.append(f"IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_{t_idx} AND Word = N{word_str})")
            sql_lines.append(f"    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)")
            sql_lines.append(f"    VALUES (@LessonId_{t_idx}, N{word_str}, N{pho_str}, N{pho_str}, N{w_type}, N{mean_str}, N{ex_str}, NULL);")

        # Generate 3 Quiz Questions for this lesson
        random.seed(t_idx * 42)
        sample_words = random.sample(words, min(3, len(words)))
        for q_idx, sw in enumerate(sample_words, 1):
            prompt = f"Từ \"{sw['word']}\" có nghĩa là gì?"
            correct_meaning = sw['meaning']
            
            # Pick 3 distractors
            other_meanings = [ow['meaning'] for ow in words if ow['meaning'] != correct_meaning]
            if len(other_meanings) >= 3:
                distractors = random.sample(other_meanings, 3)
            else:
                distractors = other_meanings + ["Khái niệm khác", "Không xác định", "Ý nghĩa tổng quát"][:3 - len(other_meanings)]

            options = [correct_meaning] + distractors[:3]
            random.shuffle(options)
            correct_idx = options.index(correct_meaning)
            options_json = json.dumps(options, ensure_ascii=False)

            esc_prompt = escape_sql(prompt)
            esc_options = escape_sql(options_json)

            sql_lines.append(f"IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_{t_idx} AND Prompt = N{esc_prompt})")
            sql_lines.append(f"    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)")
            sql_lines.append(f"    VALUES (@LessonId_{t_idx}, N{esc_prompt}, NULL, N{esc_options}, {correct_idx});")

        sql_lines.append("") # Blank line between lessons

    sql_lines.append("PRINT N'Hoàn tất nạp dữ liệu TOEIC thành công!';")
    sql_lines.append("GO")

    return "\n".join(sql_lines)

def main():
    print("Parsing TOEIC vocabulary raw text...")
    topics = parse_raw_data()
    total_words = sum(len(w) for _, w in topics)
    print(f"Extracted {len(topics)} topics with {total_words} words.")

    print(f"Generating SQL seed script: {SQL_OUT_FILE}...")
    sql_content = generate_sql(topics)

    with open(SQL_OUT_FILE, 'w', encoding='utf-8') as f:
        f.write(sql_content)

    print(f"SQL Seed file generated successfully ({len(sql_content.splitlines())} lines).")

    # Execute inside Docker SQL Server container
    print("Executing SQL Seed Script in Docker SQL Server (englishfarm-sqlserver)...")
    cmd = [
        "docker", "exec", "-i", "englishfarm-sqlserver",
        "/opt/mssql-tools18/bin/sqlcmd",
        "-S", "localhost",
        "-U", "hain_admin",
        "-P", "Your_Password123",
        "-C",
        "-d", "LanguageFarmDb"
    ]
    
    proc = subprocess.run(cmd, input=sql_content, text=True, capture_output=True, encoding='utf-8')
    print("STDOUT:", proc.stdout)
    if proc.stderr:
        print("STDERR:", proc.stderr)
    print(f"Exit code: {proc.returncode}")

if __name__ == '__main__':
    main()
