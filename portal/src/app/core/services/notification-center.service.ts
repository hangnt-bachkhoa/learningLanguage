import { Injectable, inject, signal, computed, effect, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from './game-state.service';
import { DailyQuestService } from './daily-quest.service';
import { CROP_CATALOG } from '../constants/crop-catalog.constant';

export interface NotificationAlert {
  id: string;
  type: 'crop' | 'review' | 'quest';
  title: string;
  message: string;
  route: string;
  iconName: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationCenterService implements OnDestroy {
  private readonly gameState = inject(GameStateService);
  private readonly dailyQuestService = inject(DailyQuestService);
  private readonly router = inject(Router);

  // Set theo dõi các ô đất đã gửi Web Notification trong phiên mở app hiện tại
  private readonly notifiedPlotKeys = new Set<string>();
  private harvestCheckTimer: ReturnType<typeof setInterval> | null = null;

  // Trạng thái quyền Web Notification của trình duyệt
  readonly permission = signal<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default'
  );

  // Danh sách các thông báo tự động tổng hợp theo Reactive Signals
  readonly alerts = computed<NotificationAlert[]>(() => {
    const list: NotificationAlert[] = [];

    // 1. Ready Crops (Cây trồng đã chín cần thu hoạch)
    const plots = this.gameState.plots();
    for (const plot of plots) {
      if (plot.status === 'ready') {
        const cropName = this.getCropNameVi(plot.crop);
        list.push({
          id: `crop-ready-${plot.id}`,
          type: 'crop',
          title: 'Cây trồng chín',
          message: `${cropName} ở ô #${plot.index + 1} đã chín — Thu hoạch ngay!`,
          route: '/farm',
          iconName: 'icon_sprout_action',
          timestamp: new Date()
        });
      }
    }

    // 2. Due Ebbinghaus Reviews (Từ vựng đến hạn ôn tập)
    const dueCount = this.gameState.dueTodayCount();
    if (dueCount > 0) {
      list.push({
        id: 'review-due',
        type: 'review',
        title: 'Ôn tập đến hạn',
        message: `Có ${dueCount} từ đến hạn ôn tập hôm nay`,
        route: '/review',
        iconName: 'icon_memory_brain',
        timestamp: new Date()
      });
    }

    // 3. Claimable Daily Quests (Nhiệm vụ hàng ngày đã xong)
    const quests = this.dailyQuestService.quests();
    const unclaimedQuests = quests.filter(q => q.status === 'COMPLETED_UNCLAIMED');
    if (unclaimedQuests.length > 0) {
      list.push({
        id: 'quests-unclaimed',
        type: 'quest',
        title: 'Nhiệm vụ hoàn thành',
        message: `Có ${unclaimedQuests.length} nhiệm vụ đã xong — Nhận thưởng!`,
        route: '/dashboard',
        iconName: 'icon_star',
        timestamp: new Date()
      });
    }

    // Unclaimed 3/3 Daily Chest (Rương kho báu hàng ngày)
    if (this.dailyQuestService.isChestAvailable()) {
      list.push({
        id: 'daily-chest-ready',
        type: 'quest',
        title: 'Rương hàng ngày 3/3',
        message: 'Nhiệm vụ hôm nay đã xong — Mở rương nhận thưởng!',
        route: '/dashboard',
        iconName: 'chest_closed',
        timestamp: new Date()
      });
    }

    return list;
  });

  // Tổng số cảnh báo chưa xử lý
  readonly unreadCount = computed<number>(() => this.alerts().length);

  constructor() {
    // App Icon Badging (navigator.setAppBadge cho iOS 16.4+ PWA & Desktop Chrome/Edge)
    effect(() => {
      if (typeof navigator !== 'undefined' && 'setAppBadge' in navigator) {
        const count = this.unreadCount();
        if (count > 0) {
          (navigator as any).setAppBadge(count).catch(() => {});
        } else {
          (navigator as any).clearAppBadge().catch(() => {});
        }
      }
    });

    // Lắng nghe kiểm tra định kỳ cây chín khi đang mở PWA
    if (typeof window !== 'undefined') {
      this.harvestCheckTimer = setInterval(() => {
        this.checkLiveHarvestNotifications();
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.harvestCheckTimer) {
      clearInterval(this.harvestCheckTimer);
      this.harvestCheckTimer = null;
    }
  }

  /**
   * Yêu cầu quyền Web Notification từ thao tác người dùng (User Gesture trên Topbar Bell).
   * Không bao giờ gọi tự động khi app khởi động để tuân thủ chính sách iOS Safari.
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied';
    }
    try {
      const res = await Notification.requestPermission();
      this.permission.set(res);
      if (res === 'granted') {
        this.checkLiveHarvestNotifications();
      }
      return res;
    } catch {
      return 'denied';
    }
  }

  /**
   * Kiểm tra và bắn Web Notification khi PWA đang mở nếu cây vừa chín tới mốc harvestableAtUtc
   */
  private checkLiveHarvestNotifications(): void {
    if (this.permission() !== 'granted') return;
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    const plots = this.gameState.plots();
    const now = Date.now();

    for (const plot of plots) {
      if (!plot.harvestableAtUtc) continue;
      const harvestTime = new Date(plot.harvestableAtUtc).getTime();
      const plotKey = `${plot.id}-${plot.harvestableAtUtc}`;

      // Nếu ô đất đã tới giờ thu hoạch và chưa gửi thông báo trong phiên này
      if (now >= harvestTime && !this.notifiedPlotKeys.has(plotKey)) {
        this.notifiedPlotKeys.add(plotKey);
        const cropName = this.getCropNameVi(plot.crop);

        try {
          new Notification('Language Farm', {
            body: `${cropName} ở ô #${plot.index + 1} đã chín — Vào thu hoạch ngay!`,
            icon: 'assets/icons/icon-192.png'
          });
        } catch {
          // Bỏ qua lỗi nếu môi trường không cho phép hiển thị
        }
      }
    }
  }

  /**
   * Tải tệp lịch Apple Calendar (.ics) kèm báo thức VALARM đúng thời điểm thu hoạch cây trồng.
   * Hoạt động 100% offline ngay cả khi người dùng đóng hoàn toàn Safari.
   */
  downloadHarvestIcs(cropNameVi: string, plotIndex: number, harvestableAtUtc: string): void {
    if (!harvestableAtUtc) return;
    const start = new Date(harvestableAtUtc);
    if (isNaN(start.getTime())) return;

    const end = new Date(start.getTime() + 5 * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Language Farm//Harvest Reminder//VI',
      'BEGIN:VEVENT',
      `UID:lf-plot-${plotIndex}-${start.getTime()}@languagefarm`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Thu hoạch ${cropNameVi} (Ô #${plotIndex + 1}) - Language Farm`,
      'DESCRIPTION:Cây trồng vườn đã chín, hãy mở Language Farm để thu hoạch!',
      'BEGIN:VALARM',
      'TRIGGER:-PT0M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Thu hoạch ${cropNameVi}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `language-farm-o-${plotIndex + 1}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /**
   * Điều hướng tới route tương ứng khi click vào một thông báo
   */
  navigateToAlert(alert: NotificationAlert): void {
    if (alert.route) {
      this.router.navigateByUrl(alert.route);
    }
  }

  /**
   * Lấy tên tiếng Việt của cây trồng
   */
  getCropNameVi(cropId?: string): string {
    if (!cropId) return 'Cây trồng';
    const match = CROP_CATALOG.find(c => c.id === cropId);
    return match ? match.nameVi : 'Cây trồng';
  }
}
