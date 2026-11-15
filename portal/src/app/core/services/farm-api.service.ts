import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface UserProfileDto {
  id: number;
  fullName: string;
  email: string;
  xp: number;
  coins: number;
  level: number;
  createdAt: string;
}

export interface LessonDto {
  id: number;
  title: string;
  languageCode: string;
  levelTag: string;
  orderIndex: number;
  isUnlocked: boolean;
  requiredCropId: number | null;
  requiredCropQty: number;
  requiredCropName: string | null;
  bestStarsClaimed?: number;
}

export interface VocabularyDto {
  id: number;
  word: string;
  phonetic: string | null;
  ipaUs: string | null;
  ipaUk: string | null;
  wordType: string | null;
  meaningVi: string;
  exampleEn: string | null;
  exampleVi: string | null;
  spriteKey: string | null;
}

export interface FarmPlotDto {
  id: number;
  plotIndex: number;
  status: 'locked' | 'empty' | 'seeded' | 'growing' | 'ready';
  cropId: number | null;
  cropNameVi: string | null;
  cropCode: string | null;
  isWatered: boolean;
  growthProgress: number;
  plantedAt: string | null;
}

export interface UserInventoryItemDto {
  id: number;
  itemType: string; // 'seed' | 'harvested' | 'care'
  itemCode: string;
  quantity: number;
}

export interface QuizSubmitResultDto {
  lessonId: number;
  stars?: number;
  bestStarsClaimed?: number;
  isNewRecord?: boolean;
  totalQuestions: number;
  firstTryCorrectCount?: number;
  correctAnswers: number;
  scorePercent: number;
  isPassed: boolean;
  rewardGranted: boolean;
  rewardSeeds?: number;
  rewardWater?: number;
  rewardFertilizer?: number;
  rewardCoins: number;
  rewardXp: number;
  cropName?: string | null;
  message?: string;
}

export interface QuizSessionDto {
  sessionId: string;
  lessonId: number;
  lessonTitle: string;
  requiredCropName: string | null;
  bestStarsClaimed: number;
  totalQuestions: number;
  questions: QuizQuestionDto[];
}

export interface SubmitQuizPayload {
  lessonId: number;
  sessionId?: string;
  firstTryResults?: Record<number, boolean>;
  answers?: Record<number, number>;
  totalTries?: number;
}

export interface CompleteReviewResultDto {
  success: boolean;
  rewardXp: number;
  rewardCoins: number;
  rewardWater: number;
  rewardFertilizer: number;
  message: string;
}

export interface QuizQuestionDto {
  id: number;
  lessonId: number;
  prompt: string;
  word: string | null;
  phonetic: string | null;
  spriteKey?: string | null;
  questionType?: 'meaning' | 'context' | 'listening';
  exampleEn?: string | null;
  exampleVi?: string | null;
  options: string[];
  correctOptionIndex?: number;
}

export interface ShopProductDto {
  id: number;
  code: string;
  nameVi: string;
  category: string;
  priceCoins: number;
  description: string | null;
  spriteKey: string | null;
  effectValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class FarmApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api/v1';

  // 1. User
  getProfile(): Observable<UserProfileDto> {
    return this.http.get<ApiResponse<UserProfileDto>>(`${this.baseUrl}/user/profile`)
      .pipe(map(r => r.data));
  }

  // 2. Learning & Vocabularies
  getLessons(languageCode: string = 'en'): Observable<LessonDto[]> {
    return this.http.get<ApiResponse<LessonDto[]>>(`${this.baseUrl}/learning/lessons?languageCode=${languageCode}`)
      .pipe(map(r => r.data));
  }

  getVocabularies(lessonId: number): Observable<VocabularyDto[]> {
    return this.http.get<ApiResponse<VocabularyDto[]>>(`${this.baseUrl}/learning/lessons/${lessonId}/vocabularies`)
      .pipe(map(r => r.data));
  }

  getQuizQuestions(lessonId: number): Observable<QuizQuestionDto[]> {
    return this.http.get<ApiResponse<QuizQuestionDto[]>>(`${this.baseUrl}/learning/lessons/${lessonId}/quiz`)
      .pipe(map(r => r.data));
  }

  getQuizSession(lessonId: number): Observable<QuizSessionDto> {
    return this.http.get<ApiResponse<QuizSessionDto>>(`${this.baseUrl}/learning/lessons/${lessonId}/quiz-session`)
      .pipe(map(r => r.data));
  }

  submitQuiz(lessonId: number, answers: Record<number, number>): Observable<QuizSubmitResultDto> {
    return this.http.post<ApiResponse<QuizSubmitResultDto>>(`${this.baseUrl}/learning/quiz/submit`, {
      lessonId,
      answers
    }).pipe(map(r => r.data));
  }

  submitQuizSession(payload: SubmitQuizPayload): Observable<QuizSubmitResultDto> {
    return this.http.post<ApiResponse<QuizSubmitResultDto>>(`${this.baseUrl}/learning/quiz/submit`, payload)
      .pipe(map(r => r.data));
  }

  completeReview(lessonId: number, hardCount: number, goodCount: number, easyCount: number): Observable<CompleteReviewResultDto> {
    return this.http.post<ApiResponse<CompleteReviewResultDto>>(`${this.baseUrl}/learning/review/complete`, {
      lessonId,
      hardCount,
      goodCount,
      easyCount
    }).pipe(map(r => r.data));
  }

  // 3. Farm
  getPlots(): Observable<FarmPlotDto[]> {
    return this.http.get<ApiResponse<FarmPlotDto[]>>(`${this.baseUrl}/farm/plots`)
      .pipe(map(r => r.data));
  }

  plantCrop(plotIndex: number, cropCode: string): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/farm/plant`, {
      plotIndex,
      cropCode
    }).pipe(map(r => r.data));
  }

  waterPlot(plotIndex: number): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/farm/water/${plotIndex}`, {})
      .pipe(map(r => r.data));
  }

  harvestPlot(plotIndex: number): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/farm/harvest/${plotIndex}`, {})
      .pipe(map(r => r.data));
  }

  getInventory(): Observable<UserInventoryItemDto[]> {
    return this.http.get<ApiResponse<UserInventoryItemDto[]>>(`${this.baseUrl}/farm/inventory`)
      .pipe(map(r => r.data));
  }

  // 4. Shop
  getProducts(category?: string): Observable<ShopProductDto[]> {
    const url = category ? `${this.baseUrl}/shop/products?category=${category}` : `${this.baseUrl}/shop/products`;
    return this.http.get<ApiResponse<ShopProductDto[]>>(url)
      .pipe(map(r => r.data));
  }

  checkout(items: Array<{ productId: number; quantity: number }>): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/shop/checkout`, { items })
      .pipe(map(r => r.data));
  }
}
