import { Injectable, signal, computed } from '@angular/core';
import { FarmPlot, UserInventory, PlannerBook, UserVocabReview } from '../models/game.models';
import { UserWordStat, UserLessonProgress, UserRewardState } from './quiz-engine.service';

export type LangCode = 'en' | 'ja' | string;

export interface LanguageWorkspaceState {
  langCode: LangCode;
  level: number;                 // Bắt đầu từ Lv.1 cho mỗi ngôn ngữ mới
  currentXp: number;             // 0..1000, reset về 0 khi lên Level của ngôn ngữ đó
  coins: number;                 // Khởi tạo 100 Xu cho mỗi khu vườn mới
  plots: FarmPlot[];             // 9 ô đất riêng (4 ô mở sẵn)
  inventory: UserInventory;      // Hạt giống, Nước, Phân bón, Nông sản riêng
  books?: PlannerBook[];
  activeLessonId?: number;
  learnedWords?: string[];
  bookmarkedWords?: string[];
  lessonProgress: Record<string, UserLessonProgress>;
  wordStats: Record<number, UserWordStat>;
  rewardState: UserRewardState;  // Pity
  ebbinghausReviews: Record<number, UserVocabReview> | UserVocabReview[];
  dailyReviewRewardsClaimed?: number;
  lastReviewRewardDate?: string;
  // Japanese-specific state
  masteredKana?: string[];
  topicStars?: Record<string, { unlocked: boolean; bestStarsClaimed: 0 | 1 | 2 | 3 }>;
}

export interface GlobalProfileState {
  activeLang: LangCode;
  globalStreak: number;
  lastStudyDate?: string;
  totalCropsHarvestedAllTime: number;
  achievements: {
    multilingualNovice?: boolean; // Mở khóa khi đạt Level 5 ở cả Tiếng Anh và Tiếng Nhật
    masterHarvester?: boolean;   // Thu hoạch 500+ nông sản trên toàn bộ các khu vườn
    welcomeJaGiftClaimed?: boolean; // Nhận quà chào mừng vườn Nhật khi EN đạt Lv.5
  };
}

export function createDefaultPlots(): FarmPlot[] {
  return [
    { id: 1, index: 0, status: 'empty', isWatered: false, growthProgress: 0 },
    { id: 2, index: 1, status: 'empty', isWatered: false, growthProgress: 0 },
    { id: 3, index: 2, status: 'empty', isWatered: false, growthProgress: 0 },
    { id: 4, index: 3, status: 'empty', isWatered: false, growthProgress: 0 },
    { id: 5, index: 4, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 6, index: 5, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 7, index: 6, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 8, index: 7, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 9, index: 8, status: 'locked', isWatered: false, growthProgress: 0 }
  ];
}

export function createDefaultInventory(): UserInventory {
  return {
    seeds: { carrot: 5, cucumber: 3 },
    harvested: {},
    care: {
      water: 5,
      fertilizer: 3,
      speedFertilizer: 1
    },
    decor: {}
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageContextService {
  private readonly WORKSPACE_PREFIX = 'language_farm_workspace_';
  private readonly WORKSPACE_VERSION = '_v1';
  private readonly GLOBAL_PROFILE_KEY = 'language_farm_global_profile_v1';

  private saveTimer: any = null;
  private pendingWorkspaceToSave: { lang: LangCode; ws: LanguageWorkspaceState } | null = null;

  // 1. Trạng thái Toàn cục (Global Profile dùng chung)
  readonly globalProfile = signal<GlobalProfileState>(this.loadGlobalProfile());

  // Ngôn ngữ đang chọn
  readonly activeLang = signal<LangCode>(this.globalProfile().activeLang);

  // 2. Toàn bộ Workspace của ngôn ngữ đang kích hoạt
  readonly currentWorkspace = signal<LanguageWorkspaceState>(this.loadWorkspace(this.activeLang()));

  // Computed state tiện lợi cho UI
  readonly currentLevel = computed(() => this.currentWorkspace().level);
  readonly currentCoins = computed(() => this.currentWorkspace().coins);
  readonly currentPlots = computed(() => this.currentWorkspace().plots);
  readonly currentInventory = computed(() => this.currentWorkspace().inventory);
  readonly globalStreak = computed(() => this.globalProfile().globalStreak);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flushNow();
      });
    }
  }

  /**
   * Lấy cấp độ của ngôn ngữ bất kỳ (dùng cho Topbar badge)
   */
  getLanguageLevel(lang: LangCode): number {
    if (lang === this.activeLang()) {
      return this.currentWorkspace().level;
    }
    const ws = this.loadWorkspace(lang);
    return ws.level || 1;
  }

  /**
   * Chuyển đổi ngôn ngữ với bảo toàn tiến trình riêng biệt
   */
  switchLanguage(targetLang: LangCode, currentSavingWorkspace?: LanguageWorkspaceState): {
    workspace: LanguageWorkspaceState;
    welcomeGiftGranted: boolean;
  } {
    if (targetLang === this.activeLang()) {
      return { workspace: this.currentWorkspace(), welcomeGiftGranted: false };
    }

    const oldLang = this.activeLang();
    const wsToSave = currentSavingWorkspace || this.currentWorkspace();

    // 1. Lưu ngay trạng thái hiện tại của ngôn ngữ cũ
    this.saveWorkspaceImmediately(oldLang, wsToSave);

    // 2. Chuyển activeLang và nạp workspace mới
    this.activeLang.set(targetLang);
    let nextWorkspace = this.loadWorkspace(targetLang);

    // 3. Kiểm tra Quà chào mừng ngôn ngữ mới (Synergy Gamification)
    let welcomeGiftGranted = false;
    const profile = this.globalProfile();
    if (
      targetLang === 'ja' &&
      !profile.achievements.welcomeJaGiftClaimed
    ) {
      // Nếu Tiếng Anh đã đạt Lv.5 trở lên, tặng quà động viên cho vườn Nhật
      const enLevel = this.getLanguageLevel('en');
      if (enLevel >= 5) {
        welcomeGiftGranted = true;
        nextWorkspace = {
          ...nextWorkspace,
          coins: nextWorkspace.coins + 50,
          inventory: {
            ...nextWorkspace.inventory,
            care: {
              ...nextWorkspace.inventory.care,
              speedFertilizer: (nextWorkspace.inventory.care.speedFertilizer || 0) + 2
            }
          }
        };
        this.updateGlobalProfile(p => ({
          ...p,
          achievements: { ...p.achievements, welcomeJaGiftClaimed: true }
        }));
      }
    }

    this.currentWorkspace.set(nextWorkspace);

    // 4. Cập nhật activeLang vào Global Profile
    this.updateGlobalProfile(p => ({
      ...p,
      activeLang: targetLang
    }));

    return { workspace: nextWorkspace, welcomeGiftGranted };
  }

  /**
   * Cập nhật Workspace hiện tại và kích hoạt Debounced Save
   */
  updateCurrentWorkspace(updater: (prev: LanguageWorkspaceState) => LanguageWorkspaceState) {
    const updated = updater(this.currentWorkspace());
    this.currentWorkspace.set(updated);
    this.debouncedSaveWorkspace(this.activeLang(), updated);
    this.checkGlobalAchievements(updated);
  }

  /**
   * Ghi nhận 1 vụ thu hoạch nông sản vào thống kê Toàn cục
   */
  recordHarvest() {
    this.updateGlobalProfile(p => {
      const total = (p.totalCropsHarvestedAllTime || 0) + 1;
      const isMaster = total >= 500;
      return {
        ...p,
        totalCropsHarvestedAllTime: total,
        achievements: {
          ...p.achievements,
          masterHarvester: isMaster || p.achievements.masterHarvester
        }
      };
    });
  }

  /**
   * Cập nhật Streak toàn cục (Global Streak)
   */
  recordDailyStudy() {
    const today = new Date().toISOString().slice(0, 10);
    this.updateGlobalProfile(p => {
      if (p.lastStudyDate === today) return p;

      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let newStreak = p.globalStreak;
      if (p.lastStudyDate === yesterday) {
        newStreak += 1;
      } else if (p.lastStudyDate !== today) {
        newStreak = 1;
      }

      return {
        ...p,
        globalStreak: newStreak,
        lastStudyDate: today
      };
    });
  }

  /**
   * Kiểm tra điều kiện mở khóa các Huy hiệu Toàn cục (Synergy Badges)
   */
  private checkGlobalAchievements(currentWs: LanguageWorkspaceState) {
    const enLv = currentWs.langCode === 'en' ? currentWs.level : this.getLanguageLevel('en');
    const jaLv = currentWs.langCode === 'ja' ? currentWs.level : this.getLanguageLevel('ja');

    if (enLv >= 5 && jaLv >= 5) {
      if (!this.globalProfile().achievements.multilingualNovice) {
        this.updateGlobalProfile(p => ({
          ...p,
          achievements: { ...p.achievements, multilingualNovice: true }
        }));
      }
    }
  }

  /**
   * Nạp Workspace từ LocalStorage với Migration tương thích ngược
   */
  loadWorkspace(lang: LangCode): LanguageWorkspaceState {
    if (typeof localStorage === 'undefined') {
      return this.createDefaultWorkspace(lang);
    }

    const key = `${this.WORKSPACE_PREFIX}${lang}${this.WORKSPACE_VERSION}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          const ws: LanguageWorkspaceState = {
            ...this.createDefaultWorkspace(lang),
            ...parsed,
            langCode: lang
          };

          // Hỗ trợ khôi phục tiến độ legacy Tiếng Nhật nếu trước đó lưu ở key riêng
          if (lang === 'ja') {
            this.mergeLegacyJapaneseIfMissing(ws);
          }

          return ws;
        }
      } catch (e) {
        console.error(`Lỗi nạp workspace ${lang}:`, e);
      }
    }

    // 2. Tự động kiểm tra và Migrate dữ liệu phẳng cũ
    const migrated = this.tryMigrateLegacyData(lang);
    if (migrated) {
      this.saveWorkspaceImmediately(lang, migrated);
      return migrated;
    }

    // 3. Khởi tạo hồ sơ mới ở Level 1
    const def = this.createDefaultWorkspace(lang);
    this.saveWorkspaceImmediately(lang, def);
    return def;
  }

  /**
   * Hợp nhất dữ liệu Tiếng Nhật từ các key legacy (_ja_v1) nếu workspace chưa có
   */
  private mergeLegacyJapaneseIfMissing(ws: LanguageWorkspaceState) {
    if (typeof localStorage === 'undefined') return;
    try {
      if (!ws.topicStars || Object.keys(ws.topicStars).length <= 2) {
        const rawStars = localStorage.getItem('language_farm_topic_stars_ja_v1');
        if (rawStars) {
          const parsed = JSON.parse(rawStars);
          if (parsed && Object.keys(parsed).length) {
            ws.topicStars = { ...ws.topicStars, ...parsed };
          }
        }
      }

      if (!ws.wordStats || Object.keys(ws.wordStats).length === 0) {
        const rawStats = localStorage.getItem('language_farm_vocab_progress_ja_v1');
        if (rawStats) {
          const parsed = JSON.parse(rawStats);
          if (parsed && Object.keys(parsed).length) {
            ws.wordStats = { ...ws.wordStats, ...parsed };
          }
        }
      }

      if (!ws.learnedWords || ws.learnedWords.length === 0) {
        if (ws.wordStats) {
          ws.learnedWords = Object.entries(ws.wordStats)
            .filter(([_, s]: any) => s && s.learned)
            .map(([id]) => id);
        }
      }

      if (!ws.masteredKana || ws.masteredKana.length === 0) {
        const rawKana = localStorage.getItem('language_farm_kana_mastery_ja_v1');
        if (rawKana) {
          const parsed = JSON.parse(rawKana);
          if (Array.isArray(parsed) && parsed.length) {
            ws.masteredKana = parsed;
          }
        }
      }

      if (!ws.ebbinghausReviews || (Array.isArray(ws.ebbinghausReviews) ? ws.ebbinghausReviews.length === 0 : Object.keys(ws.ebbinghausReviews).length === 0)) {
        const rawRevs = localStorage.getItem('language_farm_ebbinghaus_ja_v1');
        if (rawRevs) {
          const parsed = JSON.parse(rawRevs);
          if (Array.isArray(parsed) && parsed.length) {
            ws.ebbinghausReviews = parsed;
          }
        }
      }
    } catch {}
  }

  /**
   * Tạo Workspace mặc định cho người mới bắt đầu (Lv.1, 100 Xu, 4 ô đất mở)
   */
  createDefaultWorkspace(lang: LangCode): LanguageWorkspaceState {
    return {
      langCode: lang,
      level: 1,
      currentXp: 0,
      coins: 100,
      plots: createDefaultPlots(),
      inventory: createDefaultInventory(),
      books: [],
      activeLessonId: 1,
      learnedWords: [],
      bookmarkedWords: [],
      lessonProgress: {},
      wordStats: {},
      rewardState: {
        pitySeedMisses: 0,
        pityFertilizerMisses: 0,
        dailyBonusRollsUsed: 0,
        lastBonusRollDate: new Date().toISOString().slice(0, 10)
      },
      ebbinghausReviews: {},
      dailyReviewRewardsClaimed: 0,
      lastReviewRewardDate: '',
      masteredKana: [],
      topicStars: {
        ja_n5_01: { unlocked: true, bestStarsClaimed: 0 },
        ja_n5_02: { unlocked: true, bestStarsClaimed: 0 }
      }
    };
  }

  /**
   * Lưu Workspace có Debounce (300ms) để bảo vệ hiệu năng & dung lượng LocalStorage
   */
  debouncedSaveWorkspace(lang: LangCode, ws: LanguageWorkspaceState) {
    if (typeof localStorage === 'undefined') return;
    this.pendingWorkspaceToSave = { lang, ws };
    if (lang === this.activeLang()) {
      this.currentWorkspace.set({ ...ws, langCode: lang });
    }
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }
    this.saveTimer = setTimeout(() => {
      if (this.pendingWorkspaceToSave) {
        this.saveWorkspaceImmediately(this.pendingWorkspaceToSave.lang, this.pendingWorkspaceToSave.ws);
        this.pendingWorkspaceToSave = null;
      }
      this.saveTimer = null;
    }, 300);
  }

  /**
   * Lưu ngay lập tức không chờ (khi chuyển trang hoặc đổi ngôn ngữ)
   */
  saveWorkspaceImmediately(lang: LangCode, ws: LanguageWorkspaceState) {
    if (typeof localStorage === 'undefined') return;
    try {
      const cleanWs: LanguageWorkspaceState = {
        ...ws,
        langCode: lang
      };

      const key = `${this.WORKSPACE_PREFIX}${lang}${this.WORKSPACE_VERSION}`;
      localStorage.setItem(key, JSON.stringify(cleanWs));

      // Cập nhật signal currentWorkspace đồng bộ tức thì
      if (lang === this.activeLang()) {
        this.currentWorkspace.set(cleanWs);
      }
    } catch (err) {
      console.error(`Storage Safety Error khi lưu workspace ${lang}:`, err);
    }
  }

  flushNow() {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }
    if (this.pendingWorkspaceToSave) {
      this.saveWorkspaceImmediately(this.pendingWorkspaceToSave.lang, this.pendingWorkspaceToSave.ws);
      this.pendingWorkspaceToSave = null;
    } else {
      this.saveWorkspaceImmediately(this.activeLang(), this.currentWorkspace());
    }
  }

  /**
   * Nạp Global Profile từ LocalStorage
   */
  private loadGlobalProfile(): GlobalProfileState {
    if (typeof localStorage === 'undefined') {
      return {
        activeLang: 'en',
        globalStreak: 1,
        totalCropsHarvestedAllTime: 0,
        achievements: {}
      };
    }

    try {
      const raw = localStorage.getItem(this.GLOBAL_PROFILE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return {
            activeLang: parsed.activeLang === 'ja' ? 'ja' : 'en',
            globalStreak: typeof parsed.globalStreak === 'number' ? parsed.globalStreak : 1,
            lastStudyDate: parsed.lastStudyDate || '',
            totalCropsHarvestedAllTime: parsed.totalCropsHarvestedAllTime || 0,
            achievements: parsed.achievements || {}
          };
        }
      }
    } catch {}

    // Lấy activeLang cũ nếu có
    let legacyActiveLang: LangCode = 'en';
    try {
      const oldLang = localStorage.getItem('language_farm_active_lang_v1');
      if (oldLang === 'ja') legacyActiveLang = 'ja';
    } catch {}

    return {
      activeLang: legacyActiveLang,
      globalStreak: 1,
      totalCropsHarvestedAllTime: 0,
      achievements: {}
    };
  }

  updateGlobalProfile(updater: (prev: GlobalProfileState) => GlobalProfileState) {
    const updated = updater(this.globalProfile());
    this.globalProfile.set(updated);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.GLOBAL_PROFILE_KEY, JSON.stringify(updated));
      } catch {}
    }
  }

  /**
   * Migrate dữ liệu phẳng cũ thành Workspace có cấu trúc
   */
  private tryMigrateLegacyData(lang: LangCode): LanguageWorkspaceState | null {
    if (lang === 'en') {
      const rawMain = localStorage.getItem('english_farm_v1');
      if (!rawMain) return null;

      try {
        const main = JSON.parse(rawMain);
        const rawWordStats = localStorage.getItem('english_farm_word_stats');
        const rawLessonProg = localStorage.getItem('english_farm_lesson_progress');
        const rawRewardState = localStorage.getItem('english_farm_reward_state');
        const rawReviews = localStorage.getItem('english_farm_vocab_reviews_v1');
        const rawDailyRewards = localStorage.getItem('english_farm_review_daily_rewards_v1');

        return {
          langCode: 'en',
          level: typeof main.level === 'number' ? main.level : 1,
          currentXp: typeof main.currentXp === 'number' ? main.currentXp : 0,
          coins: typeof main.coins === 'number' ? main.coins : 100,
          plots: Array.isArray(main.plots) && main.plots.length ? main.plots : createDefaultPlots(),
          inventory: main.inventory || createDefaultInventory(),
          books: main.books || [],
          activeLessonId: main.activeLessonId || 1,
          learnedWords: main.learnedWords || [],
          bookmarkedWords: main.bookmarkedWords || [],
          wordStats: rawWordStats ? JSON.parse(rawWordStats) : {},
          lessonProgress: rawLessonProg ? JSON.parse(rawLessonProg) : {},
          rewardState: rawRewardState ? JSON.parse(rawRewardState) : {
            pitySeedCounter: 0,
            pityFertilizerCounter: 0,
            luckyRollsToday: 0,
            lastRollDate: new Date().toISOString().slice(0, 10)
          },
          ebbinghausReviews: rawReviews ? JSON.parse(rawReviews) : [],
          dailyReviewRewardsClaimed: rawDailyRewards ? JSON.parse(rawDailyRewards).claimed || 0 : 0,
          lastReviewRewardDate: rawDailyRewards ? JSON.parse(rawDailyRewards).date || '' : ''
        };
      } catch (err) {
        console.warn('Lỗi migrate dữ liệu Tiếng Anh:', err);
      }
    } else if (lang === 'ja') {
      const rawWordStats = localStorage.getItem('language_farm_vocab_progress_ja_v1');
      const rawTopicStars = localStorage.getItem('language_farm_topic_stars_ja_v1');
      const rawKana = localStorage.getItem('language_farm_kana_mastery_ja_v1');
      const rawReviews = localStorage.getItem('language_farm_ebbinghaus_ja_v1');

      if (!rawWordStats && !rawTopicStars && !rawKana) return null;

      try {
        const def = this.createDefaultWorkspace('ja');
        const parsedStats = rawWordStats ? JSON.parse(rawWordStats) : {};
        const learnedWords = Object.entries(parsedStats)
          .filter(([_, s]: any) => s && s.learned)
          .map(([id]) => id);
        const bookmarkedWords = Object.entries(parsedStats)
          .filter(([_, s]: any) => s && s.bookmarked)
          .map(([id]) => id);

        return {
          ...def,
          learnedWords,
          bookmarkedWords,
          wordStats: parsedStats,
          topicStars: rawTopicStars ? JSON.parse(rawTopicStars) : def.topicStars,
          masteredKana: rawKana ? JSON.parse(rawKana) : [],
          ebbinghausReviews: rawReviews ? JSON.parse(rawReviews) : []
        };
      } catch (err) {
        console.warn('Lỗi migrate dữ liệu Tiếng Nhật:', err);
      }
    }
    return null;
  }
}
