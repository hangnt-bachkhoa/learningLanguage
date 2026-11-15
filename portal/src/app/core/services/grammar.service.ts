import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameStateService } from './game-state.service';
import {
  DEFAULT_GRAMMAR_TOPICS,
  GrammarTopic,
  UserGrammarProgress
} from '../constants/default-grammar-topics.constant';

export interface GrammarQuizSubmitResult {
  stars: number;
  bestStarsClaimed: number;
  isNewRecord: boolean;
  rewardXp: number;
  rewardCoins: number;
  firstTryCorrect: number;
  totalQuestions: number;
  scorePercent: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GrammarService {
  private http = inject(HttpClient);
  private state = inject(GameStateService);

  readonly STORAGE_KEY = 'english_farm_grammar_progress_v1';

  progressMap = signal<Record<string, UserGrammarProgress>>({});
  topics = signal<GrammarTopic[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    this.loadProgressFromStorage();
    this.loadTopics();

    // Tự động lưu tiến độ vào localStorage mỗi khi progressMap thay đổi
    effect(() => {
      const map = this.progressMap();
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(map));
      } catch (err) {
        console.warn('Không thể lưu tiến độ ngữ pháp vào localStorage', err);
      }
    });
  }

  loadProgressFromStorage(): void {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'object' && parsed !== null) {
          this.progressMap.set(parsed);
        }
      }
    } catch {
      this.progressMap.set({});
    }
  }

  loadTopics(): void {
    this.isLoading.set(true);
    const progress = this.progressMap();

    // 1. Chế độ Offline / Client-Side / Static GitHub Pages: Nạp từ hằng số
    const mergedStatic = DEFAULT_GRAMMAR_TOPICS.map(t => {
      const p = progress[t.code];
      return {
        ...t,
        isStudied: p?.isStudied ?? false,
        bestStars: p?.bestStars ?? 0,
        lastPracticedAt: p?.lastPracticedAt ?? null
      };
    });
    this.topics.set(mergedStatic);

    // 2. Chế độ Online: Nếu API Backend được kết nối, gọi GET /api/grammar/topics
    if (this.state.isApiConnected()) {
      this.http.get<any>('http://localhost:5000/api/grammar/topics').subscribe({
        next: (res) => {
          const list: GrammarTopic[] = res?.data || res || [];
          if (Array.isArray(list) && list.length > 0) {
            this.topics.set(list);
          }
          this.isLoading.set(false);
        },
        error: () => {
          // Giữ nguyên dữ liệu static đã nạp
          this.isLoading.set(false);
        }
      });
    } else {
      this.isLoading.set(false);
    }
  }

  getTopicByCode(code: string): GrammarTopic | undefined {
    return this.topics().find(t => t.code === code) || DEFAULT_GRAMMAR_TOPICS.find(t => t.code === code);
  }

  /**
   * Đánh dấu chuyên đề ngữ pháp là ĐÃ HỌC.
   * QUY TẮC CỐT LÕI: Tuyệt đối KHÔNG cộng XP và KHÔNG cộng Xu!
   */
  markAsStudied(code: string): void {
    const current = this.progressMap();
    const existing = current[code] || { isStudied: false, bestStars: 0 };

    this.progressMap.update(prev => ({
      ...prev,
      [code]: {
        ...existing,
        isStudied: true,
        lastPracticedAt: existing.lastPracticedAt || new Date().toISOString()
      }
    }));

    // Cập nhật lại signal topics
    this.topics.update(list =>
      list.map(t => (t.code === code ? { ...t, isStudied: true } : t))
    );

    this.state.showToast('📖 Đã đánh dấu "Đã học" chuyên đề ngữ pháp! (0 XP, 0 Xu)');

    if (this.state.isApiConnected()) {
      this.http.post<any>(`http://localhost:5000/api/grammar/topics/${code}/study`, {}).subscribe({
        error: (err) => console.warn('Lỗi đồng bộ study lên server:', err)
      });
    }
  }

  /**
   * Tính điểm và thưởng 3-Star Delta Rewards khi hoàn thành bài Quiz Ngữ pháp.
   * - 3 Sao (100%): 30 XP, 50 Xu
   * - 2 Sao (>= 80%): 20 XP, 35 Xu
   * - 1 Sao (< 80%): 10 XP, 20 Xu
   * Delta Reward: Chỉ cộng phần chênh lệch sao mới - sao cũ.
   */
  recordQuizCompletion(code: string, firstTryCorrect: number, totalQuestions: number): GrammarQuizSubmitResult {
    const total = totalQuestions > 0 ? totalQuestions : 1;
    const correct = Math.max(0, Math.min(total, firstTryCorrect));
    const accuracy = correct / total;
    const scorePercent = Math.round(accuracy * 100);

    let newStars = 1;
    if (accuracy >= 1.0) {
      newStars = 3;
    } else if (accuracy >= 0.8) {
      newStars = 2;
    }

    const currentMap = this.progressMap();
    const oldProgress = currentMap[code];
    const oldStars = oldProgress?.bestStars || 0;
    const isNewRecord = newStars > oldStars;

    let deltaXp = 0;
    let deltaCoins = 0;

    if (isNewRecord) {
      deltaXp = this.getTierXp(newStars) - this.getTierXp(oldStars);
      deltaCoins = this.getTierCoins(newStars) - this.getTierCoins(oldStars);

      // Áp dụng thưởng điểm kinh nghiệm và xu
      if (deltaXp > 0) {
        this.state.addXp(deltaXp);
      }
      if (deltaCoins > 0) {
        this.state.coins.update(c => c + deltaCoins);
      }
      this.state.saveToStorage();
    }

    const updatedBestStars = Math.max(oldStars, newStars);
    this.progressMap.update(prev => ({
      ...prev,
      [code]: {
        isStudied: true,
        bestStars: updatedBestStars,
        lastPracticedAt: new Date().toISOString()
      }
    }));

    // Cập nhật lại signal topics
    this.topics.update(list =>
      list.map(t =>
        t.code === code
          ? {
              ...t,
              isStudied: true,
              bestStars: updatedBestStars,
              lastPracticedAt: new Date().toISOString()
            }
          : t
      )
    );

    // Đồng bộ lên API nếu có backend
    if (this.state.isApiConnected()) {
      this.http.post<any>(`http://localhost:5000/api/grammar/topics/${code}/quiz/complete`, {
        firstTryCorrect: correct,
        totalQuestions: total
      }).subscribe({
        next: () => this.state.refreshProfile(),
        error: (err) => console.warn('Lỗi đồng bộ quiz grammar lên API:', err)
      });
    }

    return {
      stars: newStars,
      bestStarsClaimed: updatedBestStars,
      isNewRecord,
      rewardXp: deltaXp,
      rewardCoins: deltaCoins,
      firstTryCorrect: correct,
      totalQuestions: total,
      scorePercent,
      message: isNewRecord
        ? `Xuất sắc! Bạn đạt kỷ lục mới ${newStars} sao và nhận +${deltaXp} XP, +${deltaCoins} Xu!`
        : `Bạn hoàn thành đạt ${newStars} sao (${scorePercent}%). Giữ vững phong độ ôn tập!`
    };
  }

  private getTierXp(stars: number): number {
    switch (stars) {
      case 3: return 30;
      case 2: return 20;
      case 1: return 10;
      default: return 0;
    }
  }

  private getTierCoins(stars: number): number {
    switch (stars) {
      case 3: return 50;
      case 2: return 35;
      case 1: return 20;
      default: return 0;
    }
  }
}
