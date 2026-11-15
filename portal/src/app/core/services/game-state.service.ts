import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { FarmPlot, PlotStatus, UserInventory, PlannerBook, CartItem, ToastMessage, ShopItem } from '../models/game.models';
import { FarmApiService, LessonDto, VocabularyDto, FarmPlotDto, UserInventoryItemDto, QuizSubmitResultDto } from './farm-api.service';
import { CROP_CATALOG } from '../constants/crop-catalog.constant';
import { DEFAULT_VOCABULARIES } from '../constants/default-vocabularies.constant';
import { DEFAULT_LESSONS } from '../constants/default-lessons.constant';
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
        requiredCrops: [{ cropId: 'sunflower', qty: 2, cropNameVi: 'Hoa hướng dương' }]
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
  private api = inject(FarmApiService);

  // Trạng thái kết nối Backend
  isApiConnected = signal<boolean>(false);
  isLoading = signal<boolean>(false);

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
      carrot: 3,
      potato: 3,
      corn: 2,
      tomato: 2,
      strawberry: 3,
      sunflower: 3,
      rose: 3,
      tulip: 3,
      mango: 3,
      kiwi: 3,
      lemon: 3,
      apple: 3,
      cherry: 3
    },
    harvested: {
      carrot: 3,
      potato: 3,
      corn: 2,
      tomato: 2,
      strawberry: 1,
      sunflower: 1,
      rose: 0,
      tulip: 0,
      mango: 0,
      kiwi: 0,
      lemon: 0,
      apple: 1,
      cherry: 0
    },
    care: { water: 15, fertilizer: 5 },
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
  selectedTool = signal<'plant' | 'water' | 'fertilize' | 'harvest'>('plant');
  selectedSeed = signal<string>('carrot');

  // Thống kê từng từ (UserWordStats: attempts, wrongCount, lastSeenAt) cho Smart Pool Sampling
  userWordStats = signal<Record<number, UserWordStat>>({});

  // Tiến độ sao bài học (UserLessonProgress: bestStarsClaimed 0..3, bestScorePercent)
  userLessonProgress = signal<Record<number, UserLessonProgress>>({});

  // Trạng thái quay thưởng may mắn & bảo hiểm (UserRewardState: Pity counter & Daily cap)
  userRewardState = signal<UserRewardState>({
    pityFertilizerMisses: 0,
    pitySeedMisses: 0,
    dailyBonusRollsUsed: 0,
    lastBonusRollDate: ''
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

  showToast(text: string) {
    const id = Date.now();
    this.toasts.update(list => [...list, { id, text }]);
    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t.id !== id));
    }, 3200);
  }

  // =========================================================================
  // BỘ NHỚ LÂU DÀI: LOCALSTORAGE & SAO LƯU / KHÔI PHỤC JSON
  // =========================================================================

  saveToStorage() {
    try {
      const data = {
        version: 1,
        savedAt: new Date().toISOString(),
        level: this.level(),
        currentXp: this.currentXp(),
        xp: this.currentXp(),
        coins: this.coins(),
        plots: this.plots(),
        inventory: this.inventory(),
        lessons: this.lessons(),
        books: this.books(),
        activeLessonId: this.activeLessonId(),
        learnedWords: this.learnedWords(),
        bookmarkedWords: this.bookmarkedWords()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

      // Lưu trữ toàn bộ 1,300+ từ vựng vào localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(this.vocabulariesByLesson()));
        localStorage.setItem(this.WORD_STATS_KEY, JSON.stringify(this.userWordStats()));
        localStorage.setItem(this.LESSON_PROGRESS_KEY, JSON.stringify(this.userLessonProgress()));
        localStorage.setItem(this.REWARD_STATE_KEY, JSON.stringify(this.userRewardState()));
      }
    } catch (e) {
      console.warn('Không thể lưu localStorage:', e);
    }
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && typeof data === 'object') {
          if (typeof data.level === 'number') this.level.set(data.level);
          if (typeof data.currentXp === 'number') {
            this.currentXp.set(Math.min(1000, data.currentXp));
          } else if (typeof data.xp === 'number') {
            const req = xpRequiredForLevel(this.level());
            this.currentXp.set(Math.min(1000, data.xp >= req ? 0 : data.xp));
          }
          if (typeof data.coins === 'number') this.coins.set(data.coins);
          if (Array.isArray(data.plots) && data.plots.length > 0) this.plots.set(data.plots);
          if (data.inventory && typeof data.inventory === 'object') {
            this.inventory.update(current => ({
              seeds: { ...current.seeds, ...(data.inventory.seeds || {}) },
              harvested: { ...current.harvested, ...(data.inventory.harvested || {}) },
              care: { ...current.care, ...(data.inventory.care || {}) },
              decor: { ...current.decor, ...(data.inventory.decor || {}) }
            }));
          }
          if (Array.isArray(data.lessons) && data.lessons.length >= DEFAULT_LESSONS.length) {
            this.lessons.set(data.lessons);
          } else {
            // Nâng cấp đầy đủ 52 bài học, bảo lưu trạng thái sao và mở khóa của người chơi
            const savedList: LessonDto[] = Array.isArray(data.lessons) ? data.lessons : [];
            const savedMap = new Map<number, LessonDto>(savedList.map(l => [l.id, l]));
            const merged = DEFAULT_LESSONS.map(l => {
              const saved = savedMap.get(l.id);
              return saved ? {
                ...l,
                isUnlocked: saved.isUnlocked || l.isUnlocked,
                bestStarsClaimed: saved.bestStarsClaimed || l.bestStarsClaimed
              } : l;
            });
            this.lessons.set(merged);
          }
          if (Array.isArray(data.books) && data.books.length > 0) this.books.set(data.books);
          if (typeof data.activeLessonId === 'number') this.activeLessonId.set(data.activeLessonId);
          if (Array.isArray(data.learnedWords)) this.learnedWords.set(data.learnedWords);
          if (Array.isArray(data.bookmarkedWords)) this.bookmarkedWords.set(data.bookmarkedWords);
        }
      }

      // Nạp UserWordStats & UserLessonProgress
      const rawWordStats = localStorage.getItem(this.WORD_STATS_KEY);
      if (rawWordStats) {
        try {
          const parsed = JSON.parse(rawWordStats);
          if (parsed && typeof parsed === 'object') this.userWordStats.set(parsed);
        } catch {}
      }

      const rawProgress = localStorage.getItem(this.LESSON_PROGRESS_KEY);
      if (rawProgress) {
        try {
          const parsed = JSON.parse(rawProgress);
          if (parsed && typeof parsed === 'object') {
            this.userLessonProgress.set(parsed);
            // Đồng bộ lại BestStarsClaimed vào lessons signal
            this.lessons.update(list => list.map(l => {
              const p = parsed[l.id];
              return p ? { ...l, bestStarsClaimed: p.bestStarsClaimed } : l;
            }));
          }
        } catch {}
      }

      // Nạp UserRewardState (Pity Counter & Daily Rolls)
      const rawReward = localStorage.getItem(this.REWARD_STATE_KEY);
      if (rawReward) {
        try {
          const parsed = JSON.parse(rawReward);
          if (parsed && typeof parsed === 'object') {
            this.userRewardState.set({
              pityFertilizerMisses: parsed.pityFertilizerMisses || 0,
              pitySeedMisses: parsed.pitySeedMisses || 0,
              dailyBonusRollsUsed: parsed.dailyBonusRollsUsed || 0,
              lastBonusRollDate: parsed.lastBonusRollDate || ''
            });
          }
        } catch {}
      }

      // Nạp toàn bộ 52 bộ từ vựng từ localStorage (tự động hòa hợp nếu trước đó lưu thiếu)
      const rawVocabs = localStorage.getItem(this.VOCAB_STORAGE_KEY);
      if (rawVocabs) {
        try {
          const parsed = JSON.parse(rawVocabs);
          if (parsed && typeof parsed === 'object') {
            const savedKeys = Object.keys(parsed);
            const defaultKeys = Object.keys(DEFAULT_VOCABULARIES);
            if (savedKeys.length < defaultKeys.length) {
              const fullVocabs = { ...DEFAULT_VOCABULARIES, ...parsed };
              this.vocabulariesByLesson.set(fullVocabs);
              localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(fullVocabs));
            } else {
              this.vocabulariesByLesson.set(parsed);
            }
          }
        } catch {}
      } else {
        // Tự động lưu khởi tạo 52 bộ từ vựng vào localStorage để dùng hoàn toàn offline
        try {
          localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(DEFAULT_VOCABULARIES));
        } catch {}
      }
    } catch (e) {
      console.warn('Lỗi đọc localStorage:', e);
    }
  }

  exportBackupJson() {
    const data = {
      app: 'EnglishFarm',
      version: 1,
      exportedAt: new Date().toISOString(),
      xp: this.xp(),
      coins: this.coins(),
      level: this.level(),
      plots: this.plots(),
      inventory: this.inventory(),
      lessons: this.lessons(),
      books: this.books()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english-farm-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('💾 Đã tải file sao lưu english-farm-backup.json về máy!');
  }

  importBackupJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        throw new Error('Định dạng file không đúng');
      }
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
        carrot: 5, corn: 3, tomato: 0, sunflower: 0, rose: 0,
        tulip: 0, mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
      },
      harvested: {
        carrot: 0, corn: 0, tomato: 0, sunflower: 0, rose: 0,
        tulip: 0, mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
      },
      care: { water: 15, fertilizer: 3 },
      decor: { lamp: 0 }
    });
    this.lessons.set(DEFAULT_LESSONS);
    this.saveToStorage();
    this.showToast('🔄 Đã đặt lại trò chơi về trạng thái ban đầu!');
  }

  // =========================================================================
  // PHÂN CẤP HẠT GIỐNG & ĐIỀU KIỆN MỞ KHÓA
  // =========================================================================

  isCropUnlocked(cropId: string): boolean {
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    if (!crop) return true;
    // Cà rốt khởi đầu luôn mở sẵn
    if (crop.id === 'carrot' || crop.requiredXp === 0) return true;

    // 1. Kiểm tra điểm kinh nghiệm
    const hasXp = this.xp() >= crop.requiredXp;

    // 2. Kiểm tra chủ đề bài học tương ứng đã mở khóa
    let isTopicUnlocked = true;
    if (crop.requiredLessonId) {
      const lesson = this.lessons().find(l => l.id === crop.requiredLessonId);
      if (lesson) {
        isTopicUnlocked = lesson.isUnlocked;
      }
    }

    return hasXp && isTopicUnlocked;
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

    const isUnlocked = this.isCropUnlocked(cropId);
    const missingReasons: string[] = [];

    if (this.xp() < crop.requiredXp) {
      missingReasons.push(`Cần ${crop.requiredXp} XP (còn thiếu ${crop.requiredXp - this.xp()} XP)`);
    }

    if (crop.requiredLessonId) {
      const lesson = this.lessons().find(l => l.id === crop.requiredLessonId);
      if (!lesson || !lesson.isUnlocked) {
        missingReasons.push(`Mở khóa chủ đề "${crop.requiredLessonTitle || 'Tương ứng'}"`);
      }
    }

    return {
      isUnlocked,
      tier: crop.tier,
      tierName: crop.tierNameVi,
      requiredXp: crop.requiredXp,
      requiredLevel: crop.requiredLevel,
      requiredLessonTitle: crop.requiredLessonTitle,
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

    switch (lessonId) {
      case 1:
        return { minLevel: 1, requiredCrops: [] }; // Fruits & Vegetables: Mở sẵn
      case 2:
        return { minLevel: 2, requiredCrops: [{ cropId: 'carrot', qty: 3, cropNameVi: 'Cà rốt' }] }; // Animals
      case 3:
        return {
          minLevel: 3,
          requiredCrops: [
            { cropId: 'potato', qty: 3, cropNameVi: 'Khoai tây' },
            { cropId: 'corn', qty: 2, cropNameVi: 'Bắp ngô' }
          ]
        }; // Daily Routines
      case 4:
        return {
          minLevel: 4,
          requiredCrops: [
            { cropId: 'tomato', qty: 3, cropNameVi: 'Cà chua' },
            { cropId: 'strawberry', qty: 2, cropNameVi: 'Dâu tây' }
          ]
        }; // Food & Drinks
      case 5:
        return {
          minLevel: 5,
          requiredCrops: [
            { cropId: 'apple', qty: 2, cropNameVi: 'Táo' },
            { cropId: 'sunflower', qty: 2, cropNameVi: 'Hoa hướng dương' }
          ]
        }; // Nature & Weather
      default: {
        const minLvl = Math.min(20, Math.floor(lessonId / 2) + 2);
        const cropPool = [
          { cropId: 'tulip', qty: 2, cropNameVi: 'Hoa tulip' },
          { cropId: 'rose', qty: 2, cropNameVi: 'Hoa hồng' },
          { cropId: 'lemon', qty: 2, cropNameVi: 'Chanh' },
          { cropId: 'kiwi', qty: 2, cropNameVi: 'Kiwi' },
          { cropId: 'mango', qty: 2, cropNameVi: 'Xoài' },
          { cropId: 'cherry', qty: 2, cropNameVi: 'Cherry' }
        ];
        return {
          minLevel: minLvl,
          requiredCrops: [cropPool[(lessonId - 6) % cropPool.length]]
        };
      }
    }
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
    const unitPrice = Math.max(5, Math.floor((crop?.price || 15) * 0.7));
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
            carrot: 0, corn: 0, tomato: 0,
            sunflower: 0, rose: 0, tulip: 0,
            mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
          },
          harvested: {
            carrot: 0, corn: 0, tomato: 0,
            sunflower: 0, rose: 0, tulip: 0,
            mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
          },
          care: { water: 0, fertilizer: 0 },
          decor: {}
        };

        for (const item of items) {
          const type = (item.itemType || '').toLowerCase();
          const code = (item.itemCode || '').toLowerCase();
          if (type === 'seed' || type === '1') {
            newInv.seeds[code] = item.quantity;
          } else if (type === 'harvested' || type === 'harvestedcrop' || type === '4') {
            newInv.harvested[code] = item.quantity;
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
          this.showToast('🌾 Đã đồng bộ 52 bài học từ Database Backend!');
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

  markWordLearned(word: string, notify: boolean = false) {
    if (!this.learnedWords().includes(word)) {
      this.learnedWords.update(list => [...list, word]);
      if (notify) {
        this.showToast(`✓ Đã thuộc từ "${word}"`);
      }
    }
    this.saveToStorage();
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

    this.saveToStorage();

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

    // Trừ hạt giống cục bộ
    this.inventory.update(inv => ({
      ...inv,
      seeds: { ...inv.seeds, [seed]: currentQty - 1 }
    }));

    // Cập nhật ô đất cục bộ
    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      status: 'seeded',
      crop: seed,
      isWatered: false,
      growthProgress: 0,
      plantedAt: new Date()
    } : p));

    this.showToast(`🌱 Đã gieo hạt ${seed} vào ô đất #${plotIndex + 1}!`);

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
    if (status !== 'seeded' && status !== 'growing') {
      this.showToast('Ô đất này không có cây cần tưới!');
      return;
    }
    if (plot.growthProgress >= 100) {
      this.showToast('Cây đã chín rồi, hãy thu hoạch!');
      return;
    }
    if (this.inventory().care.water <= 0) {
      this.showToast('Bạn đã hết nước tưới! Mua thêm tại Cửa hàng.');
      return;
    }

    // Trừ nước cục bộ
    this.inventory.update(inv => ({
      ...inv,
      care: { ...inv.care, water: Math.max(0, inv.care.water - 1) }
    }));

    // Tăng trưởng
    this.plots.update(list => list.map((p, idx) => {
      if (idx !== plotIndex) return p;
      const newProgress = Math.min(100, p.growthProgress + 50);
      return {
        ...p,
        isWatered: true,
        status: newProgress >= 100 ? 'ready' : 'growing',
        growthProgress: newProgress
      };
    }));

    this.showToast(`💧 Đã tưới nước cho ô #${plotIndex + 1}! Cây lớn nhanh hơn.`);

    if (this.isApiConnected()) {
      this.api.waterPlot(plotIndex).subscribe({
        next: () => this.refreshProfile(),
        error: (err) => console.warn('Lỗi ghi nhận tưới nước lên backend:', err)
      });
    }
  }

  harvestPlot(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    if (status !== 'ready' || !plot.crop) {
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

    // Reset ô đất
    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      status: 'empty',
      crop: undefined,
      isWatered: false,
      growthProgress: 0
    } : p));

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
      }
    });

    this.cart.set([]);
    this.showToast(`🎉 Thanh toán thành công! Trừ ${total} Xu.`);
    return true;
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
    this.showToast(`🔊 Phát âm: "${text}"`);
  }
}
