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

export interface UserRewardState {
  pityFertilizerMisses: number; // default 0, bảo hiểm tại 20
  pitySeedMisses: number;       // default 0, bảo hiểm tại 26
  dailyBonusRollsUsed: number;  // default 0, giới hạn tối đa 10 lượt/ngày
  lastBonusRollDate: string;    // YYYY-MM-DD cho reset hàng ngày
}

export interface UserProgression {
  level: number;                 // starts at 1
  currentXp: number;             // 0..1000, resets to 0 on level up
  coins: number;
  pityFertilizerMisses: number;
  pitySeedMisses: number;
  dailyBonusRollsUsed: number;
  lastBonusRollDate: string;     // YYYY-MM-DD
}

export interface UnlockRequirement {
  minLevel: number;
  requiredCrops: { cropId: string; qty: number; cropNameVi?: string }[];
}

export function xpRequiredForLevel(level: number): number {
  return Math.min(1000, 50 + (level - 1) * 50);
}

export function applyXpWithReset(level: number, currentXp: number, xpGained: number) {
  const MAX_XP = 1000;
  let nextLevel = level;
  let nextXp = Math.min(MAX_XP, currentXp + xpGained);
  let leveledUp = false;

  const threshold = xpRequiredForLevel(nextLevel);
  if (nextXp >= threshold) {
    nextLevel += 1;
    nextXp = 0; // Reset XP to 0 upon leveling up
    leveledUp = true;
  }

  return { level: nextLevel, currentXp: nextXp, xpRequired: xpRequiredForLevel(nextLevel), leveledUp };
}

export function canUnlockTarget(
  userLevel: number,
  harvested: Record<string, number>,
  req: UnlockRequirement
): boolean {
  if (userLevel < req.minLevel) return false;
  return req.requiredCrops.every(c => (harvested[c.cropId] ?? 0) >= c.qty);
}

export interface BalancedQuizRewardResult {
  newStars: number;
  updatedBestStars: number;
  xpGained: number;
  coinsGained: number;
  fertilizerGained: number;
  seedGainedId: string | null;
  isEligibleForBonus: boolean;
  isMaxStarsAlready: boolean;
  updatedRewardState: UserRewardState;
}

export function calculateBalancedQuizReward(
  firstTryCorrect: number,
  totalQuestions: number,
  bestStarsClaimed: number,
  unlockedSeedIds: string[],
  rewardState: UserRewardState,
  todayStr: string
): BalancedQuizRewardResult {
  // Reset giới hạn quay thưởng theo ngày
  let dailyRolls = rewardState.lastBonusRollDate === todayStr ? rewardState.dailyBonusRollsUsed : 0;
  let pityFert = rewardState.pityFertilizerMisses || 0;
  let pitySeed = rewardState.pitySeedMisses || 0;

  const ratio = totalQuestions > 0 ? firstTryCorrect / totalQuestions : 0;
  const newStars = ratio === 1 ? 3 : ratio >= 0.8 ? 2 : 1;

  // Rule 2: 3-Star Delta Rewards (10 - 20 - 30 XP Scale, 20 - 35 - 50 Coins)
  const tierMap: Record<number, { xp: number; coins: number }> = {
    0: { xp: 0, coins: 0 },
    1: { xp: 10, coins: 20 },
    2: { xp: 20, coins: 35 },
    3: { xp: 30, coins: 50 }
  };

  let xpGained = 0;
  let coinsGained = 0;
  let updatedBestStars = bestStarsClaimed;
  const isMaxStarsAlready = newStars <= bestStarsClaimed;

  // Rule 2: Deterministic Base Rewards (3-Star Delta System)
  if (newStars > bestStarsClaimed) {
    xpGained = tierMap[newStars].xp - (tierMap[bestStarsClaimed]?.xp || 0);
    coinsGained = tierMap[newStars].coins - (tierMap[bestStarsClaimed]?.coins || 0);
    updatedBestStars = newStars;
  }

  let fertilizerGained = 0;
  let seedGainedId: string | null = null;
  const isEligibleForBonus = newStars >= 2 && dailyRolls < 10;

  // Rule 3: Probabilistic Farm Drops (5% Phân bón & 1% mỗi loại Hạt giống có sẵn)
  if (isEligibleForBonus) {
    dailyRolls += 1;

    // 5% Fertilizer (3% ở 2-Star) + Bảo hiểm tại 20 lần trượt
    const fertProb = newStars === 3 ? 0.05 : 0.03;
    if (pityFert >= 19 || Math.random() < fertProb) {
      fertilizerGained = 1;
      pityFert = 0;
    } else {
      pityFert += 1;
    }

    // 1% mỗi loại hạt giống đang mở + Session Cap = 1 + Bảo hiểm tại 26 lần trượt
    if (unlockedSeedIds.length > 0) {
      const hits = unlockedSeedIds.filter(() => Math.random() < 0.01);
      if (hits.length > 0) {
        seedGainedId = hits[Math.floor(Math.random() * hits.length)];
        pitySeed = 0;
      } else if (pitySeed >= 25) {
        seedGainedId = unlockedSeedIds[Math.floor(Math.random() * unlockedSeedIds.length)];
        pitySeed = 0;
      } else {
        pitySeed += 1;
      }
    }
  }

  return {
    newStars,
    updatedBestStars,
    xpGained,
    coinsGained,
    fertilizerGained,
    seedGainedId,
    isEligibleForBonus,
    isMaxStarsAlready,
    updatedRewardState: {
      pityFertilizerMisses: pityFert,
      pitySeedMisses: pitySeed,
      dailyBonusRollsUsed: dailyRolls,
      lastBonusRollDate: todayStr
    }
  };
}

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
    let words = topicWords && topicWords.length > 0 ? topicWords : (DEFAULT_VOCABULARIES[lessonId] || DEFAULT_VOCABULARIES[1] || []);
    const selectedVocabs = this.sampleQuizWords(words, userStats);
    const typeCycle: QuestionFormat[] = ['EN_TO_VI', 'CONTEXT_CLOZE', 'LISTENING', 'VI_TO_EN'];

    // Lấy pool từ vựng của tất cả bài học để làm Tier 3 distractors
    const allLessonVocabs = this.getAllVocabulariesPool();

    return selectedVocabs.map((vocab, index) => {
      const targetFormat = typeCycle[index % typeCycle.length];
      return this.buildQuestion(vocab, targetFormat, lessonId, index + 1, words, allLessonVocabs);
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
