import { Injectable } from '@angular/core';
import { VocabularyDto, QuizSessionDto } from './farm-api.service';
import { DEFAULT_VOCABULARIES } from '../constants/default-vocabularies.constant';

export interface UserWordStat {
  userId: number;
  vocabId: number;
  attempts: number;
  wrongCount: number;
  lastSeenAt: string; // ISO string
}

export interface UserLessonProgress {
  userId: number;
  lessonId: number;
  bestScorePercent: number;
  bestStarsClaimed: number; // 0..3
  firstPassedAt?: string;
}

export type QuestionFormat = 'EN_TO_VI' | 'CONTEXT_CLOZE' | 'LISTENING' | 'VI_TO_EN';

export interface GeneratedQuestion {
  id: number;
  vocabId: number;
  lessonId: number;
  format: QuestionFormat;
  prompt: string;
  word: string;
  phonetic: string | null;
  spriteKey: string | null;
  exampleEn: string | null;
  exampleVi: string | null;
  options: string[];
  correctIndex: number;
  correctAnswer: string;
  isRetry?: boolean;
}

export interface TierReward {
  stars: number;
  seeds: number;
  water: number;
  fertilizer: number;
  coins: number;
  xp: number;
}

export const TIER_REWARDS: Record<number, TierReward> = {
  3: { stars: 3, seeds: 2, water: 2, fertilizer: 1, coins: 50, xp: 100 },
  2: { stars: 2, seeds: 1, water: 2, fertilizer: 0, coins: 35, xp: 70 },
  1: { stars: 1, seeds: 1, water: 1, fertilizer: 0, coins: 20, xp: 40 },
  0: { stars: 0, seeds: 0, water: 0, fertilizer: 0, coins: 0, xp: 0 }
};

@Injectable({
  providedIn: 'root'
})
export class QuizEngineService {

  /**
   * Thuật toán 1: Smart Pool Sampling (10 câu mỗi phiên)
   * Trọng số = (wrongCount * 50) + (attempts === 0 ? 30 : 0) + (daysSinceLastSeen >= 3 ? 20 : 0) + random(0, 15)
   */
  sampleQuizWords(
    topicWords: VocabularyDto[],
    userStats: Record<number, UserWordStat>
  ): VocabularyDto[] {
    if (!topicWords || topicWords.length === 0) return [];

    const now = Date.now();
    const scored = topicWords.map(w => {
      const stat = userStats[w.id];
      const wrongCount = stat?.wrongCount || 0;
      const attempts = stat?.attempts || 0;
      const lastSeen = stat?.lastSeenAt ? new Date(stat.lastSeenAt).getTime() : 0;
      const daysSinceLastSeen = lastSeen > 0 ? (now - lastSeen) / (1000 * 60 * 60 * 24) : 999;

      const wrongBonus = wrongCount * 50;
      const unseenBonus = attempts === 0 ? 30 : 0;
      const staleBonus = daysSinceLastSeen >= 3 ? 20 : 0;
      const randomJitter = Math.floor(Math.random() * 16); // 0..15

      const weight = wrongBonus + unseenBonus + staleBonus + randomJitter;
      return { vocab: w, weight };
    });

    scored.sort((a, b) => b.weight - a.weight);
    const count = Math.min(10, topicWords.length);
    const selected = scored.slice(0, count).map(s => s.vocab);

    // Nếu chủ đề có ít hơn 10 từ thì bốc thêm ngẫu nhiên cho đủ 10
    while (selected.length < 10 && topicWords.length > 0) {
      const extra = topicWords[Math.floor(Math.random() * topicWords.length)];
      selected.push(extra);
    }

    return selected;
  }

  /**
   * Thuật toán 2: Sinh 10 câu hỏi đa dạng với 4 format:
   * typeCycle = ['EN_TO_VI', 'CONTEXT_CLOZE', 'LISTENING', 'VI_TO_EN']
   * và bộ Distractor 3 tầng (Tier 1 -> Tier 2 -> Tier 3).
   */
  generateSessionQuestions(
    lessonId: number,
    topicWords: VocabularyDto[],
    userStats: Record<number, UserWordStat> = {}
  ): GeneratedQuestion[] {
    const selectedVocabs = this.sampleQuizWords(topicWords, userStats);
    const typeCycle: QuestionFormat[] = ['EN_TO_VI', 'CONTEXT_CLOZE', 'LISTENING', 'VI_TO_EN'];

    // Lấy pool từ vựng của tất cả bài học để làm Tier 3 distractors
    const allLessonVocabs = this.getAllVocabulariesPool();

    return selectedVocabs.map((vocab, index) => {
      const targetFormat = typeCycle[index % typeCycle.length];
      return this.buildQuestion(vocab, targetFormat, lessonId, index + 1, topicWords, allLessonVocabs);
    });
  }

  /**
   * Xây dựng 1 câu hỏi cụ thể theo đúng format và phân cấp distractors
   */
  private buildQuestion(
    vocab: VocabularyDto,
    format: QuestionFormat,
    lessonId: number,
    index: number,
    topicWords: VocabularyDto[],
    allVocabs: VocabularyDto[]
  ): GeneratedQuestion {
    const questionId = lessonId * 100 + index;
    const cleanWord = vocab.word.trim();
    const cleanMeaning = vocab.meaningVi.trim();
    const wordType = (vocab.wordType || 'noun').toLowerCase().trim();

    // 1. Kiểm tra trường hợp CONTEXT_CLOZE
    let actualFormat = format;
    let clozePrompt = '';
    let clozeCorrectWord = cleanWord;

    if (format === 'CONTEXT_CLOZE') {
      if (vocab.exampleEn) {
        // Regex bắt từ gốc hoặc biến thể: word + (s|es|ed|ing)?
        const escaped = this.escapeRegex(cleanWord);
        const regex = new RegExp(`\\b${escaped}(s|es|ed|ing)?\\b`, 'i');
        const match = regex.exec(vocab.exampleEn);

        if (match) {
          clozeCorrectWord = match[0];
          clozePrompt = vocab.exampleEn.replace(regex, '______');
        } else {
          // Không khớp -> Tự động fallback sang EN_TO_VI
          actualFormat = 'EN_TO_VI';
        }
      } else {
        actualFormat = 'EN_TO_VI';
      }
    }

    // 2. Thiết lập mục tiêu đáp án (Target Field: 'word' hoặc 'meaningVi')
    let targetField: 'word' | 'meaningVi';
    let correctText: string;
    let prompt: string;

    switch (actualFormat) {
      case 'EN_TO_VI':
        targetField = 'meaningVi';
        correctText = cleanMeaning;
        prompt = `Từ "${cleanWord}" có nghĩa tiếng Việt là gì?`;
        break;

      case 'VI_TO_EN':
        targetField = 'word';
        correctText = cleanWord;
        prompt = `Chọn từ tiếng Anh có nghĩa là: "${cleanMeaning}"`;
        break;

      case 'CONTEXT_CLOZE':
        targetField = 'word';
        correctText = clozeCorrectWord;
        prompt = `Điền từ thích hợp vào chỗ trống:\n"${clozePrompt}"`;
        break;

      case 'LISTENING':
      default:
        targetField = 'word';
        correctText = cleanWord;
        prompt = `Nghe phát âm và chọn từ tiếng Anh chính xác:`;
        break;
    }

    // 3. Thuật toán chọn 3 distractors theo 3 tầng (Tier 1 -> Tier 2 -> Tier 3)
    const distractors = this.select3TierDistractors(
      vocab,
      targetField,
      correctText,
      topicWords,
      allVocabs
    );

    // 4. Trộn 4 đáp án bằng Fisher-Yates Shuffle
    const options = this.fisherYatesShuffle([correctText, ...distractors]);
    const correctIndex = options.indexOf(correctText);

    return {
      id: questionId,
      vocabId: vocab.id,
      lessonId,
      format: actualFormat,
      prompt,
      word: cleanWord,
      phonetic: vocab.phonetic || vocab.ipaUs || null,
      spriteKey: vocab.spriteKey || null,
      exampleEn: vocab.exampleEn || null,
      exampleVi: vocab.exampleVi || null,
      options,
      correctIndex,
      correctAnswer: correctText,
      isRetry: false
    };
  }

  /**
   * 3-Tier Smart Distractor Selection:
   * Tier 1: Cùng topicId VÀ cùng wordType.
   * Tier 2: Cùng topicId VÀ khác wordType (fallback nếu Tier 1 < 3).
   * Tier 3: Khác topicId VÀ cùng wordType (safety net nếu cả topic < 4 từ).
   */
  private select3TierDistractors(
    targetVocab: VocabularyDto,
    field: 'word' | 'meaningVi',
    correctValue: string,
    topicWords: VocabularyDto[],
    allVocabs: VocabularyDto[]
  ): string[] {
    const targetType = (targetVocab.wordType || 'noun').toLowerCase().trim();
    const cleanCorrect = correctValue.toLowerCase().trim();
    const chosen = new Set<string>();
    chosen.add(cleanCorrect);

    const result: string[] = [];

    const getVal = (v: VocabularyDto): string => {
      const raw = field === 'word' ? v.word : v.meaningVi;
      return (raw || '').trim();
    };

    // Tier 1: Cùng topicId VÀ cùng wordType
    for (const v of this.fisherYatesShuffle(topicWords)) {
      if (v.id === targetVocab.id) continue;
      const vType = (v.wordType || 'noun').toLowerCase().trim();
      const val = getVal(v);
      const valKey = val.toLowerCase();
      if (vType === targetType && val.length > 0 && !chosen.has(valKey)) {
        chosen.add(valKey);
        result.push(val);
        if (result.length === 3) return result;
      }
    }

    // Tier 2: Cùng topicId VÀ khác wordType
    for (const v of this.fisherYatesShuffle(topicWords)) {
      if (v.id === targetVocab.id) continue;
      const val = getVal(v);
      const valKey = val.toLowerCase();
      if (val.length > 0 && !chosen.has(valKey)) {
        chosen.add(valKey);
        result.push(val);
        if (result.length === 3) return result;
      }
    }

    // Tier 3: Khác topicId VÀ cùng wordType (Safety net)
    for (const v of this.fisherYatesShuffle(allVocabs)) {
      if (v.id === targetVocab.id) continue;
      const vType = (v.wordType || 'noun').toLowerCase().trim();
      const val = getVal(v);
      const valKey = val.toLowerCase();
      if (vType === targetType && val.length > 0 && !chosen.has(valKey)) {
        chosen.add(valKey);
        result.push(val);
        if (result.length === 3) return result;
      }
    }

    // Dự phòng cuối cùng nếu vẫn thiếu
    for (const v of this.fisherYatesShuffle(allVocabs)) {
      const val = getVal(v);
      const valKey = val.toLowerCase();
      if (val.length > 0 && !chosen.has(valKey)) {
        chosen.add(valKey);
        result.push(val);
        if (result.length === 3) return result;
      }
    }

    return result;
  }

  /**
   * Thuật toán xáo trộn Fisher-Yates
   */
  fisherYatesShuffle<T>(array: T[]): T[] {
    const list = [...array];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private getAllVocabulariesPool(): VocabularyDto[] {
    const pool: VocabularyDto[] = [];
    for (const key of Object.keys(DEFAULT_VOCABULARIES)) {
      const list = DEFAULT_VOCABULARIES[Number(key)] || [];
      pool.push(...list);
    }
    return pool;
  }
}
