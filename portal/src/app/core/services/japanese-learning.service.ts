import { Injectable, signal, computed, effect, inject } from '@angular/core';
import N5_SEED from '../../../assets/data/jlpt_n5_vocab_seed.json';
import { UserVocabReview } from '../models/game.models';
import { GameStateService } from './game-state.service';
import { LanguageContextService } from './language-context.service';
import { StrokeOrderService } from './stroke-order.service';
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
  questionFormat?: 'MCQ' | 'WRITING';
  targetChar?: string;
  reading?: string;
}

@Injectable({ providedIn: 'root' })
export class JapaneseLearningService {
  private readonly gameState = inject(GameStateService);
  private readonly langContext = inject(LanguageContextService);
  private readonly strokeService = inject(StrokeOrderService);

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
    const jaLevel = this.langContext.getLanguageLevel('ja');
    return minLevel <= jaLevel;
  }

  unlockTopic(topicCode: string) {
    this.topicProgress.update(p => ({
      ...p,
      [topicCode]: {
        ...(p[topicCode] ?? { bestStarsClaimed: 0 }),
        unlocked: true
      }
    }));
    if (this.langContext.activeLang() === 'ja') {
      this.gameState.topicStars.set(this.topicProgress());
      this.gameState.saveToStorage();
      this.langContext.saveWorkspaceImmediately('ja', this.gameState.serializeCurrentWorkspace());
    }
  }

  constructor() {
    // 1. Tự động đồng bộ từ LanguageContext khi chuyển đổi sang Workspace Tiếng Nhật
    effect(() => {
      const ws = this.langContext.currentWorkspace();
      if (ws.langCode === 'ja') {
        if (ws.wordStats && Object.keys(ws.wordStats).length > 0) {
          this.wordStats.set(ws.wordStats as any);
        }
        if (ws.topicStars && Object.keys(ws.topicStars).length > 0) {
          this.topicProgress.update(prev => {
            const merged = { ...prev };
            for (const [k, v] of Object.entries(ws.topicStars!)) {
              const prevItem = merged[k];
              const prevStars = prevItem?.bestStarsClaimed || 0;
              const nextStars = v?.bestStarsClaimed || 0;
              merged[k] = {
                unlocked: Boolean(prevItem?.unlocked || v?.unlocked),
                bestStarsClaimed: Math.max(prevStars, nextStars) as (0 | 1 | 2 | 3)
              };
            }
            return merged;
          });
        }
        if (ws.masteredKana && ws.masteredKana.length > 0) {
          this.masteredKana.set(ws.masteredKana);
        }
        if (ws.ebbinghausReviews) {
          const revs = Array.isArray(ws.ebbinghausReviews) ? ws.ebbinghausReviews : Object.values(ws.ebbinghausReviews);
          if (revs.length > 0) {
            this.ebbinghausReviews.set(revs);
          }
        }
      }
    });

    // 2. Lưu kép vào legacy keys để bảo đảm tương thích ngược
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

      // Đồng bộ trực tiếp vào GameStateService cho toàn app
      if (this.langContext.activeLang() === 'ja') {
        const idStr = String(vocabId);
        if (nowLearned) {
          this.gameState.learnedWords.update(list => list.includes(idStr) ? list : [...list, idStr]);
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
          this.gameState.userVocabReviews.update(m => ({ ...m, [vocabId]: newRev }));
        } else {
          this.gameState.learnedWords.update(list => list.filter(w => w !== idStr));
          this.gameState.userVocabReviews.update(m => {
            const next = { ...m };
            delete next[vocabId];
            return next;
          });
        }
        this.gameState.userWordStats.set(this.wordStats() as any);
        this.gameState.saveToStorage();
      this.langContext.saveWorkspaceImmediately('ja', this.gameState.serializeCurrentWorkspace());
      }
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

    if (this.langContext.activeLang() === 'ja') {
      const idStr = String(vocabId);
      if (nowBookmarked) {
        this.gameState.bookmarkedWords.update(l => l.includes(idStr) ? l : [...l, idStr]);
      } else {
        this.gameState.bookmarkedWords.update(l => l.filter(w => w !== idStr));
      }
      this.gameState.userWordStats.set(this.wordStats() as any);
      this.gameState.saveToStorage();
      this.langContext.saveWorkspaceImmediately('ja', this.gameState.serializeCurrentWorkspace());
    }

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

    if (this.langContext.activeLang() === 'ja') {
      this.gameState.userWordStats.set(this.wordStats() as any);
      this.gameState.saveToStorage();
      this.langContext.saveWorkspaceImmediately('ja', this.gameState.serializeCurrentWorkspace());
    }
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

    // Tính thưởng theo delta sao 15-Question Rebalance (1: 30 Xu / 15 XP; 2: 50 Xu / 30 XP; 3: 75 Xu / 45 XP)
    let coinsAwarded = 0;
    let xpAwarded = 0;

    const tierMap: Record<number, { xp: number; coins: number }> = {
      0: { xp: 0, coins: 0 },
      1: { xp: 15, coins: 30 },
      2: { xp: 30, coins: 50 },
      3: { xp: 45, coins: 75 }
    };

    if (stars > oldStars) {
      xpAwarded = tierMap[stars].xp - (tierMap[oldStars]?.xp || 0);
      coinsAwarded = tierMap[stars].coins - (tierMap[oldStars]?.coins || 0);
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

    if (this.langContext.activeLang() === 'ja') {
      this.gameState.topicStars.set(this.topicProgress());
      this.gameState.userLessonProgress.update(map => ({
        ...map,
        [topicCode]: {
          userId: 1,
          lessonId: Number(topicCode.replace(/\D/g, '')) || 1000,
          bestScorePercent: 100,
          bestStarsClaimed: Math.max(oldStars, stars)
        }
      }));
      this.gameState.saveToStorage();
      this.langContext.saveWorkspaceImmediately('ja', this.gameState.serializeCurrentWorkspace());
    }

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

    if (this.langContext.activeLang() === 'ja') {
      this.gameState.masteredKana.set(this.masteredKana());
      this.gameState.saveToStorage();
      this.langContext.saveWorkspaceImmediately('ja', this.gameState.serializeCurrentWorkspace());
    }

    return nowMastered;
  }

  /**
   * Rút trích danh sách ký tự đơn (Kanji hoặc Kana) khả dụng trong bộ dữ liệu n5_strokes.json
   */
  extractWritableCharsFromTopic(topic: JaTopicGroup): { char: string; word: JaVocabItem; reading: string; meaningVi: string }[] {
    const list: { char: string; word: JaVocabItem; reading: string; meaningVi: string }[] = [];
    const seenChars = new Set<string>();

    for (const word of topic.words) {
      // 1. Kiểm tra từng ký tự trong scriptPrimary (Kanji hoặc Kana)
      for (const ch of Array.from(word.scriptPrimary)) {
        if (!seenChars.has(ch) && this.strokeService.hasChar(ch)) {
          seenChars.add(ch);
          list.push({
            char: ch,
            word,
            reading: word.readingSub || word.romaji,
            meaningVi: word.meaningVi
          });
        }
      }
      // 2. Kiểm tra Kana trong readingSub
      for (const ch of Array.from(word.readingSub || '')) {
        if (!seenChars.has(ch) && this.strokeService.hasChar(ch)) {
          seenChars.add(ch);
          list.push({
            char: ch,
            word,
            reading: ch,
            meaningVi: `${word.meaningVi} (trong từ "${word.scriptPrimary}")`
          });
        }
      }
    }

    // Nếu chủ đề có ít hơn 5 ký tự hợp lệ, bổ sung thêm Kana từ catalog để luôn đảm bảo luật 5-10 câu viết
    if (list.length < 5) {
      for (const [kIdx, k] of this.kanaCatalog().entries()) {
        const ch = k.hiragana;
        if (!seenChars.has(ch) && this.strokeService.hasChar(ch)) {
          seenChars.add(ch);
          list.push({
            char: ch,
            word: {
              id: 9000 + kIdx,
              topicId: topic.code,
              lang: 'ja',
              scriptPrimary: ch,
              readingSub: k.romaji,
              romaji: k.romaji,
              meaningVi: `Chữ Kana âm "${k.romaji}"`,
              wordType: 'noun'
            },
            reading: k.romaji,
            meaningVi: `Chữ Kana âm "${k.romaji}"`
          });
          if (list.length >= 10) break;
        }
      }
    }

    return list;
  }

  // Sinh đề Quiz 15 câu tự động cho chủ đề N5: 5-10 câu Luyện viết + MCQ kết hợp (Tổng 15 câu)
  generateN5QuizSession(topicCode: string, sessionSize = 15): JaQuizQuestion[] {
    const topic = this.topics().find(t => t.code === topicCode) ?? this.topics()[0];
    const stats = this.wordStats();

    // 1. Trích xuất danh sách ký tự tập viết hợp lệ (5..10 câu)
    const eligibleWriteChars = this.extractWritableCharsFromTopic(topic);
    
    // Ưu tiên ký tự chưa thuộc hoặc hay viết sai
    eligibleWriteChars.sort((a, b) => {
      const aMastered = this.strokeService.isMastered(a.char) ? 1 : 0;
      const bMastered = this.strokeService.isMastered(b.char) ? 1 : 0;
      return aMastered - bMastered;
    });

    const unmasteredCount = eligibleWriteChars.filter(c => !this.strokeService.isMastered(c.char)).length;
    const writingTarget = unmasteredCount >= 8 ? Math.min(10, eligibleWriteChars.length) : 6;
    const writingCount = eligibleWriteChars.length === 0
      ? 0
      : Math.min(10, Math.max(5, Math.min(writingTarget, eligibleWriteChars.length)));
    const mcqCount = Math.max(1, sessionSize - writingCount);

    // 2. Tạo các câu hỏi Luyện viết (WRITING_PROMPT)
    const pickedWriteChars = eligibleWriteChars.slice(0, writingCount);
    const writingQuestions: JaQuizQuestion[] = pickedWriteChars.map((item, idx) => ({
      vocabId: 50000 + item.word.id * 10 + idx,
      prompt: `Viết lại chữ có nghĩa "${item.meaningVi}" (Âm đọc: ${item.reading})`,
      audioText: item.char,
      options: [],
      correctIndex: 0,
      explanationVi: `Chữ [${item.char}] (đọc là "${item.reading}") nghĩa là: ${item.meaningVi}.`,
      scriptPrimary: item.char,
      readingSub: item.reading,
      meaningVi: item.meaningVi,
      wordType: item.word.wordType,
      questionFormat: 'WRITING',
      targetChar: item.char,
      reading: item.reading
    }));

    // 3. Smart Pool Sampling cho phần trắc nghiệm MCQ
    const sampledWords: JaVocabItem[] = [];
    const pool = [...topic.words].sort((a, b) => {
      const sa = stats[a.id];
      const sb = stats[b.id];
      const wa = (sa?.wrongCount ?? 0) * 50 + (!sa?.learned ? 25 : 0) + Math.random() * 15;
      const wb = (sb?.wrongCount ?? 0) * 50 + (!sb?.learned ? 25 : 0) + Math.random() * 15;
      return wb - wa;
    });

    for (let i = 0; i < mcqCount; i++) {
      sampledWords.push(pool[i % pool.length]);
    }

    // 4. Sinh các câu hỏi trắc nghiệm MCQ (Reading & Meaning)
    const mcqQuestions: JaQuizQuestion[] = sampledWords.map((target, idx) => {
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
          wordType: target.wordType,
          questionFormat: 'MCQ'
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
          wordType: target.wordType,
          questionFormat: 'MCQ'
        };
      }
    });

    // 5. Hòa trộn đan xen MCQ và Writing câu hỏi (Interleaved Mix) để tạo trải nghiệm thú vị
    const mixedSession: JaQuizQuestion[] = [];
    let wPtr = 0;
    let mPtr = 0;
    while (wPtr < writingQuestions.length || mPtr < mcqQuestions.length) {
      if (mPtr < mcqQuestions.length) mixedSession.push(mcqQuestions[mPtr++]);
      if (wPtr < writingQuestions.length) mixedSession.push(writingQuestions[wPtr++]);
    }

    return mixedSession.slice(0, sessionSize);
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
