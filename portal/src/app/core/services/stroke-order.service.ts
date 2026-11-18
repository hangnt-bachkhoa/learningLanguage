import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

export interface StrokeGradingResult {
  pass: boolean;
  reason?: string;
  meanDist?: number;
}

export function extractPointsFromSvgPath(d: string, sampleCount = 16): [number, number][] {
  if (typeof document === 'undefined') return [];
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  const len = path.getTotalLength();
  if (len <= 0) return [];
  const pts: [number, number][] = [];
  for (let i = 0; i < sampleCount; i++) {
    const pt = path.getPointAtLength((i / (sampleCount - 1)) * len);
    pts.push([pt.x, pt.y]); // 0..109 KanjiVG space
  }
  return pts;
}

export function resampleUserPoints(pts: [number, number][], sampleCount = 16): [number, number][] {
  if (pts.length === 0) return [];
  if (pts.length === 1) return Array(sampleCount).fill(pts[0]);

  const dists: number[] = [0];
  let totalLen = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    totalLen += Math.hypot(dx, dy);
    dists.push(totalLen);
  }
  if (totalLen === 0) return Array(sampleCount).fill(pts[0]);

  const step = totalLen / (sampleCount - 1);
  const resampled: [number, number][] = [pts[0]];
  let curIdx = 0;

  for (let i = 1; i < sampleCount - 1; i++) {
    const targetDist = i * step;
    while (curIdx < dists.length - 1 && dists[curIdx + 1] < targetDist) {
      curIdx++;
    }
    const segmentLen = dists[curIdx + 1] - dists[curIdx];
    if (segmentLen <= 0.0001) {
      resampled.push(pts[curIdx]);
    } else {
      const t = (targetDist - dists[curIdx]) / segmentLen;
      const x = pts[curIdx][0] + t * (pts[curIdx + 1][0] - pts[curIdx][0]);
      const y = pts[curIdx][1] + t * (pts[curIdx + 1][1] - pts[curIdx][1]);
      resampled.push([x, y]);
    }
  }
  resampled.push(pts[pts.length - 1]);
  return resampled;
}

function dist(p1: [number, number], p2: [number, number]): number {
  return Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
}

const STORAGE_KEY = 'language_farm_writing_ja_v1';

@Injectable({
  providedIn: 'root'
})
export class StrokeOrderService {
  private readonly http = inject(HttpClient);

  readonly strokesDb = signal<Record<string, string[]>>({});
  readonly isLoaded = signal<boolean>(false);
  readonly writeSuccessCounts = signal<Record<string, number>>(this.loadSuccessCounts());

  constructor() {
    this.loadDatabase();
  }

  loadDatabase(): void {
    this.http.get<Record<string, string[]>>('assets/data/n5_strokes.json')
      .pipe(
        tap(data => {
          this.strokesDb.set(data || {});
          this.isLoaded.set(true);
        }),
        catchError(err => {
          console.warn('Could not load n5_strokes.json:', err);
          this.isLoaded.set(true);
          return of({});
        })
      )
      .subscribe();
  }

  hasChar(ch: string): boolean {
    return !!this.strokesDb()[ch];
  }

  getStrokes(ch: string): string[] | null {
    return this.strokesDb()[ch] || null;
  }

  getCharactersInWord(word: string): string[] {
    if (!word) return [];
    const all = Array.from(word);
    return all.filter(ch => this.hasChar(ch));
  }

  gradeStroke(userRawPoints: [number, number][], strokeSvgPath: string): StrokeGradingResult {
    if (userRawPoints.length < 2) {
      return { pass: false, reason: 'Nét viết quá ngắn, hãy vẽ trọn vẹn nét.' };
    }

    const u = resampleUserPoints(userRawPoints, 16);
    const r = extractPointsFromSvgPath(strokeSvgPath, 16);
    if (r.length < 16) {
      return { pass: true };
    }

    // 1. Reverse-Direction Check
    const forwardEndpointDist = dist(u[0], r[0]) + dist(u[15], r[15]);
    const reverseEndpointDist = dist(u[0], r[15]) + dist(u[15], r[0]);
    if (reverseEndpointDist < forwardEndpointDist - 16) {
      return { pass: false, reason: 'Viết ngược chiều! Hãy bắt đầu từ chấm đỏ.' };
    }

    // 2. Endpoint Tolerance
    if (dist(u[0], r[0]) > 26 || dist(u[15], r[15]) > 28) {
      return { pass: false, reason: 'Chưa đúng điểm đầu/cuối của nét.' };
    }

    // 3. Shape Tolerance
    let sumDist = 0;
    for (let i = 0; i < 16; i++) {
      sumDist += dist(u[i], r[i]);
    }
    const meanDist = sumDist / 16;
    if (meanDist > 22) {
      return { pass: false, reason: 'Nét hơi lệch dáng mẫu, hãy thử lại.', meanDist };
    }

    return { pass: true, meanDist };
  }

  recordSuccess(ch: string): number {
    const cur = this.writeSuccessCounts();
    const nextCount = (cur[ch] || 0) + 1;
    const updated = { ...cur, [ch]: nextCount };
    this.writeSuccessCounts.set(updated);
    this.saveSuccessCounts(updated);
    return nextCount;
  }

  getSuccessCount(ch: string): number {
    return this.writeSuccessCounts()[ch] || 0;
  }

  isMastered(ch: string): boolean {
    return this.getSuccessCount(ch) >= 3;
  }

  playPronunciation(text: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  private loadSuccessCounts(): Record<string, number> {
    if (typeof localStorage === 'undefined') return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveSuccessCounts(data: Record<string, number>): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }
}
