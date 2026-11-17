import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Subject } from 'rxjs';
import { FarmPlot, PlotStatus, UserInventory, PlannerBook, CartItem, ToastMessage, ToastType, ShopItem, UserVocabReview, ReviewStage, DailyCohortRow, QuestEventType } from '../models/game.models';
import { FarmApiService, LessonDto, VocabularyDto, FarmPlotDto, UserInventoryItemDto, QuizSubmitResultDto } from './farm-api.service';
import { CROP_CATALOG } from '../constants/crop-catalog.constant';
import { DEFAULT_VOCABULARIES } from '../constants/default-vocabularies.constant';
import { DEFAULT_LESSONS } from '../constants/default-lessons.constant';
import N5_SEED from '../../../assets/data/jlpt_n5_vocab_seed.json';
import { computePlotCountdown, PlotCountdownResult } from '../utils/growth-countdown.util';
import { getTodayVnDate, addDays, processReviewQuizCompletion, buildDailyCohorts } from '../utils/ebbinghaus.util';
import {
  UserWordStat,
  UserLessonProgress,
  UserRewardState,
  calculateBalancedQuizReward,
  BalancedQuizRewardResult,
  UserProgression,
  UnlockRequirement,
  xpRequiredForLevel,
  applyXpWithReset,
  canUnlockTarget
} from './quiz-engine.service';

import { LanguageContextService, LanguageWorkspaceState } from './language-context.service';

export { DEFAULT_LESSONS } from '../constants/default-lessons.constant';
export { xpRequiredForLevel, applyXpWithReset, canUnlockTarget } from './quiz-engine.service';

export interface PlotUnlockRequirement {
  index: number;
  coinPrice: number;
  minLevel: number;
  requiredCrops: { cropId: string; qty: number; cropNameVi: string }[];
}

export function getPlotUnlockRequirement(plotIndex: number): PlotUnlockRequirement {
  switch (plotIndex) {
    case 4: // Plot #5
      return {
        index: 4,
        coinPrice: 30,
        minLevel: 2,
        requiredCrops: [{ cropId: 'corn', qty: 2, cropNameVi: 'Bắp ngô' }]
      };
    case 5: // Plot #6
      return {
        index: 5,
        coinPrice: 50,
        minLevel: 3,
        requiredCrops: [{ cropId: 'tomato', qty: 3, cropNameVi: 'Cà chua' }]
      };
    case 6: // Plot #7
      return {
        index: 6,
        coinPrice: 80,
        minLevel: 4,
        requiredCrops: [{ cropId: 'strawberry', qty: 2, cropNameVi: 'Dâu tây' }]
      };
    case 7: // Plot #8
      return {
        index: 7,
        coinPrice: 120,
        minLevel: 5,
        requiredCrops: [{ cropId: 'apple', qty: 2, cropNameVi: 'Táo' }]
      };
    case 8: // Plot #9
      return {
        index: 8,
        coinPrice: 160,
        minLevel: 6,
        requiredCrops: [{ cropId: 'pumpkin', qty: 2, cropNameVi: 'Bí ngô' }]
      };
    default:
      return { index: plotIndex, coinPrice: 20, minLevel: 1, requiredCrops: [] };
  }
}

export interface CropLockInfo {
  isUnlocked: boolean;
  tier: number;
  tierName: string;
  requiredXp: number;
  requiredLevel: number;
  requiredLessonTitle?: string;
  missingReasons: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private readonly STORAGE_KEY = 'english_farm_v1';
  private readonly VOCAB_STORAGE_KEY = 'english_farm_vocabularies';
  private readonly WORD_STATS_KEY = 'english_farm_word_stats';
  private readonly LESSON_PROGRESS_KEY = 'english_farm_lesson_progress';
  private readonly REWARD_STATE_KEY = 'english_farm_reward_state';
  private readonly REVIEW_STORAGE_KEY = 'english_farm_vocab_reviews_v1';
  private readonly REVIEW_DAILY_REWARDS_KEY = 'english_farm_review_daily_rewards_v1';
  private readonly STUDY_STATS_KEY = 'english_farm_study_stats_v1';
  private api = inject(FarmApiService);
  private langContext = inject(LanguageContextService);

  // Quản lý ngôn ngữ học tập (English TOEIC | Japanese JLPT N5)
  readonly activeLang = this.langContext.activeLang;

  getOtherLanguageLevel(): number {
    const other = this.activeLang() === 'en' ? 'ja' : 'en';
    return this.langContext.getLanguageLevel(other);
  }

  setLanguage(lang: 'en' | 'ja') {
    if (this.activeLang() === lang) return;

    // 1. Lưu workspace hiện tại
    const currentWs = this.serializeCurrentWorkspace();

    // 2. Chuyển đổi qua LanguageContextService
    const { workspace: nextWs, welcomeGiftGranted } = this.langContext.switchLanguage(lang, currentWs);

    // 3. Áp dụng workspace mới vào các signals
    this.applyWorkspace(nextWs);

    // 4. Thông báo Toast
    if (welcomeGiftGranted) {
      this.showToast('🎁 Chúc mừng! Bạn nhận được Quà chào mừng vườn Nhật: +2 Phân bón siêu tốc, +50 Xu!');
    } else {
      this.showToast(lang === 'ja'
        ? `🇯🇵 Đã chuyển sang Tiếng Nhật JLPT N5 (Lv.${this.level()})!`
        : `🇬🇧 Đã chuyển sang Tiếng Anh TOEIC (Lv.${this.level()})!`
      );
    }
  }

  // Trạng thái kết nối Backend
  isApiConnected = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // Đồng bộ thời gian thực với Server (Rule 5: Anti-Clock-Tampering)
  serverClockOffsetMs = signal<number>(0);

  syncServerTime(serverUtcNow?: string | null) {
    if (!serverUtcNow) return;
    const serverMs = new Date(serverUtcNow).getTime();
    if (!isNaN(serverMs)) {
      this.serverClockOffsetMs.set(serverMs - Date.now());
    }
  }

  // Quản lý đóng / mở thanh điều hướng (Sidebar Collapse/Expand)
  isMobileSidebarOpen = signal<boolean>(false);
  isDesktopSidebarCollapsed = signal<boolean>(false);

  toggleSidebar() {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      this.isMobileSidebarOpen.update(v => !v);
    } else {
      this.isDesktopSidebarCollapsed.update(v => !v);
    }
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen.set(false);
  }

  openMobileSidebar() {
    this.isMobileSidebarOpen.set(true);
  }

  // Event bus cho Daily Quests & Streak Engine (Decoupled & Event-Driven)
  readonly questEvent$ = new Subject<{ type: QuestEventType; refId?: string }>();

  emitQuestEvent(type: QuestEventType, refId?: string) {
    this.questEvent$.next({ type, refId });
  }

  // Player Stats & Leveling (Rule 3: Reset XP on Level-Up, Cap at 1000 XP)
  level = signal<number>(1);
  currentXp = signal<number>(0);
  coins = signal<number>(100);
  xpRequired = computed(() => xpRequiredForLevel(this.level()));

  get xp() {
    return this.currentXp;
  }

  addXp(gainedXp: number) {
    if (gainedXp <= 0) return;
    const res = applyXpWithReset(this.level(), this.currentXp(), gainedXp);
    this.level.set(res.level);
    this.currentXp.set(res.currentXp);
    if (res.leveledUp) {
      this.showToast(`🎉 CHÚC MỪNG! Bạn đã thăng cấp Level ${res.level}!`);
    }
  }

  addCoins(gainedCoins: number) {
    if (gainedCoins > 0) {
      this.coins.update(c => c + gainedCoins);
    }
  }

  // Cart
  cart = signal<CartItem[]>([]);
  cartCount = computed(() => this.cart().reduce((sum, item) => sum + item.qty, 0));
  cartTotal = computed(() => this.cart().reduce((sum, item) => sum + item.item.price * item.qty, 0));

  // Farm Plots (3x3 Flat Grid: #1-#4 mở sẵn, #5-#9 khóa cần mở bằng Coins hoặc Level + Nông sản)
  plots = signal<FarmPlot[]>([
    { id: 1, index: 0, status: 'seeded', crop: 'carrot', isWatered: true, growthProgress: 15 },
    { id: 2, index: 1, status: 'growing', crop: 'carrot', isWatered: true, growthProgress: 45 },
    { id: 3, index: 2, status: 'growing', crop: 'carrot', isWatered: true, growthProgress: 85 },
    { id: 4, index: 3, status: 'ready', crop: 'carrot', isWatered: true, growthProgress: 100 },
    { id: 5, index: 4, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 6, index: 5, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 7, index: 6, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 8, index: 7, status: 'locked', isWatered: false, growthProgress: 0 },
    { id: 9, index: 8, status: 'locked', isWatered: false, growthProgress: 0 }
  ]);

  // Inventory
  inventory = signal<UserInventory>({
    seeds: {
      carrot: 5,
      cucumber: 3
    },
    harvested: {},
    care: { water: 15, fertilizer: 5, speedFertilizer: 2 },
    decor: { lamp: 0, fence: 0, scarecrow: 0 }
  });

  // Lessons từ Backend / Fallback Offline
  lessons = signal<LessonDto[]>(DEFAULT_LESSONS);
  activeLessonId = signal<number>(1);
  activeVocabularies = signal<VocabularyDto[]>([]);

  // Dữ liệu từ vựng Offline & Tiến độ học từ vựng (Lưu vĩnh viễn trong localStorage)
  learnedWords = signal<string[]>([]);
  bookmarkedWords = signal<string[]>([]);
  vocabulariesByLesson = signal<Record<number, VocabularyDto[]>>(DEFAULT_VOCABULARIES);

  // Learning Planners
  books = signal<PlannerBook[]>([
    {
      id: 'b_office',
      title: 'Văn phòng (Office)',
      moduleType: 'Vocabulary',
      coverColor: '#78815D', // Olive
      learned: 8,
      total: 24,
      unlocked: true,
      note: 'TOEIC 450 - Nền tảng công sở'
    },
    {
      id: 'b_hr',
      title: 'Nhân sự (Human Resources)',
      moduleType: 'Grammar',
      coverColor: '#A65E65', // Rose
      learned: 0,
      total: 24,
      unlocked: true,
      unlockCondition: 'Mở sẵn',
      note: 'Tuyển dụng & Đãi ngộ'
    },
    {
      id: 'b_business',
      title: 'Kinh doanh (Business)',
      moduleType: 'Listening',
      coverColor: '#344B5E', // Navy
      learned: 0,
      total: 25,
      unlocked: true,
      unlockCondition: 'Mở sẵn',
      note: 'Đàm phán & Hợp đồng'
    }
  ]);

  // Toasts
  toasts = signal<ToastMessage[]>([]);

  // Selected tool on Farm
  selectedTool = signal<'plant' | 'water' | 'fertilize' | 'speed_fertilizer' | 'harvest'>('plant');
  selectedSeed = signal<string>('carrot');

  // Thống kê từng từ (UserWordStats: attempts, wrongCount, lastSeenAt) cho Smart Pool Sampling
  userWordStats = signal<Record<number, UserWordStat>>({});

  // Tiến độ sao bài học (UserLessonProgress: bestStarsClaimed 0..3, bestScorePercent)
  userLessonProgress = signal<Record<number, UserLessonProgress>>({});
  topicStars = signal<Record<string, { unlocked: boolean; bestStarsClaimed: 0 | 1 | 2 | 3 }>>({
    ja_n5_01: { unlocked: true, bestStarsClaimed: 0 },
    ja_n5_02: { unlocked: true, bestStarsClaimed: 0 }
  });
  masteredKana = signal<string[]>([]);

  // Trạng thái quay thưởng may mắn & bảo hiểm (UserRewardState: Pity counter & Daily cap)
  userRewardState = signal<UserRewardState>({
    pityFertilizerMisses: 0,
    pitySeedMisses: 0,
    dailyBonusRollsUsed: 0,
    lastBonusRollDate: ''
  });

  // Spaced Repetition (Ebbinghaus) & Daily Review Rewards
  userVocabReviews = signal<Record<number, UserVocabReview>>({});
  dailyReviewRewardsClaimed = signal<number>(0);
  lastReviewRewardDate = signal<string>('');

  // Study Streak & Automated Daily Tasks
  studyStreak = signal<number>(1);
  lastStudyDate = signal<string>('');
  dailyTaskState = signal<{ vocabLearned: number; quizDone: number; farmCare: number; date: string }>({
    vocabLearned: 0,
    quizDone: 0,
    farmCare: 0,
    date: ''
  });

  todayVn = computed(() => getTodayVnDate());

  dueReviews = computed(() => {
    const today = this.todayVn();
    return Object.values(this.userVocabReviews()).filter(r => r.stage < 4 && r.nextReviewDate <= today);
  });

  dueTodayCount = computed(() => this.dueReviews().length);

  inReviewCount = computed(() => {
    return Object.values(this.userVocabReviews()).filter(r => r.stage >= 0 && r.stage < 4).length;
  });

  masteredCount = computed(() => {
    return Object.values(this.userVocabReviews()).filter(r => r.stage === 4).length;
  });

  totalLearnedCount = computed(() => {
    return Object.keys(this.userVocabReviews()).length;
  });

  dailyCohorts = computed(() => {
    return buildDailyCohorts(this.userVocabReviews(), this.todayVn());
  });

  dailyTasks = computed(() => {
    const today = this.todayVn();
    const state = this.dailyTaskState();
    const isToday = state.date === today;
    const vCount = isToday ? state.vocabLearned : 0;
    const qCount = isToday ? state.quizDone : 0;
    const cCount = isToday ? state.farmCare : 0;

    return [
      { id: 1, title: 'Học 10 từ mới', current: Math.min(10, vCount), target: 10, done: vCount >= 10 },
      { id: 2, title: 'Luyện tập / Ôn tập', current: Math.min(1, qCount), target: 1, done: qCount >= 1 },
      { id: 3, title: 'Chăm sóc cây trồng', current: Math.min(3, cCount), target: 3, done: cCount >= 3 }
    ];
  });

  getUnlockedSeedIds(): string[] {
    return CROP_CATALOG.filter(c => this.isCropUnlocked(c.id)).map(c => c.id);
  }

  private isHydrated = false;

  constructor() {
    // 1. Tải dữ liệu lưu trữ từ localStorage (trình duyệt)
    this.loadFromStorage();
    this.isHydrated = true;

    // 2. Thử đồng bộ với Backend API nếu có server chạy
    this.initFromApi();

    // 3. Tự động lưu vào localStorage mỗi khi trạng thái thay đổi
    effect(() => {
      // Đọc các signal để kích hoạt reactive dependency
      this.xp();
      this.coins();
      this.level();
      this.plots();
      this.inventory();
      this.lessons();
      this.books();

      if (this.isHydrated) {
        this.saveToStorage();
      }
    });
  }

  private toastTimers = new Map<number, any>();

  showToast(text: string, type?: ToastType) {
    if (!text) return;

    const resolvedType: ToastType = type || this.detectToastType(text);
    const cleanText = text.trim();

    // 1. Chống Spam & Trùng lặp (Deduplication)
    // Nếu cùng 1 thông báo đang hiển thị -> Không sinh bubble mới, chỉ tăng count và reset timer
    const currentList = this.toasts();
    const existingIndex = currentList.findIndex(t => t.text.trim() === cleanText);

    if (existingIndex >= 0) {
      const existing = currentList[existingIndex];
      const updatedCount = (existing.count || 1) + 1;

      this.toasts.update(list => list.map((t, idx) =>
        idx === existingIndex
          ? { ...t, count: updatedCount, type: resolvedType }
          : t
      ));

      this.scheduleToastDismiss(existing.id, 2800);
      return;
    }

    // 2. Giới hạn tối đa thông báo hiển thị cùng lúc (Tối đa 2 thông báo để không che màn hình)
    const id = Date.now() + Math.floor(Math.random() * 100);
    const newToast: ToastMessage = {
      id,
      text: cleanText,
      type: resolvedType,
      count: 1
    };

    this.toasts.update(list => {
      const trimmed = list.slice(-1); // Giữ tối đa 1 thông báo trước đó
      return [...trimmed, newToast];
    });

    this.scheduleToastDismiss(id, 3200);
  }

  private scheduleToastDismiss(id: number, durationMs: number) {
    if (this.toastTimers.has(id)) {
      clearTimeout(this.toastTimers.get(id));
    }
    const timer = setTimeout(() => {
      this.dismissToast(id);
      this.toastTimers.delete(id);
    }, durationMs);
    this.toastTimers.set(id, timer);
  }

  dismissToast(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
    if (this.toastTimers.has(id)) {
      clearTimeout(this.toastTimers.get(id));
      this.toastTimers.delete(id);
    }
  }

  private detectToastType(text: string): ToastType {
    const lower = text.toLowerCase();

    // Warning: Các lỗi thao tác canh tác & điều kiện chưa thỏa
    if (
      lower.includes('đã được tưới') ||
      lower.includes('đã được bón') ||
      lower.includes('hết nước') ||
      lower.includes('hết phân') ||
      lower.includes('không đủ') ||
      lower.includes('chưa có') ||
      lower.includes('chưa thể') ||
      lower.includes('chưa chín') ||
      lower.includes('đang bị khóa') ||
      lower.includes('đang khóa') ||
      lower.includes('cần ít nhất') ||
      lower.includes('cần đạt level') ||
      lower.includes('cần ') ||
      lower.includes('chỉ dùng cho') ||
      lower.includes('ô đất không trống') ||
      lower.includes('chưa đến hạn') ||
      lower.includes('⚠️') ||
      lower.includes('🔒')
    ) {
      return 'warning';
    }

    // Error: Các lỗi file, hệ thống
    if (
      lower.includes('❌') ||
      lower.includes('lỗi') ||
      lower.includes('thất bại') ||
      lower.includes('không hợp lệ') ||
      lower.includes('hết hạn')
    ) {
      return 'error';
    }

    // Success: Thành công, nhận thưởng
    if (
      lower.includes('🎉') ||
      lower.includes('✅') ||
      lower.includes('✓') ||
      lower.includes('✨') ||
      lower.includes('thành công') ||
      lower.includes('chúc mừng') ||
      lower.includes('nhận được') ||
      lower.includes('mở khóa thành công') ||
      lower.includes('thu hoạch')
    ) {
      return 'success';
    }

    return 'info';
  }

  // =========================================================================
  // BỘ NHỚ LÂU DÀI: LOCALSTORAGE & SAO LƯU / KHÔI PHỤC JSON
  // =========================================================================

  serializeCurrentWorkspace(): LanguageWorkspaceState {
    const completedCodes = new Set<string>();
    if (this.activeLang() === 'ja') {
      const jaStars = this.topicStars() || {};
      for (const [code, item] of Object.entries(jaStars)) {
        if (item && item.bestStarsClaimed > 0) {
          completedCodes.add(code);
        }
      }
    }
    const prog = this.userLessonProgress() || {};
    for (const [code, item] of Object.entries(prog)) {
      if (item && item.bestStarsClaimed > 0) {
        completedCodes.add(code);
      }
    }

    return {
      langCode: this.activeLang(),
      level: this.level(),
      currentXp: this.currentXp(),
      coins: this.coins(),
      plots: this.plots(),
      inventory: this.inventory(),
      books: this.books(),
      activeLessonId: this.activeLessonId(),
      learnedWords: this.learnedWords(),
      bookmarkedWords: this.bookmarkedWords(),
      lessonProgress: this.userLessonProgress(),
      wordStats: this.userWordStats(),
      rewardState: this.userRewardState(),
      ebbinghausReviews: this.userVocabReviews(),
      dailyReviewRewardsClaimed: this.dailyReviewRewardsClaimed(),
      lastReviewRewardDate: this.lastReviewRewardDate(),
      masteredKana: this.masteredKana(),
      topicStars: this.topicStars(),
      completedLessonCodes: Array.from(completedCodes)
    };
  }

  applyWorkspace(ws: LanguageWorkspaceState) {
    this.level.set(ws.level || 1);
    this.currentXp.set(ws.currentXp || 0);
    this.coins.set(typeof ws.coins === 'number' ? ws.coins : 100);
    if (Array.isArray(ws.plots) && ws.plots.length > 0) {
      const migratedPlots = ws.plots.map((p: FarmPlot) => {
        if (p.crop === 'sunflower') return { ...p, crop: 'pumpkin' };
        if (p.crop === 'tulip') return { ...p, crop: 'wheat' };
        if (p.crop === 'rose') return { ...p, crop: 'blueberry' };
        if (p.crop === 'kiwi') return { ...p, crop: 'watermelon' };
        return p;
      });
      this.plots.set(migratedPlots);
      this.recalculatePlotStates();
    }
    if (ws.inventory) {
      const currentLvl = ws.level || 1;
      const sanitizedSeeds: Record<string, number> = {};
      if (ws.inventory.seeds) {
        for (const [k, v] of Object.entries(ws.inventory.seeds)) {
          const crop = CROP_CATALOG.find(c => c.id === k);
          const minLvl = crop?.minLevel ?? crop?.requiredLevel ?? 1;
          if (currentLvl >= minLvl && (v ?? 0) > 0) {
            sanitizedSeeds[k] = v!;
          }
        }
      }
      if (Object.keys(sanitizedSeeds).length === 0) {
        sanitizedSeeds['carrot'] = 5;
      }
      this.inventory.set({
        ...ws.inventory,
        seeds: sanitizedSeeds
      });
    }
    if (ws.books) {
      this.books.set(ws.books);
    }
    if (ws.activeLessonId) {
      this.activeLessonId.set(ws.activeLessonId);
    }
    this.learnedWords.set(ws.learnedWords || []);
    this.bookmarkedWords.set(ws.bookmarkedWords || []);
    this.userWordStats.set(ws.wordStats || {});
    this.userLessonProgress.set(ws.lessonProgress || {});
    if (ws.lessonProgress) {
      const progMap = ws.lessonProgress;
      this.lessons.update(list => list.map(l => {
        const p = progMap[l.id];
        if (p) {
          const best = Math.max(p.bestStarsClaimed ?? 0, l.bestStarsClaimed ?? 0);
          return {
            ...l,
            bestStarsClaimed: best,
            isUnlocked: l.isUnlocked || best > 0
          };
        }
        return l;
      }));
    }
    this.topicStars.set(ws.topicStars || (ws.langCode === 'ja' ? { ja_n5_01: { unlocked: true, bestStarsClaimed: 0 } } : {}));
    this.masteredKana.set(ws.masteredKana || []);
    if (ws.rewardState) {
      this.userRewardState.set(ws.rewardState);
    }
    if (ws.ebbinghausReviews) {
      if (Array.isArray(ws.ebbinghausReviews)) {
        const dict: Record<number, UserVocabReview> = {};
        ws.ebbinghausReviews.forEach((r: any) => {
          if (r && r.vocabId) dict[r.vocabId] = r;
        });
        this.userVocabReviews.set(dict);
      } else {
        this.userVocabReviews.set(ws.ebbinghausReviews);
      }
    } else {
      this.userVocabReviews.set({});
    }
    this.dailyReviewRewardsClaimed.set(ws.dailyReviewRewardsClaimed || 0);
    this.lastReviewRewardDate.set(ws.lastReviewRewardDate || '');
  }

  saveToStorage() {
    try {
      const ws = this.serializeCurrentWorkspace();
      this.langContext.debouncedSaveWorkspace(this.activeLang(), ws);
    } catch (e) {
      console.warn('Không thể lưu localStorage:', e);
    }
  }

  loadFromStorage() {
    try {
      const ws = this.langContext.loadWorkspace(this.activeLang());
      this.applyWorkspace(ws);

      // Nạp Global Streak & Last Study Date từ Global Profile
      const profile = this.langContext.globalProfile();
      if (typeof profile.globalStreak === 'number') {
        this.studyStreak.set(profile.globalStreak);
      }
      if (profile.lastStudyDate) {
        this.lastStudyDate.set(profile.lastStudyDate);
      }

      this.loadVocabularies();
    } catch (e) {
      console.warn('Lỗi đọc localStorage:', e);
    }
  }

  loadVocabularies() {
    const VOCAB_VERSION_KEY = 'english_farm_vocab_version';
    const CURRENT_VOCAB_VERSION = 'v2_real_db_toeic_51';
    const savedVersion = localStorage.getItem(VOCAB_VERSION_KEY);

    if (savedVersion !== CURRENT_VOCAB_VERSION) {
      this.vocabulariesByLesson.set(DEFAULT_VOCABULARIES);
      try {
        localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(DEFAULT_VOCABULARIES));
        localStorage.setItem(VOCAB_VERSION_KEY, CURRENT_VOCAB_VERSION);
      } catch {}
    } else {
      const rawVocabs = localStorage.getItem(this.VOCAB_STORAGE_KEY);
      if (rawVocabs) {
        try {
          const parsed = JSON.parse(rawVocabs);
          if (parsed && typeof parsed === 'object') {
            this.vocabulariesByLesson.set(parsed);
          }
        } catch {}
      }
    }
  }

  exportBackupJson() {
    this.saveToStorage();
    const enWs = this.activeLang() === 'en' ? this.serializeCurrentWorkspace() : this.langContext.loadWorkspace('en');
    const jaWs = this.activeLang() === 'ja' ? this.serializeCurrentWorkspace() : this.langContext.loadWorkspace('ja');
    const data = {
      app: 'LanguageFarm',
      version: 2,
      exportedAt: new Date().toISOString(),
      globalProfile: this.langContext.globalProfile(),
      workspaces: {
        en: enWs,
        ja: jaWs
      }
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `language-farm-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('💾 Đã tải file sao lưu language-farm-backup.json về máy!');
  }

  importBackupJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        throw new Error('Định dạng file không đúng');
      }

      if (data.workspaces && typeof data.workspaces === 'object') {
        if (data.workspaces.en) {
          this.langContext.saveWorkspaceImmediately('en', data.workspaces.en);
        }
        if (data.workspaces.ja) {
          this.langContext.saveWorkspaceImmediately('ja', data.workspaces.ja);
        }
        if (data.globalProfile) {
          this.langContext.updateGlobalProfile(() => data.globalProfile);
        }
        const currentWs = this.langContext.loadWorkspace(this.activeLang());
        this.applyWorkspace(currentWs);
        this.showToast('✅ Khôi phục toàn bộ dữ liệu Đa Ngôn Ngữ thành công!');
        return true;
      }

      // Legacy fallback
      if (typeof data.xp === 'number') this.xp.set(data.xp);
      if (typeof data.coins === 'number') this.coins.set(data.coins);
      if (typeof data.level === 'number') this.level.set(data.level);
      if (Array.isArray(data.plots)) this.plots.set(data.plots);
      if (data.inventory) this.inventory.set(data.inventory);
      if (Array.isArray(data.lessons)) this.lessons.set(data.lessons);
      if (Array.isArray(data.books)) this.books.set(data.books);

      this.saveToStorage();
      this.showToast('✅ Khôi phục dữ liệu nông trại thành công!');
      return true;
    } catch (e) {
      this.showToast('❌ File sao lưu không hợp lệ. Vui lòng kiểm tra lại!');
      return false;
    }
  }

  resetGameToDefault() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.xp.set(30);
    this.coins.set(125);
    this.level.set(1);
    this.plots.set([
      { id: 1, index: 0, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 2, index: 1, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 3, index: 2, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 4, index: 3, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 5, index: 4, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 6, index: 5, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 7, index: 6, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 8, index: 7, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 9, index: 8, status: 'empty', isWatered: false, growthProgress: 0 }
    ]);
    this.inventory.set({
      seeds: {
        carrot: 5, potato: 3, corn: 3, tomato: 0, strawberry: 0,
        pumpkin: 0, wheat: 0, blueberry: 0, watermelon: 0,
        cucumber: 0, radish: 0, orange: 0, peach: 0, banana: 0, grapes: 0,
        mango: 0, lemon: 0, apple: 0, cherry: 0
      },
      harvested: {
        carrot: 0, potato: 0, corn: 0, tomato: 0, strawberry: 0,
        pumpkin: 0, wheat: 0, blueberry: 0, watermelon: 0,
        cucumber: 0, radish: 0, orange: 0, peach: 0, banana: 0, grapes: 0,
        mango: 0, lemon: 0, apple: 0, cherry: 0
      },
      care: { water: 15, fertilizer: 3 },
      decor: { lamp: 0 }
    });
    this.lessons.set(DEFAULT_LESSONS);
    this.saveToStorage();
    this.showToast('🔄 Đã đặt lại trò chơi về trạng thái ban đầu!');
  }

  // =========================================================================
  // PHÂN CẤP HẠT GIỐNG & ĐIỀU KIỆN MỞ KHÓA (4-TIER PROGRESSION - LEVEL & BÀI HỌC)
  // =========================================================================

  isCropUnlocked(cropId: string): boolean {
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    if (!crop) return true;
    if (crop.id === 'carrot' || crop.id === 'cucumber') {
      if ((crop.minCompletedTopics || 0) <= 0 && (crop.minLevel || 1) <= 1) return true;
    }

    const ws = this.langContext.currentWorkspace();
    const completedCount = ws.completedLessonCodes?.length ?? 0;
    const minLevel = crop.minLevel ?? crop.requiredLevel ?? 1;
    const minCompleted = crop.minCompletedTopics ?? 0;

    return ws.level >= minLevel && completedCount >= minCompleted;
  }

  getCropLockInfo(cropId: string): CropLockInfo {
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    if (!crop) {
      return {
        isUnlocked: true,
        tier: 1,
        tierName: 'Hạng I - Mầm non',
        requiredXp: 0,
        requiredLevel: 1,
        requiredLessonTitle: '',
        missingReasons: []
      };
    }

    const ws = this.langContext.currentWorkspace();
    const completedCount = ws.completedLessonCodes?.length ?? 0;
    const minLevel = crop.minLevel ?? crop.requiredLevel ?? 1;
    const minCompleted = crop.minCompletedTopics ?? 0;
    const isUnlocked = ws.level >= minLevel && completedCount >= minCompleted;
    const langName = this.activeLang() === 'ja' ? 'Tiếng Nhật' : 'Tiếng Anh';

    const missingReasons: string[] = [];
    if (ws.level < minLevel) {
      missingReasons.push(`Cần Cấp độ ${minLevel} (hiện tại: Lv.${ws.level})`);
    }
    if (completedCount < minCompleted) {
      missingReasons.push(`Hoàn thành ${minCompleted} bài ${langName} (hiện tại: ${completedCount} bài)`);
    }

    const lockTitle = minCompleted > 0 ? `Hoàn thành ${minCompleted} bài ${langName}` : '';

    return {
      isUnlocked,
      tier: crop.tier,
      tierName: crop.tierNameVi,
      requiredXp: 0,
      requiredLevel: minLevel,
      requiredLessonTitle: lockTitle,
      missingReasons
    };
  }

  getLessonUnlockRequirement(lessonId: number): UnlockRequirement {
    const lesson = this.lessons().find(l => l.id === lessonId);
    if (lesson && lesson.requiredCrops && lesson.requiredCrops.length > 0) {
      return {
        minLevel: lesson.requiredLevel || 1,
        requiredCrops: lesson.requiredCrops
      };
    }

    if (lesson && (lesson.isUnlocked || !lesson.requiredCropId)) {
      return { minLevel: lesson.requiredLevel || 1, requiredCrops: [] };
    }

    const minLvl = Math.min(10, Math.floor((lessonId - 1) / 5) + 1);
    const cropPool = [
      { cropId: 'carrot', qty: 2, cropNameVi: 'Cà rốt' },
      { cropId: 'potato', qty: 3, cropNameVi: 'Khoai tây' },
      { cropId: 'corn', qty: 3, cropNameVi: 'Bắp ngô' }
    ];
    return {
      minLevel: minLvl,
      requiredCrops: [cropPool[lessonId % cropPool.length]]
    };
  }

  canUnlockLesson(lessonId: number): { canUnlock: boolean; missingReasons: string[]; req: UnlockRequirement } {
    const lesson = this.lessons().find(l => l.id === lessonId);
    const req = this.getLessonUnlockRequirement(lessonId);
    if (!lesson || lesson.isUnlocked) {
      return { canUnlock: false, missingReasons: [], req };
    }

    const missingReasons: string[] = [];

    if (this.level() < req.minLevel) {
      missingReasons.push(`Cần đạt Level ${req.minLevel} (hiện có: Lv.${this.level()})`);
    }

    for (const c of req.requiredCrops) {
      const available = this.inventory().harvested[c.cropId] || 0;
      if (available < c.qty) {
        missingReasons.push(`Cần ${c.qty}x ${c.cropNameVi || c.cropId} (hiện có: ${available})`);
      }
    }

    return {
      canUnlock: missingReasons.length === 0,
      missingReasons,
      req
    };
  }

  unlockLessonWithCrops(lessonId: number): boolean {
    const lesson = this.lessons().find(l => l.id === lessonId);
    if (!lesson) return false;
    if (lesson.isUnlocked) {
      this.showToast(`Chủ đề "${lesson.title}" đã được mở khóa trước đó!`);
      return false;
    }

    const check = this.canUnlockLesson(lessonId);
    if (!check.canUnlock) {
      this.showToast(`🔒 Chưa thể mở khóa: ${check.missingReasons.join(' · ')}`);
      return false;
    }

    const req = check.req;

    // Trừ số lượng nông sản thu hoạch
    this.inventory.update(inv => {
      const nextHarvested = { ...inv.harvested };
      for (const c of req.requiredCrops) {
        nextHarvested[c.cropId] = Math.max(0, (nextHarvested[c.cropId] || 0) - c.qty);
      }
      return {
        ...inv,
        harvested: nextHarvested
      };
    });

    // Cập nhật mở khóa bài học
    this.lessons.update(list => list.map(l => l.id === lessonId ? { ...l, isUnlocked: true } : l));
    this.showToast(`🎉 Mở khóa thành công chủ đề "${lesson.title}"! Giống cây tương ứng đã sẵn sàng.`);
    this.saveToStorage();
    return true;
  }

  // =========================================================================
  // RULE 5: MỞ KHÓA Ô ĐẤT #5 - #9 (BẰNG XU HOẶC LEVEL + NÔNG SẢN)
  // =========================================================================

  unlockPlotWithCoins(plotIndex: number): boolean {
    const plot = this.plots()[plotIndex];
    if (!plot || plot.status !== 'locked') return false;

    const req = getPlotUnlockRequirement(plotIndex);
    if (this.coins() < req.coinPrice) {
      this.showToast(`Bạn cần ${req.coinPrice} Xu (hiện có: ${this.coins()} Xu) để mở ô đất này!`);
      return false;
    }

    this.coins.update(c => c - req.coinPrice);
    this.plots.update(list => list.map((p, i) => i === plotIndex ? { ...p, status: 'empty' } : p));
    this.showToast(`🎉 Đã mở khóa ô đất #${plotIndex + 1} bằng ${req.coinPrice} Xu!`);
    this.saveToStorage();
    return true;
  }

  unlockPlotWithCrops(plotIndex: number): boolean {
    const plot = this.plots()[plotIndex];
    if (!plot || plot.status !== 'locked') return false;

    const req = getPlotUnlockRequirement(plotIndex);
    if (this.level() < req.minLevel) {
      this.showToast(`Cần đạt Level ${req.minLevel} (hiện có: Lv.${this.level()}) để mở ô đất này!`);
      return false;
    }

    for (const c of req.requiredCrops) {
      const available = this.inventory().harvested[c.cropId] || 0;
      if (available < c.qty) {
        this.showToast(`Cần ${c.qty}x ${c.cropNameVi} (hiện có: ${available}) để mở ô đất!`);
        return false;
      }
    }

    // Trừ nông sản
    this.inventory.update(inv => {
      const nextHarvested = { ...inv.harvested };
      for (const c of req.requiredCrops) {
        nextHarvested[c.cropId] = Math.max(0, (nextHarvested[c.cropId] || 0) - c.qty);
      }
      return { ...inv, harvested: nextHarvested };
    });

    this.plots.update(list => list.map((p, i) => i === plotIndex ? { ...p, status: 'empty' } : p));
    this.showToast(`🎉 Đã mở khóa ô đất #${plotIndex + 1} bằng nông sản thành công!`);
    this.saveToStorage();
    return true;
  }

  // =========================================================================
  // RULE 5: END-GAME CROP SINK (CHỢ NÔNG SẢN & TRAO ĐỔI VẬT TƯ)
  // =========================================================================

  sellHarvestedCrop(cropId: string, qty: number = 1): boolean {
    const current = this.inventory().harvested[cropId] || 0;
    if (current < qty) {
      this.showToast('Bạn không đủ số lượng nông sản để bán!');
      return false;
    }
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    const name = crop?.nameVi || cropId;
    const unitPrice = crop?.sellPrice || Math.max(5, Math.round((crop?.price || 15) * 1.6));
    const totalEarned = unitPrice * qty;

    this.inventory.update(inv => ({
      ...inv,
      harvested: {
        ...inv.harvested,
        [cropId]: (inv.harvested[cropId] || 0) - qty
      }
    }));
    this.coins.update(c => c + totalEarned);
    this.showToast(`🌾 Đã bán ${qty}x ${name}, nhận +${totalEarned} Xu!`);
    this.saveToStorage();
    return true;
  }

  tradeCropsForFertilizer(cropId: string): boolean {
    const current = this.inventory().harvested[cropId] || 0;
    if (current < 3) {
      this.showToast(`Bạn cần ít nhất 3 nông sản (hiện có: ${current}) để đổi 1 Phân bón!`);
      return false;
    }
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    const name = crop?.nameVi || cropId;

    this.inventory.update(inv => ({
      ...inv,
      harvested: {
        ...inv.harvested,
        [cropId]: (inv.harvested[cropId] || 0) - 3
      },
      care: {
        ...inv.care,
        fertilizer: (inv.care.fertilizer || 0) + 1
      }
    }));
    this.showToast(`⚡ Đã đổi 3x ${name} lấy +1 Phân bón vi sinh!`);
    this.saveToStorage();
    return true;
  }

  tradeCropsForWater(cropId: string): boolean {
    const current = this.inventory().harvested[cropId] || 0;
    if (current < 2) {
      this.showToast(`Bạn cần ít nhất 2 nông sản (hiện có: ${current}) để đổi 2 Lượt nước!`);
      return false;
    }
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    const name = crop?.nameVi || cropId;

    this.inventory.update(inv => ({
      ...inv,
      harvested: {
        ...inv.harvested,
        [cropId]: (inv.harvested[cropId] || 0) - 2
      },
      care: {
        ...inv.care,
        water: (inv.care.water || 0) + 2
      }
    }));
    this.showToast(`💧 Đã đổi 2x ${name} lấy +2 Lượt nước tưới!`);
    this.saveToStorage();
    return true;
  }

  /**
   * Đồng bộ toàn bộ dữ liệu từ Backend API
   */
  initFromApi() {
    this.isLoading.set(true);

    // 1. Tải Profile
    this.api.getProfile().subscribe({
      next: (profile) => {
        this.xp.set(profile.xp);
        this.coins.set(profile.coins);
        this.level.set(profile.level);
        this.isApiConnected.set(true);
      },
      error: () => {
        // Fallback offline mượt mà
        this.isApiConnected.set(false);
      }
    });

    // 2. Tải Kho đồ
    this.api.getInventory().subscribe({
      next: (items: UserInventoryItemDto[]) => {
        const newInv: UserInventory = {
          seeds: {
            carrot: 0, potato: 0, corn: 0, tomato: 0, strawberry: 0,
            pumpkin: 0, wheat: 0, blueberry: 0, watermelon: 0,
            cucumber: 0, radish: 0, orange: 0, peach: 0, banana: 0, grapes: 0,
            mango: 0, lemon: 0, apple: 0, cherry: 0
          },
          harvested: {
            carrot: 0, potato: 0, corn: 0, tomato: 0, strawberry: 0,
            pumpkin: 0, wheat: 0, blueberry: 0, watermelon: 0,
            cucumber: 0, radish: 0, orange: 0, peach: 0, banana: 0, grapes: 0,
            mango: 0, lemon: 0, apple: 0, cherry: 0
          },
          care: { water: 0, fertilizer: 0 },
          decor: {}
        };

        for (const item of items) {
          const type = (item.itemType || '').toLowerCase();
          const rawCode = (item.itemCode || '').toLowerCase();
          const code = rawCode === 'sunflower' ? 'pumpkin'
            : rawCode === 'rose' ? 'blueberry'
            : rawCode === 'tulip' ? 'wheat'
            : rawCode === 'kiwi' ? 'watermelon'
            : rawCode;

          if (type === 'seed' || type === '1') {
            newInv.seeds[code] = (newInv.seeds[code] || 0) + item.quantity;
          } else if (type === 'harvested' || type === 'harvestedcrop' || type === '4') {
            newInv.harvested[code] = (newInv.harvested[code] || 0) + item.quantity;
          } else if (type === 'care' || type === 'water' || type === 'fertilizer' || type === '2' || type === '3') {
            if (code === 'water') newInv.care.water = item.quantity;
            if (code === 'fertilizer') newInv.care.fertilizer = item.quantity;
          }
        }
        this.inventory.set(newInv);
      },
      error: () => {}
    });

    // 3. Tải Ô đất Nông trại
    this.api.getPlots().subscribe({
      next: (plotDtos: FarmPlotDto[]) => {
        if (plotDtos && plotDtos.length > 0) {
          const mappedPlots: FarmPlot[] = plotDtos.map(p => {
            const rawStatus = (p.status || 'empty').toLowerCase() as PlotStatus;
            return {
              id: p.id,
              index: p.plotIndex,
              status: rawStatus,
              crop: p.cropCode ? p.cropCode.toLowerCase() : undefined,
              isWatered: p.isWatered,
              growthProgress: p.growthProgress,
              plantedAt: p.plantedAt ? new Date(p.plantedAt) : undefined
            };
          });
          this.plots.set(mappedPlots);
        }
      },
      error: () => {}
    });

    // 4. Tải Danh sách Bài học (50+ chủ đề TOEIC)
    this.api.getLessons('en').subscribe({
      next: (lessonList: LessonDto[]) => {
        if (lessonList && lessonList.length > 0) {
          this.lessons.set(lessonList);
          
          // Chuyển 3 bài học đầu thành 3 Planner Book trên Home Dashboard
          const top3 = lessonList.slice(0, 3);
          const colors = ['#78815D', '#A65E65', '#344B5E'];
          const modules = ['Vocabulary', 'Grammar', 'Listening'];

          const mappedBooks: PlannerBook[] = top3.map((l, idx) => ({
            id: `b_${l.id}`,
            title: l.title,
            moduleType: modules[idx % 3],
            coverColor: colors[idx % 3],
            learned: idx === 0 ? 5 : 0,
            total: 20,
            unlocked: l.isUnlocked,
            unlockCondition: l.requiredCropName ? `Cần ${l.requiredCropQty} ${l.requiredCropName}` : 'Mở sẵn',
            note: `${l.levelTag} - Bài #${l.orderIndex}`
          }));

          this.books.set(mappedBooks);
          this.activeLessonId.set(lessonList[0].id);
          this.loadVocabulariesForLesson(lessonList[0].id);
          this.showToast('🌾 Đã đồng bộ 51 bài học từ Database Backend!');
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  loadVocabulariesForLesson(lessonId: number) {
    this.activeLessonId.set(lessonId);

    // 1. Nạp ngay từ danh mục từ vựng trong localStorage (Hoạt động offline hoàn hảo trên GitHub Pages)
    const localList = this.vocabulariesByLesson()[lessonId];
    if (localList && localList.length > 0) {
      this.activeVocabularies.set(localList);
    }

    // 2. Thử cập nhật từ Backend nếu có API
    this.api.getVocabularies(lessonId).subscribe({
      next: (vocabs) => {
        if (vocabs && vocabs.length > 0) {
          this.activeVocabularies.set(vocabs);
          this.vocabulariesByLesson.update(map => ({
            ...map,
            [lessonId]: vocabs
          }));
          this.saveToStorage();
        }
      },
      error: () => {}
    });
  }

  findJapaneseVocab(wordOrId: string | number): { vocab: VocabularyDto; topicId: string } | null {
    const isNum = typeof wordOrId === 'number';
    const numId = isNum ? wordOrId : Number(wordOrId);
    const text = typeof wordOrId === 'string' ? wordOrId.trim() : '';

    for (const topic of N5_SEED.topics) {
      const found = topic.words.find((w: any) => {
        if (!isNaN(numId) && w.id === numId) return true;
        if (text && (w.scriptPrimary === text || w.readingSub === text || w.romaji?.toLowerCase() === text.toLowerCase())) return true;
        return false;
      });
      if (found) {
        return {
          vocab: {
            id: found.id,
            lessonId: Number(topic.code.replace(/\D/g, '')) || 1,
            word: found.scriptPrimary,
            phonetic: found.readingSub ? `[${found.readingSub}]` : `[${found.romaji}]`,
            meaningVi: found.meaningVi,
            wordType: found.wordType,
            exampleEn: found.readingSub ? `${found.scriptPrimary} (${found.readingSub})` : found.scriptPrimary,
            exampleVi: found.meaningVi,
            audioUrl: found.scriptPrimary
          } as any,
          topicId: topic.code
        };
      }
    }
    return null;
  }

  findVocab(wordOrId: string | number): { vocab: VocabularyDto; topicId: string } | null {
    // 1. Nếu đang ở mode Tiếng Nhật hoặc wordOrId nằm trong dải N5 (1000..2000)
    if (this.activeLang() === 'ja' || (typeof wordOrId === 'number' && wordOrId >= 1000 && wordOrId <= 2000)) {
      const jaFound = this.findJapaneseVocab(wordOrId);
      if (jaFound) return jaFound;
    }

    // 2. Tra cứu từ vựng Tiếng Anh TOEIC
    const map = this.vocabulariesByLesson();
    for (const [topicId, list] of Object.entries(map)) {
      if (typeof wordOrId === 'number') {
        const found = list.find(v => v.id === wordOrId);
        if (found) return { vocab: found, topicId };
      } else {
        const lower = wordOrId.trim().toLowerCase();
        const found = list.find(v => v.word.trim().toLowerCase() === lower);
        if (found) return { vocab: found, topicId };
      }
    }

    // 3. Fallback tra cứu trong bộ Tiếng Nhật nếu Tiếng Anh không có
    return this.findJapaneseVocab(wordOrId);
  }

  getAllVocabsForActiveLanguage(): VocabularyDto[] {
    if (this.activeLang() === 'ja') {
      return (N5_SEED.topics as any[]).flatMap(t => t.words.map((w: any) => ({
        id: w.id,
        lessonId: Number(t.code.replace(/\D/g, '')) || 1,
        word: w.scriptPrimary,
        phonetic: w.readingSub ? `[${w.readingSub}]` : `[${w.romaji}]`,
        meaningVi: w.meaningVi,
        wordType: w.wordType,
        exampleEn: w.readingSub ? `${w.scriptPrimary} (${w.readingSub})` : w.scriptPrimary,
        exampleVi: w.meaningVi
      } as unknown as VocabularyDto)));
    }
    return Object.values(DEFAULT_VOCABULARIES).flat();
  }

  recordDailyTaskActivity(type: 'vocab' | 'quiz' | 'care', amount: number = 1) {
    const today = getTodayVnDate();
    this.dailyTaskState.update(prev => {
      const isToday = prev.date === today;
      return {
        date: today,
        vocabLearned: (isToday ? prev.vocabLearned : 0) + (type === 'vocab' ? amount : 0),
        quizDone: (isToday ? prev.quizDone : 0) + (type === 'quiz' ? amount : 0),
        farmCare: (isToday ? prev.farmCare : 0) + (type === 'care' ? amount : 0)
      };
    });

    if (type === 'vocab' || type === 'quiz') {
      this.updateStudyStreak();
    }
  }

  updateStudyStreak() {
    const today = getTodayVnDate();
    const last = this.lastStudyDate();
    if (last === today) return;

    if (!last) {
      this.studyStreak.set(1);
      this.lastStudyDate.set(today);
    } else {
      const yesterday = addDays(today, -1);
      if (last === yesterday) {
        this.studyStreak.update(s => s + 1);
      } else {
        this.studyStreak.set(1);
      }
      this.lastStudyDate.set(today);
    }
  }

  markWordLearned(word: string, notify: boolean = false, vocabId?: number, topicId?: string) {
    if (!this.learnedWords().includes(word)) {
      this.learnedWords.update(list => [...list, word]);
      if (notify) {
        this.showToast(`✓ Đã thuộc từ "${word}"`);
      }
    }

    let targetVocabId = vocabId;
    let targetTopicId = topicId;
    if (!targetVocabId || !targetTopicId) {
      const info = this.findVocab(word);
      if (info) {
        targetVocabId = info.vocab.id;
        targetTopicId = info.topicId;
      }
    }

    if (targetVocabId) {
      const currentReviews = this.userVocabReviews();
      if (!currentReviews[targetVocabId]) {
        const today = getTodayVnDate();
        const newReview: UserVocabReview = {
          vocabId: targetVocabId,
          word,
          topicId: targetTopicId || '1',
          learnedDate: today,
          stage: 0,
          nextReviewDate: addDays(today, 1),
          lastReviewedDate: today,
          d1Done: false,
          d3Done: false,
          d7Done: false,
          d14Done: false
        };
        this.userVocabReviews.update(m => ({ ...m, [targetVocabId!]: newReview }));
      }
    }

    this.recordDailyTaskActivity('vocab', 1);
    this.emitQuestEvent('VOCAB_LEARNED', String(targetVocabId || word));
    this.saveToStorage();
  }

  completeReviewQuizSession(
    reviewedWords: UserVocabReview[],
    firstTryResults: Map<number, boolean>
  ) {
    const today = getTodayVnDate();

    // Reset thưởng hàng ngày nếu sang ngày mới (UTC+7)
    if (this.lastReviewRewardDate() !== today) {
      this.dailyReviewRewardsClaimed.set(0);
      this.lastReviewRewardDate.set(today);
    }

    const currentClaimed = this.dailyReviewRewardsClaimed();
    const result = processReviewQuizCompletion(
      reviewedWords,
      firstTryResults,
      today,
      currentClaimed
    );

    // Cập nhật trạng thái chu kỳ Ebbinghaus
    this.userVocabReviews.update(map => {
      const next = { ...map };
      for (const item of result.updatedReviews) {
        next[item.vocabId] = item;
      }
      return next;
    });

    // Cấp bộ nguyên liệu kích hoạt cây (+1 Nước tưới & +1 Phân bón cơ bản)
    if (result.waterGained > 0) {
      this.inventory.update(inv => ({
        ...inv,
        care: {
          ...inv.care,
          water: inv.care.water + result.waterGained
        }
      }));
    }
    if (result.baseFertilizerGained > 0) {
      this.inventory.update(inv => ({
        ...inv,
        care: {
          ...inv.care,
          fertilizer: inv.care.fertilizer + result.baseFertilizerGained
        }
      }));
    }

    this.dailyReviewRewardsClaimed.set(result.nextDailyReviewRewardsClaimed);
    this.recordDailyTaskActivity('quiz', 1);
    this.emitQuestEvent('REVIEW_COMPLETED', today);
    this.saveToStorage();

    const firstTryCorrectCount = Array.from(firstTryResults.values()).filter(v => v).length;

    return {
      waterGained: result.waterGained,
      baseFertilizerGained: result.baseFertilizerGained,
      updatedReviews: result.updatedReviews,
      firstTryCorrectCount,
      totalQuestions: reviewedWords.length,
      claimedToday: result.nextDailyReviewRewardsClaimed
    };
  }

  getDueWordsForCohortAndStage(learnedDate: string, targetStage: ReviewStage, limit: number = 10): UserVocabReview[] {
    const today = getTodayVnDate();
    const words = Object.values(this.userVocabReviews()).filter(r =>
      r.learnedDate === learnedDate &&
      r.stage === targetStage - 1 &&
      r.nextReviewDate <= today
    );
    return words.slice(0, limit);
  }

  getAllDueWordsBatch(limit: number = 10): UserVocabReview[] {
    return this.dueReviews().slice(0, limit);
  }

  /**
   * REBALANCED QUIZ & HYBRID REWARD ENGINE:
   * Rule 1: Strict Quiz-Only XP & Coins
   * Rule 2: Deterministic Base Rewards (3-Star Delta System)
   * Rule 3: Probabilistic Farm Drops (5% Phân bón & 1% mỗi loại Hạt giống có sẵn kèm Pity Counter & Daily Roll Cap)
   */
  recordQuizCompletion(lessonId: number, firstTryResults: Record<number, boolean>): QuizSubmitResultDto {
    const entries = Object.entries(firstTryResults);
    const totalQuestions = Math.max(10, entries.length);
    const firstTryCorrectCount = entries.filter(([_, isOk]) => isOk).length;

    const currentProgress = this.userLessonProgress()[lessonId];
    const oldStars = currentProgress?.bestStarsClaimed || 0;
    const unlockedSeeds = this.getUnlockedSeedIds();
    const todayStr = new Date().toISOString().slice(0, 10);

    const rewardRes = calculateBalancedQuizReward(
      firstTryCorrectCount,
      totalQuestions,
      oldStars,
      unlockedSeeds,
      this.userRewardState(),
      todayStr
    );

    // Cập nhật UserRewardState (Pity counter & Daily cap)
    this.userRewardState.set(rewardRes.updatedRewardState);

    const isNewRecord = rewardRes.newStars > oldStars;
    let message = '';
    if (isNewRecord) {
      message = `Xuất sắc! Bạn đạt kỷ lục mới ${rewardRes.newStars}★ và nhận thưởng chênh lệch Nông trại!`;

      this.userLessonProgress.update(map => ({
        ...map,
        [lessonId]: {
          userId: 1,
          lessonId,
          bestScorePercent: Math.round((firstTryCorrectCount / totalQuestions) * 100),
          bestStarsClaimed: rewardRes.newStars,
          firstPassedAt: currentProgress?.firstPassedAt || new Date().toISOString()
        }
      }));

      this.lessons.update(list => list.map(l => {
        if (l.id === lessonId) {
          return { ...l, bestStarsClaimed: rewardRes.newStars, isUnlocked: true };
        }
        return l;
      }));
    } else {
      message = `Bạn đã hoàn thành phiên ôn tập ${rewardRes.newStars}★! Giữ vững thành tích cũ ${oldStars}★.`;
    }

    // Rule 1, 2 & 3: Cập nhật XP & Coins (Strict Quiz-Only XP & Coins qua Delta, Level-up reset XP)
    if (rewardRes.xpGained > 0) {
      const levelRes = applyXpWithReset(this.level(), this.currentXp(), rewardRes.xpGained);
      this.level.set(levelRes.level);
      this.currentXp.set(levelRes.currentXp);
      if (levelRes.leveledUp) {
        this.showToast(`🎉 CHÚC MỪNG! Bạn đã thăng cấp Level ${levelRes.level}!`);
      }
    }
    if (rewardRes.coinsGained > 0) this.coins.update(c => c + rewardRes.coinsGained);

    // Rule 3: Cập nhật Farm Drops (5% Phân bón & 1% Hạt giống có sẵn)
    let bonusSeedName: string | null = null;
    if (rewardRes.seedGainedId) {
      const cropConfig = CROP_CATALOG.find(c => c.id === rewardRes.seedGainedId);
      bonusSeedName = cropConfig ? cropConfig.nameVi : rewardRes.seedGainedId;

      this.inventory.update(inv => ({
        ...inv,
        seeds: {
          ...inv.seeds,
          [rewardRes.seedGainedId!]: (inv.seeds[rewardRes.seedGainedId!] || 0) + 1
        }
      }));
    }

    if (rewardRes.fertilizerGained > 0) {
      this.inventory.update(inv => ({
        ...inv,
        care: {
          ...inv.care,
          fertilizer: (inv.care.fertilizer || 0) + rewardRes.fertilizerGained
        }
      }));
    }

    if (rewardRes.speedFertilizerGained > 0) {
      this.inventory.update(inv => ({
        ...inv,
        care: {
          ...inv.care,
          speedFertilizer: (inv.care.speedFertilizer || 0) + rewardRes.speedFertilizerGained
        }
      }));
    }

    // Cập nhật UserWordStats cho toàn bộ từ trong phiên
    const nowIso = new Date().toISOString();
    this.userWordStats.update(stats => {
      const nextStats = { ...stats };
      for (const [vocabIdStr, isOk] of entries) {
        const vocabId = Number(vocabIdStr);
        const prev = nextStats[vocabId] || {
          userId: 1,
          vocabId,
          attempts: 0,
          wrongCount: 0,
          lastSeenAt: nowIso
        };
        nextStats[vocabId] = {
          ...prev,
          attempts: prev.attempts + 1,
          wrongCount: isOk ? prev.wrongCount : prev.wrongCount + 1,
          lastSeenAt: nowIso
        };
      }
      return nextStats;
    });

    if (rewardRes.newStars >= 2) {
      this.emitQuestEvent('QUIZ_PASSED_2STAR', `${lessonId}:${Date.now()}`);
    }

    this.saveToStorage();
    this.langContext.saveWorkspaceImmediately(this.activeLang(), this.serializeCurrentWorkspace());

    const lesson = this.lessons().find(l => l.id === lessonId);
    return {
      lessonId,
      stars: rewardRes.newStars,
      bestStarsClaimed: Math.max(oldStars, rewardRes.newStars),
      isNewRecord,
      totalQuestions,
      firstTryCorrectCount,
      correctAnswers: firstTryCorrectCount,
      scorePercent: Math.round((firstTryCorrectCount / totalQuestions) * 100),
      isPassed: true,
      rewardGranted: rewardRes.xpGained > 0 || rewardRes.coinsGained > 0 || rewardRes.fertilizerGained > 0 || !!rewardRes.seedGainedId,
      rewardSeeds: rewardRes.seedGainedId ? 1 : 0,
      rewardWater: 0,
      rewardFertilizer: rewardRes.fertilizerGained,
      rewardCoins: rewardRes.coinsGained,
      rewardXp: rewardRes.xpGained,
      cropName: lesson?.requiredCropName || 'Cà rốt',
      message,
      bonusSeedId: rewardRes.seedGainedId,
      bonusSeedName,
      isMaxStarsAlready: rewardRes.isMaxStarsAlready,
      dailyBonusRollsUsed: rewardRes.updatedRewardState.dailyBonusRollsUsed,
      pityFertilizerMisses: rewardRes.updatedRewardState.pityFertilizerMisses,
      pitySeedMisses: rewardRes.updatedRewardState.pitySeedMisses
    };
  }

  toggleBookmark(word: string) {
    if (this.bookmarkedWords().includes(word)) {
      this.bookmarkedWords.update(list => list.filter(w => w !== word));
      this.showToast(`Đã bỏ đánh dấu "${word}"`);
    } else {
      this.bookmarkedWords.update(list => [...list, word]);
      this.showToast(`🔖 Đã lưu "${word}" vào sổ tay ghi nhớ!`);
    }
    this.saveToStorage();
  }

  refreshProfile() {
    this.initFromApi();
  }

  // Cập nhật trạng thái thời gian thực cho toàn bộ các ô đất (Rule 1 & Rule 4)
  recalculatePlotStates() {
    const offset = this.serverClockOffsetMs();
    let hasChanged = false;

    const updated = this.plots().map(p => {
      const status = (p.status || '').toLowerCase();
      if (status === 'locked' || status === 'empty' || !p.crop) {
        return p;
      }

      const cropConfig = CROP_CATALOG.find(c => c.id === p.crop);
      const growthMinutes = cropConfig?.growthMinutes || 5;

      let harvestUtc = p.harvestableAtUtc;
      let plantedUtc = p.plantedAtUtc;

      // Mandatory Care Gate: Nếu chưa đủ cả Nước & Phân bón -> chưa có harvestableAtUtc -> giữ trạng thái 'seeded'
      if (!harvestUtc) {
        if (p.status !== 'seeded' || p.growthProgress !== 0) {
          hasChanged = true;
          return {
            ...p,
            status: 'seeded' as PlotStatus,
            growthProgress: 0
          };
        }
        return p;
      }

      const countdown = computePlotCountdown(plantedUtc, harvestUtc, growthMinutes, offset, !!p.isWatered, !!p.isFertilized);
      if (p.status !== countdown.status || p.growthProgress !== countdown.progress) {
        hasChanged = true;
        return {
          ...p,
          plantedAtUtc: plantedUtc,
          harvestableAtUtc: harvestUtc,
          status: countdown.status as PlotStatus,
          growthProgress: countdown.progress
        };
      }
      return p;
    });

    if (hasChanged) {
      this.plots.set(updated);
    }
  }

  // Farm Actions
  plantSeed(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    if (status !== 'empty') {
      this.showToast('Ô đất không trống để gieo hạt!');
      return;
    }
    const seed = this.selectedSeed();
    if (!this.isCropUnlocked(seed)) {
      const lockInfo = this.getCropLockInfo(seed);
      this.showToast(`🔒 Hạt giống này đang bị khóa! ${lockInfo.missingReasons.join(' & ')}`);
      return;
    }
    const currentQty = this.inventory().seeds[seed] || 0;
    if (currentQty <= 0) {
      this.showToast(`Bạn đã hết hạt giống ${seed}! Hãy ghé Cửa hàng.`);
      return;
    }

    const cropConfig = CROP_CATALOG.find(c => c.id === seed);
    const growthMinutes = cropConfig?.growthMinutes || 5;
    const nowMs = Date.now() + this.serverClockOffsetMs();
    const now = new Date(nowMs);
    const plantedAtUtc = now.toISOString();

    // Trừ hạt giống cục bộ
    this.inventory.update(inv => ({
      ...inv,
      seeds: { ...inv.seeds, [seed]: currentQty - 1 }
    }));

    // Cập nhật ô đất: Mandatory Care Gate -> status = 'seeded', harvestableAtUtc = null
    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      status: 'seeded',
      crop: seed,
      isWatered: false,
      isFertilized: false,
      growthProgress: 0,
      plantedAt: now,
      plantedAtUtc,
      growthStartedAtUtc: undefined,
      harvestableAtUtc: undefined
    } : p));

    this.saveToStorage();
    this.emitQuestEvent('FARM_CARE_ACTION', `plant:${plotIndex}:${Date.now()}`);
    this.showToast(`🌱 Đã gieo ${cropConfig?.nameVi || seed}! Cần tưới nước & bón phân cơ bản để kích hoạt tính giờ (${growthMinutes} phút).`);

    // Gửi lên Backend API nếu đang online
    if (this.isApiConnected()) {
      this.api.plantCrop(plotIndex, seed).subscribe({
        error: (err) => console.warn('Lỗi ghi nhận gieo hạt lên backend:', err)
      });
    }
  }

  waterPlot(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    if (status === 'locked' || status === 'empty' || !plot.crop) {
      this.showToast('Ô đất này không có cây cần tưới!');
      return;
    }

    if (status !== 'seeded') {
      this.showToast('Cây đã bắt đầu sinh trưởng! Dùng Phân bón tăng tốc nếu muốn giảm thời gian.');
      return;
    }

    if (plot.isWatered) {
      this.showToast('Ô đất này đã được tưới nước rồi!');
      return;
    }

    if (this.inventory().care.water <= 0) {
      this.showToast('Bạn đã hết nước tưới! Mua thêm tại Cửa hàng.');
      return;
    }

    // Trừ 1 nước tưới
    this.inventory.update(inv => ({
      ...inv,
      care: { ...inv.care, water: Math.max(0, inv.care.water - 1) }
    }));

    const nowMs = Date.now() + this.serverClockOffsetMs();
    const now = new Date(nowMs);
    const cropConfig = CROP_CATALOG.find(c => c.id === plot.crop);
    const growthMinutes = cropConfig?.growthMinutes || 5;

    const bothReady = !!plot.isFertilized; // nếu đã bón phân thì kích hoạt luôn

    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      isWatered: true,
      growthStartedAtUtc: bothReady ? now.toISOString() : undefined,
      harvestableAtUtc: bothReady ? new Date(nowMs + growthMinutes * 60 * 1000).toISOString() : undefined,
      status: bothReady ? 'growing' : 'seeded',
      growthProgress: bothReady ? 1 : 0
    } : p));

    this.recordDailyTaskActivity('care', 1);
    this.emitQuestEvent('FARM_CARE_ACTION', `water:${plotIndex}:${Date.now()}`);
    this.saveToStorage();
    if (bothReady) {
      this.showToast(`💧 Đã tưới nước! Đủ cả Nước & Phân bón, cây bắt đầu nảy mầm tính giờ!`);
    } else {
      this.showToast(`💧 Đã tưới nước cho ô #${plotIndex + 1}! Hãy bón phân cơ bản để bắt đầu tính giờ.`);
    }

    if (this.isApiConnected()) {
      this.api.applyCare(plotIndex, 'water').subscribe({
        next: () => this.refreshProfile(),
        error: (err) => console.warn('Lỗi ghi nhận tưới nước lên backend:', err)
      });
    }
  }

  fertilizePlot(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    if (status === 'locked' || status === 'empty' || !plot.crop) {
      this.showToast('Ô đất này không có cây cần bón phân!');
      return;
    }

    if (status !== 'seeded') {
      this.showToast('Cây đã bắt đầu sinh trưởng! Dùng Phân bón tăng tốc nếu muốn giảm thời gian.');
      return;
    }

    if (plot.isFertilized) {
      this.showToast('Ô đất này đã được bón phân rồi!');
      return;
    }

    if (this.inventory().care.fertilizer <= 0) {
      this.showToast('Bạn đã hết Phân bón cơ bản! Mua thêm tại Cửa hàng.');
      return;
    }

    // Trừ 1 phân bón cơ bản
    this.inventory.update(inv => ({
      ...inv,
      care: { ...inv.care, fertilizer: Math.max(0, inv.care.fertilizer - 1) }
    }));

    const nowMs = Date.now() + this.serverClockOffsetMs();
    const now = new Date(nowMs);
    const cropConfig = CROP_CATALOG.find(c => c.id === plot.crop);
    const growthMinutes = cropConfig?.growthMinutes || 5;

    const bothReady = !!plot.isWatered; // nếu đã tưới nước thì kích hoạt luôn

    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      isFertilized: true,
      growthStartedAtUtc: bothReady ? now.toISOString() : undefined,
      harvestableAtUtc: bothReady ? new Date(nowMs + growthMinutes * 60 * 1000).toISOString() : undefined,
      status: bothReady ? 'growing' : 'seeded',
      growthProgress: bothReady ? 1 : 0
    } : p));

    this.recordDailyTaskActivity('care', 1);
    this.emitQuestEvent('FARM_CARE_ACTION', `fertilize:${plotIndex}:${Date.now()}`);
    this.saveToStorage();
    if (bothReady) {
      this.showToast(`✨ Đã bón phân cơ bản! Đủ cả Nước & Phân bón, cây bắt đầu nảy mầm tính giờ!`);
    } else {
      this.showToast(`✨ Đã bón phân cơ bản cho ô #${plotIndex + 1}! Hãy tưới nước để bắt đầu tính giờ.`);
    }

    if (this.isApiConnected()) {
      this.api.applyCare(plotIndex, 'fertilizer').subscribe({
        next: () => this.refreshProfile(),
        error: (err) => console.warn('Lỗi ghi nhận bón phân lên backend:', err)
      });
    }
  }

  speedFertilizePlot(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    const nowMs = Date.now() + this.serverClockOffsetMs();
    const harvestMs = plot.harvestableAtUtc ? new Date(plot.harvestableAtUtc).getTime() : nowMs;

    if (status !== 'growing' || !plot.harvestableAtUtc || nowMs >= harvestMs) {
      this.showToast('Phân bón tăng tốc chỉ dùng cho cây đang trong thời gian sinh trưởng.');
      return;
    }

    if ((this.inventory().care.speedFertilizer || 0) <= 0) {
      this.showToast('Bạn chưa có Phân bón tăng tốc! Nhận thưởng từ Quiz 2★+ hoặc mua tại Cửa hàng.');
      return;
    }

    // Trừ 1 phân bón tăng tốc
    this.inventory.update(inv => ({
      ...inv,
      care: { ...inv.care, speedFertilizer: Math.max(0, (inv.care.speedFertilizer || 0) - 1) }
    }));

    // Giảm 10 phút (-10' per use theo thiết kế cân bằng cây 15m–240m)
    const newHarvestMs = Math.max(nowMs, harvestMs - 10 * 60 * 1000);
    const isReady = newHarvestMs <= nowMs;
    const updatedHarvestableAtUtc = new Date(newHarvestMs).toISOString();

    const cropConfig = CROP_CATALOG.find(c => c.id === plot.crop);
    const growthMinutes = cropConfig?.growthMinutes || 20;
    const totalSec = Math.max(1, growthMinutes * 60);
    const remainingSec = Math.max(0, Math.ceil((newHarvestMs - nowMs) / 1000));
    const progress = isReady ? 100 : Math.min(99, Math.max(1, Math.floor(((totalSec - remainingSec) / totalSec) * 100)));

    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      harvestableAtUtc: updatedHarvestableAtUtc,
      status: isReady ? 'ready' : 'growing',
      growthProgress: progress
    } : p));

    this.recordDailyTaskActivity('care', 1);
    this.emitQuestEvent('FARM_CARE_ACTION', `speedFertilize:${plotIndex}:${Date.now()}`);
    this.saveToStorage();
    if (isReady) {
      this.showToast(`⚡ Đã dùng Phân bón tăng tốc (-10 phút)! Cây đã chín ngay lập tức.`);
    } else {
      this.showToast(`⚡ Đã dùng Phân bón tăng tốc (-10 phút) cho ô #${plotIndex + 1}!`);
    }

    if (this.isApiConnected()) {
      this.api.applyCare(plotIndex, 'speed_fertilizer').subscribe({
        next: () => this.refreshProfile(),
        error: (err) => console.warn('Lỗi ghi nhận phân bón tăng tốc lên backend:', err)
      });
    }
  }

  harvestPlot(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    const nowMs = Date.now() + this.serverClockOffsetMs();
    const isReady = status === 'ready' || (plot.harvestableAtUtc && new Date(plot.harvestableAtUtc).getTime() <= nowMs);

    if (!isReady || !plot.crop) {
      this.showToast('Cây chưa chín để thu hoạch!');
      return;
    }

    const cropKey = plot.crop;
    const cropConfig = CROP_CATALOG.find(c => c.id === cropKey);
    const gainedCoins = cropConfig ? Math.round(cropConfig.price * 1.5) : 15;
    const gainedXp = cropConfig ? cropConfig.price * 2 : 20;

    // Tăng XP, Coins
    this.addXp(gainedXp);
    this.coins.update(c => c + gainedCoins);

    // Cộng nông sản
    this.inventory.update(inv => ({
      ...inv,
      harvested: {
        ...inv.harvested,
        [cropKey]: (inv.harvested[cropKey] || 0) + 1
      }
    }));

    // Ghi nhận vụ mùa vào Global Profile (Synergy Gamification)
    this.langContext.recordHarvest();
    this.langContext.recordDailyStudy();

    // Đưa ô đất về trạng thái Empty hoàn chỉnh
    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      status: 'empty',
      crop: undefined,
      isWatered: false,
      isFertilized: false,
      growthProgress: 0,
      plantedAt: undefined,
      plantedAtUtc: undefined,
      growthStartedAtUtc: undefined,
      harvestableAtUtc: undefined
    } : p));

    this.saveToStorage();
    this.emitQuestEvent('CROP_HARVESTED', `harvest:${plotIndex}:${Date.now()}`);
    this.showToast(`✨ Thu hoạch ${cropConfig?.nameVi || 'nông sản'} thành công! +${gainedXp} XP, +${gainedCoins} Xu 🪙`);

    if (this.isApiConnected()) {
      this.api.harvestPlot(plotIndex).subscribe({
        next: () => this.refreshProfile(),
        error: (err) => console.warn('Lỗi ghi nhận thu hoạch lên backend:', err)
      });
    }
  }

  // Cart & Shop
  addToCart(item: ShopItem) {
    if (item.cat === 'seeds' && item.cropKey && !this.isCropUnlocked(item.cropKey)) {
      const lockInfo = this.getCropLockInfo(item.cropKey);
      this.showToast(`🔒 Hạt giống "${item.name}" đang bị khóa! ${lockInfo.missingReasons.join(' & ')}`);
      return;
    }

    this.cart.update(list => {
      const existing = list.find(c => c.item.id === item.id);
      if (existing) {
        return list.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...list, { item, qty: 1 }];
    });
    this.showToast(`Đã thêm "${item.name}" vào giỏ hàng`);
  }

  checkoutCart() {
    const total = this.cartTotal();
    if (this.coins() < total) {
      this.showToast(`Không đủ Xu! Cần ${total} Xu, bạn có ${this.coins()} Xu.`);
      return false;
    }

    this.coins.update(c => c - total);

    // Bơm đồ vào kho
    this.cart().forEach(({ item, qty }) => {
      if (item.cat === 'seeds' && item.cropKey) {
        this.inventory.update(inv => ({
          ...inv,
          seeds: { ...inv.seeds, [item.cropKey!]: (inv.seeds[item.cropKey!] || 0) + qty }
        }));
      } else if (item.id === 'c_water') {
        this.inventory.update(inv => ({
          ...inv,
          care: { ...inv.care, water: inv.care.water + (qty * 3) }
        }));
      } else if (item.id === 'c_fert') {
        this.inventory.update(inv => ({
          ...inv,
          care: { ...inv.care, fertilizer: inv.care.fertilizer + qty }
        }));
      } else if (item.id === 'c_speed_fert') {
        this.inventory.update(inv => ({
          ...inv,
          care: { ...inv.care, speedFertilizer: (inv.care.speedFertilizer || 0) + qty }
        }));
      }
    });

    this.cart.set([]);
    this.showToast(`🎉 Thanh toán thành công! Trừ ${total} Xu.`);
    return true;
  }

  speak(text: string, forceLang?: string) {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      const isJa = forceLang === 'ja-JP' || (this.activeLang() === 'ja' && forceLang !== 'en-US');
      u.lang = isJa ? 'ja-JP' : (forceLang || 'en-US');
      u.rate = isJa ? 0.85 : 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  }
}
