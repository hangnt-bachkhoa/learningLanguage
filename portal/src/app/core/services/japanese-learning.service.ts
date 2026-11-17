import { Injectable, signal, computed, effect, inject } from '@angular/core';
import N5_SEED from '../../../assets/data/jlpt_n5_vocab_seed.json';
import { UserVocabReview } from '../models/game.models';
import { GameStateService } from './game-state.service';
import { KANA_CATALOG, KanaItem } from '../constants/kana-catalog.constant';

export type JaWordType = 'noun' | 'verb' | 'adj_i' | 'adj_na' | 'adv_expr';

export interface JaVocabItem {
  id: number;
  topicId: string;
  lang: 'ja';
  scriptPrimary: string;
  readingSub: string;
  romaji: string;
  meaningVi: string;
  wordType: JaWordType;
}

export interface JaTopicGroup {
  code: string;
  orderIndex: number;
  level: 'JLPT N5';
  wordTypeGroup: JaWordType;
  titleVi: string;
  wordCount: number;
  minLevel: number;
  words: JaVocabItem[];
}

export interface JaWordUserStat {
  learned: boolean;
  bookmarked: boolean;
  wrongCount: number;
  lastSeenAt?: string;
  note?: string;
}

export interface JaTopicProgress {
  unlocked: boolean;
  bestStarsClaimed: 0 | 1 | 2 | 3;
}

export interface JaQuizQuestion {
  vocabId: number;
  prompt: string;
  audioText: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
  scriptPrimary?: string;
  readingSub?: string;
  meaningVi?: string;
  wordType?: JaWordType;
}

@Injectable({ providedIn: 'root' })
export class JapaneseLearningService {
  private readonly gameState = inject(GameStateService);

  private readonly WORD_STAT_KEY = 'language_farm_vocab_progress_ja_v1';
  private readonly TOPIC_STAR_KEY = 'language_farm_topic_stars_ja_v1';
  private readonly KANA_KEY = 'language_farm_kana_mastery_ja_v1';
  private readonly EBBINGHAUS_KEY = 'language_farm_ebbinghaus_ja_v1';

  readonly topics = signal<JaTopicGroup[]>(N5_SEED.topics as JaTopicGroup[]);
  readonly kanaCatalog = signal<KanaItem[]>(KANA_CATALOG);

  readonly wordStats = signal<Record<number, JaWordUserStat>>(this.loadJson(this.WORD_STAT_KEY, {}));

  readonly topicProgress = signal<Record<string, JaTopicProgress>>(
    this.loadJson(this.TOPIC_STAR_KEY, {
      ja_n5_01: { unlocked: true, bestStarsClaimed: 0 },
      ja_n5_02: { unlocked: true, bestStarsClaimed: 0 }
    })
  );

  readonly masteredKana = signal<string[]>(this.loadJson(this.KANA_KEY, []));
  readonly ebbinghausReviews = signal<UserVocabReview[]>(this.loadJson(this.EBBINGHAUS_KEY, []));

  // Toggles trên màn hình Flashcard 3 tầng
  readonly showFurigana = signal<boolean>(true);
  readonly showRomaji = signal<boolean>(true);

  // Active topic đang xem
  readonly activeTopicCode = signal<string>('ja_n5_01');

  readonly activeTopic = computed(() => {
    const code = this.activeTopicCode();
    return this.topics().find(t => t.code === code) ?? this.topics()[0];
  });

  readonly totalLearnedCount = computed(() =>
    Object.values(this.wordStats()).filter(s => s.learned).length
  );

  readonly totalStarsClaimed = computed(() => {
    return Object.values(this.topicProgress()).reduce((sum, p) => sum + (p.bestStarsClaimed || 0), 0);
  });

  readonly kanaLearnedCount = computed(() => this.masteredKana().length);

  isTopicUnlocked(topicCode: string, minLevel = 1): boolean {
    const prog = this.topicProgress()[topicCode];
    if (prog?.unlocked) return true;
    return minLevel <= this.gameState.level();
  }

  unlockTopic(topicCode: string) {
    this.topicProgress.update(p => ({
      ...p,
      [topicCode]: {
        ...(p[topicCode] ?? { bestStarsClaimed: 0 }),
        unlocked: true
      }
    }));
  }

  constructor() {
    effect(() => this.saveJson(this.WORD_STAT_KEY, this.wordStats()));
    effect(() => this.saveJson(this.TOPIC_STAR_KEY, this.topicProgress()));
    effect(() => this.saveJson(this.KANA_KEY, this.masteredKana()));
    effect(() => this.saveJson(this.EBBINGHAUS_KEY, this.ebbinghausReviews()));
  }

  // Đánh dấu Đã học / Chưa học
  toggleWordLearned(vocabId: number): boolean {
    let nowLearned = false;
    this.wordStats.update(map => {
      const prev = map[vocabId] ?? { learned: false, bookmarked: false, wrongCount: 0 };
      nowLearned = !prev.learned;
      return {
        ...map,
        [vocabId]: { ...prev, learned: nowLearned, lastSeenAt: new Date().toISOString() }
      };
    });

    // Cập nhật lịch ôn tập Ebbinghaus Tiếng Nhật
    const item = this.findWordById(vocabId);
    if (item) {
      const todayStr = this.getTodayIso();
      const nextDayStr = this.getDateOffsetIso(1);

      this.ebbinghausReviews.update(list => {
        if (nowLearned) {
          const exists = list.some(r => r.vocabId === vocabId);
          if (!exists) {
            const newRev: UserVocabReview = {
              vocabId,
              word: item.scriptPrimary,
              topicId: item.topicId,
              learnedDate: todayStr,
              stage: 0,
              nextReviewDate: nextDayStr,
              lastReviewedDate: todayStr,
              d1Done: false,
              d3Done: false,
              d7Done: false,
              d14Done: false
            };
            return [newRev, ...list];
          }
          return list;
        } else {
          return list.filter(r => r.vocabId !== vocabId);
        }
      });
    }

    return nowLearned;
  }

  // Đánh dấu / Bỏ đánh dấu sao ghi nhớ
  toggleBookmark(vocabId: number): boolean {
    let nowBookmarked = false;
    this.wordStats.update(map => {
      const prev = map[vocabId] ?? { learned: false, bookmarked: false, wrongCount: 0 };
      nowBookmarked = !prev.bookmarked;
      return {
        ...map,
        [vocabId]: { ...prev, bookmarked: nowBookmarked, lastSeenAt: new Date().toISOString() }
      };
    });
    return nowBookmarked;
  }

  // Ghi nhận trả lời câu hỏi Quiz
  recordQuizAttempt(vocabId: number, isFirstTryCorrect: boolean) {
    this.wordStats.update(map => {
      const prev = map[vocabId] ?? { learned: false, bookmarked: false, wrongCount: 0 };
      return {
        ...map,
        [vocabId]: {
          ...prev,
          wrongCount: isFirstTryCorrect ? Math.max(0, prev.wrongCount - 1) : prev.wrongCount + 1,
          lastSeenAt: new Date().toISOString()
        }
      };
    });
  }

  // Hoàn tất bài thi Quiz chủ đề Tiếng Nhật -> Lưu sao & cộng thưởng nông trại chung
  completeTopicQuiz(topicCode: string, stars: 1 | 2 | 3): {
    coinsAwarded: number;
    xpAwarded: number;
    isNewRecord: boolean;
    unlockedNext: boolean;
  } {
    const curProgress = this.topicProgress()[topicCode] ?? { unlocked: true, bestStarsClaimed: 0 };
    const oldStars = curProgress.bestStarsClaimed || 0;
    const isNewRecord = stars > oldStars;

    // Tính thưởng theo delta sao (1: 20 Xu / 10 XP; 2: 35 Xu / 20 XP; 3: 50 Xu / 30 XP)
    let coinsAwarded = 0;
    let xpAwarded = 0;

    if (stars === 3) {
      coinsAwarded = oldStars === 2 ? 15 : oldStars === 1 ? 30 : 50;
      xpAwarded = oldStars === 2 ? 10 : oldStars === 1 ? 20 : 30;
    } else if (stars === 2) {
      coinsAwarded = oldStars === 1 ? 15 : 35;
      xpAwarded = oldStars === 1 ? 10 : 20;
    } else {
      coinsAwarded = oldStars === 0 ? 20 : 0;
      xpAwarded = oldStars === 0 ? 10 : 0;
    }

    if (coinsAwarded > 0) this.gameState.addCoins(coinsAwarded);
    if (xpAwarded > 0) this.gameState.addXp(xpAwarded);

    // Mở khóa chủ đề kế tiếp nếu đạt >= 1 sao
    let unlockedNext = false;
    const topics = this.topics();
    const curIdx = topics.findIndex(t => t.code === topicCode);
    if (curIdx >= 0 && curIdx < topics.length - 1 && stars >= 1) {
      const nextTopic = topics[curIdx + 1];
      this.topicProgress.update(p => ({
        ...p,
        [nextTopic.code]: {
          ...(p[nextTopic.code] ?? { bestStarsClaimed: 0 }),
          unlocked: true
        }
      }));
      unlockedNext = true;
    }

    // Cập nhật kỷ lục sao
    this.topicProgress.update(p => ({
      ...p,
      [topicCode]: {
        unlocked: true,
        bestStarsClaimed: Math.max(oldStars, stars) as 0 | 1 | 2 | 3
      }
    }));

    return { coinsAwarded, xpAwarded, isNewRecord, unlockedNext };
  }

  // Đánh dấu thuộc chữ cái Kana
  toggleKanaMastered(kanaId: string): boolean {
    let nowMastered = false;
    this.masteredKana.update(list => {
      if (list.includes(kanaId)) {
        nowMastered = false;
        return list.filter(k => k !== kanaId);
      } else {
        nowMastered = true;
        return [...list, kanaId];
      }
    });
    return nowMastered;
  }

  // Sinh đề Quiz 10 câu tự động cho chủ đề N5 (Smart Pool Sampling)
  generateN5QuizSession(topicCode: string, sessionSize = 10): JaQuizQuestion[] {
    const topic = this.topics().find(t => t.code === topicCode) ?? this.topics()[0];
    const stats = this.wordStats();

    // 1. Smart Pool Sampling ưu tiên từ hay sai + từ chưa học
    const sampled = [...topic.words]
      .sort((a, b) => {
        const sa = stats[a.id];
        const sb = stats[b.id];
        const wa = (sa?.wrongCount ?? 0) * 50 + (!sa?.learned ? 25 : 0) + Math.random() * 15;
        const wb = (sb?.wrongCount ?? 0) * 50 + (!sb?.learned ? 25 : 0) + Math.random() * 15;
        return wb - wa;
      })
      .slice(0, Math.min(sessionSize, topic.words.length));

    // 2. Sinh câu hỏi kết hợp: Hỏi cách đọc Hiragana và Hỏi nghĩa tiếng Việt
    return sampled.map((target, idx) => {
      const hasKanji = target.readingSub.length > 0;
      const askReading = hasKanji && idx % 2 === 1;

      if (askReading) {
        const distractors = this.pickDistractors(target, topic.words, 'readingSub', 3);
        const options = this.shuffle([target.readingSub, ...distractors]);
        return {
          vocabId: target.id,
          prompt: `Cách đọc Hiragana của chữ "${target.scriptPrimary}" (${target.meaningVi}) là gì?`,
          audioText: target.readingSub,
          options,
          correctIndex: options.indexOf(target.readingSub),
          explanationVi: `${target.scriptPrimary} đọc là "${target.readingSub}" [${target.romaji}] — nghĩa: ${target.meaningVi}.`,
          scriptPrimary: target.scriptPrimary,
          readingSub: target.readingSub,
          meaningVi: target.meaningVi,
          wordType: target.wordType
        };
      } else {
        const distractors = this.pickDistractors(target, topic.words, 'meaningVi', 3);
        const options = this.shuffle([target.meaningVi, ...distractors]);
        const sub = target.readingSub ? ` (${target.readingSub})` : '';
        return {
          vocabId: target.id,
          prompt: `Nghĩa tiếng Việt của từ "${target.scriptPrimary}"${sub} là gì?`,
          audioText: target.readingSub || target.scriptPrimary,
          options,
          correctIndex: options.indexOf(target.meaningVi),
          explanationVi: `${target.scriptPrimary}${sub} [${target.romaji}]: ${target.meaningVi}.`,
          scriptPrimary: target.scriptPrimary,
          readingSub: target.readingSub,
          meaningVi: target.meaningVi,
          wordType: target.wordType
        };
      }
    });
  }

  // Sinh đề Quiz luyện tập Bảng chữ cái Kana (10 câu)
  generateKanaQuizSession(mode: 'hiragana' | 'katakana' | 'mixed' = 'mixed', count = 10): JaQuizQuestion[] {
    const list = this.shuffle([...this.kanaCatalog()]).slice(0, count);

    return list.map((item, idx) => {
      const isHiragana = mode === 'hiragana' ? true : mode === 'katakana' ? false : idx % 2 === 0;
      const kanaChar = isHiragana ? item.hiragana : item.katakana;
      const label = isHiragana ? 'Hiragana' : 'Katakana';

      // 50% hỏi Romaji -> chọn Kana, 50% hỏi Kana -> chọn Romaji
      const askRomaji = idx % 2 === 1;
      if (askRomaji) {
        const otherRomajis = this.shuffle(this.kanaCatalog().filter(k => k.id !== item.id)).slice(0, 3).map(k => k.romaji);
        const options = this.shuffle([item.romaji, ...otherRomajis]);
        return {
          vocabId: 9000 + idx,
          prompt: `Chữ ${label} "${kanaChar}" được phát âm là gì?`,
          audioText: kanaChar,
          options,
          correctIndex: options.indexOf(item.romaji),
          explanationVi: `Chữ ${label} "${kanaChar}" phát âm là "${item.romaji}".`
        };
      } else {
        const otherKanas = this.shuffle(this.kanaCatalog().filter(k => k.id !== item.id)).slice(0, 3).map(k => isHiragana ? k.hiragana : k.katakana);
        const options = this.shuffle([kanaChar, ...otherKanas]);
        return {
          vocabId: 9000 + idx,
          prompt: `Chữ ${label} nào tương ứng với âm "${item.romaji}"?`,
          audioText: kanaChar,
          options,
          correctIndex: options.indexOf(kanaChar),
          explanationVi: `Âm "${item.romaji}" viết bằng ${label} là "${kanaChar}".`
        };
      }
    });
  }

  findWordById(id: number): JaVocabItem | undefined {
    for (const t of this.topics()) {
      const found = t.words.find(w => w.id === id);
      if (found) return found;
    }
    return undefined;
  }

  private pickDistractors(target: JaVocabItem, pool: JaVocabItem[], field: 'readingSub' | 'meaningVi', count: number): string[] {
    const targetVal = (target[field] || '').trim();
    const candidates = this.shuffle(pool.filter(w => w.id !== target.id && (w[field] || '').trim() !== '' && w[field] !== targetVal));
    const picked: string[] = [];
    for (const c of candidates) {
      if (!picked.includes(c[field])) {
        picked.push(c[field]);
        if (picked.length === count) break;
      }
    }
    // Nếu thiếu, lấy từ các chủ đề khác
    if (picked.length < count) {
      for (const t of this.topics()) {
        for (const w of t.words) {
          if (w[field] && w[field] !== targetVal && !picked.includes(w[field])) {
            picked.push(w[field]);
            if (picked.length === count) break;
          }
        }
        if (picked.length === count) break;
      }
    }
    return picked;
  }

  private shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  private getTodayIso(): string {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  private getDateOffsetIso(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }

  private loadJson<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  private saveJson(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
}
