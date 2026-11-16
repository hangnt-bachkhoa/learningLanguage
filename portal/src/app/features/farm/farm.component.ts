import { Component, inject, signal, computed, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { GameStateService, getPlotUnlockRequirement, PlotUnlockRequirement } from '../../core/services/game-state.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { CROP_CATALOG } from '../../core/constants/crop-catalog.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { FarmPlot } from '../../core/models/game.models';
import { computePlotCountdown, PlotCountdownResult } from '../../core/utils/growth-countdown.util';

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <div class="farm-screen">
      <!-- Header với 2 Tab điều hướng: Vườn của tôi | Cây trồng -->
      <div class="screen-header">
        <h2 class="serif-title">Nông trại</h2>
        <div class="farm-tabs">
          <button class="farm-tab" [class.active]="activeTab() === 'garden'" (click)="activeTab.set('garden')">
            Vườn của tôi
          </button>
          <button class="farm-tab" [class.active]="activeTab() === 'catalog'" (click)="activeTab.set('catalog')">
            Cây trồng
          </button>
        </div>

        <!-- Thanh công cụ Lưu trữ / Sao lưu / Khôi phục dữ liệu Web App -->
        <div class="storage-bar">
          <span class="storage-label">💾 Dữ liệu máy:</span>
          <button class="storage-btn" (click)="state.exportBackupJson()" title="Tải file english-farm-backup.json về máy">
            ⬇ Xuất sao lưu
          </button>
          <label class="storage-btn storage-upload-btn" title="Chọn file .json đã sao lưu trước đó">
            ⬆ Nạp sao lưu
            <input type="file" accept=".json" (change)="onFileImport($event)" style="display:none;" />
          </label>
          <button class="storage-btn storage-reset" (click)="confirmReset()" title="Xóa dữ liệu để chơi lại từ đầu">
            🔄 Đặt lại
          </button>
        </div>
      </div>

      <!-- TAB 1: VƯỜN CỦA TÔI -->
      @if (activeTab() === 'garden') {
        <!-- Khung nông trại chính (Lưới đất 2D phẳng 3x3) -->
        <div class="vintage-card farm-container">
          <div class="farm-grid-3x3">
            @for (plot of state.plots(); track plot.id; let idx = $index) {
              <div
                class="soil-slot"
                [class.slot-empty]="plot.status === 'empty'"
                [class.slot-seeded]="plot.status === 'seeded'"
                [class.slot-growing]="plot.status === 'growing'"
                [class.locked]="plot.status === 'locked'"
                [class.ready]="plot.status === 'ready'"
                (click)="handlePlotClick(idx)">
                
                <!-- 1. Nền đất xốp nâu có luống -->
                <div class="soil-bg" [innerHTML]="soilBackground | safeHtml"></div>

                <!-- 2. Cây / Mầm / Khóa nổi trên mặt đất -->
                <div class="plant-layer" [innerHTML]="getPlantSprite(plot) | safeHtml"></div>

                <!-- 3. Nhãn phân biệt tên & icon cây trồng rõ ràng cho từng loại -->
                @if (plot.crop && (plot.status === 'seeded' || plot.status === 'growing' || plot.status === 'ready')) {
                  <div class="crop-badge-tag" [class.ready-badge]="plot.status === 'ready'">
                    <span class="tag-icon">
                      <img [src]="'assets/farm-assets/crops/' + plot.crop + '.png'" class="plot-tag-thumb pixel-art" [alt]="getCropName(plot.crop)" />
                    </span>
                    <span class="tag-name">{{ getCropName(plot.crop) }}</span>
                  </div>
                }

                <!-- 4. Đồng hồ đếm ngược mm:ss và Thanh tiến độ thời gian thực (Rule 4) -->
                @if (plot.crop && (plot.status === 'seeded' || plot.status === 'growing')) {
                  @let cd = getPlotCountdown(plot);
                  <div class="crop-countdown-badge" title="Thời gian còn lại: {{ cd.label }}">
                    <span class="countdown-clock-icon">⏱️</span>
                    <span class="countdown-text">{{ cd.label }}</span>
                  </div>
                  <div class="growth-bar-wrap" title="Tiến độ lớn: {{ cd.progress }}%">
                    <div class="growth-bar-fill" [style.width.%]="cd.progress"></div>
                  </div>
                }

                <!-- 5. Gợi ý ô đất trống sẵn sàng gieo -->
                @if (plot.status === 'empty') {
                  <div class="empty-plot-hint">
                    <span class="empty-plus">+</span>
                    <span class="empty-label">Trống</span>
                  </div>
                }

                <!-- 6. Hiệu ứng lấp lánh khi nông sản chín -->
                @if (plot.status === 'ready') {
                  <span class="ready-sparkle">✨</span>
                  <div class="harvest-pill">Thu hoạch</div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Thẻ thông báo trạng thái cây trồng trên đất -->
        <div class="vintage-card crop-status-card">
          <div class="crop-info-left">
            <div class="crop-mini-icon" [innerHTML]="activeCropInfo().icon | safeHtml"></div>
            <div>
              <div class="crop-name-title">{{ activeCropInfo().name }}</div>
              <div class="crop-sub-status">{{ activeCropInfo().status }}</div>
            </div>
          </div>
          <div class="crop-timer-badge">
            {{ activeCropInfo().time }}
          </div>
        </div>

        <!-- 4 NÚT THAO TÁC NÔNG TRẠI (Gieo hạt, Tưới nước, Bón phân, Thu hoạch) -->
        <div class="action-dock">
          <button
            class="action-card"
            [class.active]="state.selectedTool() === 'plant'"
            (click)="selectTool('plant')">
            <div class="action-icon" [innerHTML]="assets.seedBag | safeHtml"></div>
            <span class="action-label">Gieo hạt</span>
            <span class="action-count">({{ totalSeeds() }})</span>
          </button>

          <button
            class="action-card"
            [class.active]="state.selectedTool() === 'water'"
            (click)="selectTool('water')">
            <div class="action-icon" [innerHTML]="assets.wateringCan | safeHtml"></div>
            <span class="action-label">Tưới nước</span>
            <span class="action-count">({{ state.inventory().care.water }})</span>
          </button>

          <button
            class="action-card"
            [class.active]="state.selectedTool() === 'fertilize'"
            (click)="selectTool('fertilize')">
            <div class="action-icon" [innerHTML]="assets.fertilizerSack | safeHtml"></div>
            <span class="action-label">Bón phân</span>
            <span class="action-count">({{ state.inventory().care.fertilizer }})</span>
          </button>

          <button
            class="action-card"
            [class.active]="state.selectedTool() === 'harvest'"
            (click)="selectTool('harvest')">
            <div class="action-icon" [innerHTML]="assets.harvestBasket | safeHtml"></div>
            <span class="action-label">Thu hoạch</span>
            <span class="action-count">({{ readyPlotsCount() }})</span>
          </button>
        </div>

        <!-- Thanh chọn loại hạt muốn gieo (Phân biệt rõ 11 giống cây & trạng thái khóa) -->
        @if (state.selectedTool() === 'plant') {
          <div class="seed-picker-strip">
            <div class="picker-header">
              <span class="picker-label">🌱 Chọn loại hạt muốn gieo:</span>
              <span class="picker-sub">Hạt khóa cần đủ XP và mở chủ đề tương ứng</span>
            </div>
            <div class="seed-options-grid">
              @for (s of seedOptions; track s.id) {
                @let isUnlocked = state.isCropUnlocked(s.id);
                @let lockInfo = state.getCropLockInfo(s.id);

                <button
                  class="seed-card-btn"
                  [class.active]="state.selectedSeed() === s.id && isUnlocked"
                  [class.empty-seed]="isUnlocked && (state.inventory().seeds[s.id] || 0) === 0"
                  [class.seed-locked]="!isUnlocked"
                  (click)="onSelectSeed(s.id, isUnlocked, lockInfo)">
                  <span class="seed-icon">
                    @if (isUnlocked) {
                      <img [src]="'assets/farm-assets/crops/' + s.id + '.png'" class="seed-picker-thumb pixel-art" [alt]="s.name" />
                    } @else {
                      <span class="seed-lock-glyph">🔒</span>
                    }
                  </span>
                  <div class="seed-meta">
                    <span class="seed-name">{{ s.name }}</span>
                    @if (isUnlocked) {
                      <span class="seed-qty" [class.zero]="(state.inventory().seeds[s.id] || 0) === 0">
                        {{ state.inventory().seeds[s.id] || 0 }} túi
                      </span>
                    } @else {
                      <span class="seed-lock-tag" title="{{ lockInfo.missingReasons.join(' & ') }}">
                        Lv.{{ lockInfo.requiredLevel }} ({{ lockInfo.requiredXp }} XP)
                      </span>
                    }
                  </div>
                </button>
              }
            </div>
          </div>
        }
      } @else {
        <!-- TAB 2: DANH MỤC CÂY TRỒNG (CROP CATALOG) -->
        <div class="catalog-list">
          @for (crop of catalogList; track crop.id) {
            @let isUnlocked = state.isCropUnlocked(crop.id);
            @let lockInfo = state.getCropLockInfo(crop.id);

            <div class="vintage-card crop-catalog-card" [class.crop-locked-card]="!isUnlocked">
              <div class="catalog-icon" [innerHTML]="crop.icon | safeHtml"></div>
              <div class="catalog-body">
                <div class="catalog-header">
                  <div class="title-tier-group">
                    <h4 class="catalog-name">{{ crop.nameVi }}</h4>
                    <span class="tier-badge tier-{{ lockInfo.tier }}">{{ lockInfo.tierName }}</span>
                  </div>
                  <span class="catalog-badge">{{ crop.growthTime }}</span>
                </div>
                <p class="catalog-desc">{{ crop.desc }}</p>

                <!-- Trạng thái mở khóa & Yêu cầu -->
                <div class="catalog-lock-status">
                  @if (isUnlocked) {
                    <span class="lock-status-pill unlocked">✅ Đã mở khóa</span>
                  } @else {
                    <span class="lock-status-pill locked">
                      🔒 Khóa: Cần {{ lockInfo.requiredXp }} XP & Mở bài "{{ lockInfo.requiredLessonTitle }}"
                    </span>
                  }
                </div>

                <div class="catalog-meta">
                  <span class="meta-tag gold">🪙 Bán: +{{ crop.coins }} Xu</span>
                  <span class="meta-tag olive">★ Thưởng: +{{ crop.xp }} XP</span>
                  <span class="meta-tag">Kho: {{ state.inventory().seeds[crop.id] || 0 }} túi hạt</span>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- MODAL MỞ KHÓA Ô ĐẤT #5 - #9 (RULE 5) -->
      @if (selectedLockedPlotIndex() !== null) {
        @let req = getPlotReq();
        <div class="unlock-plot-backdrop" (click)="selectedLockedPlotIndex.set(null)"></div>
        <div class="vintage-card unlock-plot-modal">
          <div class="modal-header">
            <h3 class="modal-title">🔓 Mở Khóa Ô Đất #{{ (selectedLockedPlotIndex() || 0) + 1 }}</h3>
            <button class="modal-close-btn" (click)="selectedLockedPlotIndex.set(null)">✕</button>
          </div>
          <p class="modal-desc">Chọn 1 trong 2 phương thức để mở rộng diện tích canh tác:</p>

          <div class="unlock-options-stack">
            <!-- Cách 1: Bằng Xu -->
            <div class="unlock-option-card">
              <div class="option-info">
                <span class="option-badge coin-badge">Cách 1: Tiền tệ</span>
                <h4 class="option-name">🪙 {{ req?.coinPrice }} Xu</h4>
                <p class="option-hint">Hiện có: {{ state.coins() }} Xu</p>
              </div>
              <button
                class="btn btn-primary btn-sm"
                [disabled]="state.coins() < (req?.coinPrice || 0)"
                (click)="unlockWithCoins()">
                Mở bằng Xu
              </button>
            </div>

            <!-- Cách 2: Bằng Level + Nông sản -->
            <div class="unlock-option-card">
              <div class="option-info">
                <span class="option-badge farm-badge">Cách 2: Nông nghiệp</span>
                <h4 class="option-name">
                  Lv.{{ req?.minLevel }}
                  @for (c of req?.requiredCrops; track c.cropId) {
                    + {{ c.qty }}x {{ c.cropNameVi }}
                  }
                </h4>
                <p class="option-hint">
                  Level: Lv.{{ state.level() }}/{{ req?.minLevel }}
                  @for (c of req?.requiredCrops; track c.cropId) {
                    · {{ c.cropNameVi }}: {{ state.inventory().harvested[c.cropId] || 0 }}/{{ c.qty }}
                  }
                </p>
              </div>
              <button
                class="btn btn-secondary btn-sm"
                [disabled]="!canUnlockPlotWithCrops(req)"
                (click)="unlockWithCrops()">
                Mở bằng Nông sản
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .farm-screen {
      max-width: 520px;
      margin: 0 auto;
      padding-bottom: 30px;
    }
    .screen-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .serif-title {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      color: var(--navy);
    }
    .farm-tabs {
      display: flex;
      background: #E8DFC8;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px;
      width: 100%;
      max-width: 280px;
    }
    .farm-tab {
      flex: 1;
      padding: 7px 14px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 999px;
      color: var(--ink-muted);
      cursor: pointer;
      transition: all 0.15s;
    }
    .farm-tab.active {
      background: var(--navy);
      color: #FFFDF9;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    }
    /* Storage bar sao lưu & khôi phục */
    .storage-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #F4EFE6;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 11px;
    }
    .storage-label {
      font-weight: 700;
      color: var(--navy);
      font-size: 11px;
    }
    .storage-btn {
      background: #FFFDF8;
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 11px;
      font-weight: 600;
      color: var(--ink);
      cursor: pointer;
      transition: all 0.12s;
    }
    .storage-btn:hover {
      background: #EFE4D2;
      border-color: var(--olive);
    }
    .storage-upload-btn {
      display: inline-flex;
      align-items: center;
    }
    .storage-reset {
      color: #9C2738;
      border-color: #E2B6BC;
      background: #FFF5F6;
    }
    .storage-reset:hover {
      background: #FCE6E8;
    }
    /* Khung đất nông trại Top-Down 3x3 */
    .farm-container {
      background: #FFFDF8;
      border: 1px solid var(--border-strong);
      border-radius: 18px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(38, 56, 71, 0.08);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 16px;
    }
    .farm-grid-3x3 {
      display: grid;
      grid-template-columns: repeat(3, 108px);
      grid-template-rows: repeat(3, 108px);
      gap: 12px;
    }
    .soil-slot {
      width: 108px;
      height: 108px;
      border-radius: 12px;
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(74, 50, 29, 0.25);
      transition: transform 0.12s, box-shadow 0.12s;
      overflow: hidden;
    }
    .soil-slot:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(74, 50, 29, 0.35);
    }
    .soil-slot.locked {
      cursor: not-allowed;
      filter: saturate(0.6) brightness(0.92);
    }
    .soil-slot.ready {
      animation: gentleReadyGlow 1.8s infinite alternate ease-in-out;
    }
    @keyframes gentleReadyGlow {
      from { box-shadow: 0 4px 10px rgba(74, 50, 29, 0.25); }
      to { box-shadow: 0 0 16px rgba(228, 180, 60, 0.85); }
    }
    .soil-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .plant-layer {
      position: relative;
      z-index: 2;
      width: 76px;
      height: 76px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .ready-sparkle {
      position: absolute;
      top: 6px;
      right: 6px;
      font-size: 14px;
      z-index: 3;
      animation: spinSparkle 2s infinite linear;
    }
    @keyframes spinSparkle {
      0% { transform: scale(0.9) rotate(0deg); }
      50% { transform: scale(1.2) rotate(180deg); }
      100% { transform: scale(0.9) rotate(360deg); }
    }
    /* Thẻ thông báo trạng thái cà rốt chín */
    .crop-status-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 18px;
      margin-bottom: 16px;
      border-radius: 14px;
    }
    .crop-info-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .crop-mini-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .crop-name-title {
      font-weight: 700;
      font-size: 15px;
      color: var(--navy);
    }
    .crop-sub-status {
      font-size: 12px;
      color: var(--olive);
      font-weight: 600;
    }
    .crop-timer-badge {
      font-size: 12px;
      color: var(--ink-muted);
      background: #EAE2D2;
      padding: 4px 10px;
      border-radius: 999px;
      font-weight: 600;
    }
    /* 4 Thao tác canh tác */
    .action-dock {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    .action-card {
      background: #FCF9F2;
      border: 1px solid var(--border-strong);
      border-radius: 12px;
      padding: 10px 4px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      cursor: pointer;
      transition: all 0.15s;
    }
    .action-card:hover {
      background: #F3ECE0;
      transform: translateY(-1px);
    }
    .action-card.active {
      background: #F3E4E5;
      border-color: var(--rose);
      box-shadow: 0 0 0 2px var(--rose);
    }
    .action-icon {
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
    }
    .action-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--navy);
    }
    .action-count {
      font-size: 10.5px;
      color: var(--ink-muted);
      font-weight: 600;
    }
    /* Nhãn phân biệt cây trồng */
    .crop-badge-tag {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 4;
      background: rgba(255, 253, 248, 0.94);
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      padding: 1.5px 5.5px;
      display: flex;
      align-items: center;
      gap: 3px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      pointer-events: none;
    }
    .crop-badge-tag.ready-badge {
      background: #FFF5D6;
      border-color: #E5A912;
    }
    .tag-icon {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .plot-tag-thumb {
      width: 13px;
      height: 13px;
      object-fit: contain;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
    }
    .tag-name {
      font-size: 9.5px;
      font-weight: 700;
      color: var(--navy);
      letter-spacing: -0.2px;
    }
    /* Huy hiệu đếm ngược thời gian thực mm:ss */
    .crop-countdown-badge {
      position: absolute;
      top: 5px;
      right: 5px;
      background: rgba(248, 244, 235, 0.94);
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      padding: 1px 6px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      z-index: 5;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      pointer-events: none;
    }
    .countdown-clock-icon {
      font-size: 9.5px;
      line-height: 1;
    }
    .countdown-text {
      font-size: 9.5px;
      font-weight: 800;
      color: var(--navy);
      font-family: monospace;
      letter-spacing: -0.3px;
    }

    /* Thanh tiến độ sinh trưởng */
    .growth-bar-wrap {
      position: absolute;
      bottom: 6px;
      left: 10px;
      right: 10px;
      height: 6px;
      background: rgba(45, 28, 14, 0.55);
      border-radius: 999px;
      overflow: hidden;
      z-index: 4;
      border: 0.5px solid rgba(255, 255, 255, 0.4);
    }
    .growth-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #6FA848, #A3E062);
      border-radius: 999px;
      transition: width 0.35s ease;
    }
    /* Hint ô đất trống */
    .empty-plot-hint {
      position: absolute;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0.45;
      color: #7A6248;
      pointer-events: none;
      transition: opacity 0.15s, transform 0.15s;
    }
    .soil-slot:hover .empty-plot-hint {
      opacity: 0.9;
      transform: scale(1.08);
      color: var(--olive);
    }
    .empty-plus {
      font-size: 20px;
      font-weight: 700;
      line-height: 1;
    }
    .empty-label {
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    /* Pill Thu hoạch */
    .harvest-pill {
      position: absolute;
      bottom: 5px;
      z-index: 4;
      background: #DE3B2B;
      color: #FFF;
      font-size: 9.5px;
      font-weight: 800;
      padding: 1.5px 7px;
      border-radius: 999px;
      box-shadow: 0 2px 5px rgba(222, 59, 43, 0.4);
      animation: pulseHarvest 1.4s infinite alternate ease-in-out;
      pointer-events: none;
    }
    @keyframes pulseHarvest {
      from { transform: scale(0.96); }
      to { transform: scale(1.06); }
    }
    /* Thanh chọn hạt giống */
    .seed-picker-strip {
      background: #F4EFE5;
      border: 1px solid var(--border-strong);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .picker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }
    .picker-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
    }
    .picker-sub {
      font-size: 11px;
      color: var(--ink-muted);
    }
    .seed-options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
      gap: 8px;
    }
    .seed-card-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 9px;
      background: #FFFDF9;
      border: 1.5px solid var(--border-strong);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.15s;
      text-align: left;
    }
    .seed-card-btn:hover {
      background: #FFF7EB;
      border-color: var(--olive);
      transform: translateY(-1px);
    }
    .seed-card-btn.active {
      background: #EFF5E9;
      border-color: #557A46;
      box-shadow: 0 0 0 2px rgba(85, 122, 70, 0.35);
    }
    .seed-card-btn.empty-seed {
      opacity: 0.55;
      background: #F3ECE2;
    }
    .seed-icon {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .seed-picker-thumb {
      width: 20px;
      height: 20px;
      object-fit: contain;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
    }
    .seed-lock-glyph {
      font-size: 13px;
      line-height: 1;
    }
    .seed-meta {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
      overflow: hidden;
    }
    .seed-name {
      font-size: 11px;
      font-weight: 700;
      color: var(--navy);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .seed-qty {
      font-size: 10px;
      color: var(--olive);
      font-weight: 600;
    }
    .seed-qty.zero {
      color: #A65E65;
    }
    .seed-card-btn.seed-locked {
      background: #F2ECE1;
      border: 1px dashed #C8B8A0;
      opacity: 0.72;
    }
    .seed-card-btn.seed-locked:hover {
      background: #EFE4D2;
      border-color: #A88F6D;
    }
    .seed-lock-tag {
      font-size: 9.5px;
      font-weight: 700;
      color: #9C2738;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    /* Tab Danh mục cây trồng (Catalog) */
    .catalog-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .crop-catalog-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 16px;
    }
    .crop-catalog-card.crop-locked-card {
      background: #FAF6ED;
      border: 1px dashed #CBBBA2;
      opacity: 0.88;
    }
    .title-tier-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tier-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 1.5px 7px;
      border-radius: 999px;
      background: #E4D8C3;
      color: var(--navy);
      letter-spacing: 0.2px;
    }
    .tier-badge.tier-1 {
      background: #E6F0DC;
      color: #3E6328;
    }
    .tier-badge.tier-2 {
      background: #FFF0D6;
      color: #8C5913;
    }
    .tier-badge.tier-3 {
      background: #FBE6EA;
      color: #9C2738;
    }
    .tier-badge.tier-4 {
      background: #EAE6FB;
      color: #4C3299;
    }
    .catalog-lock-status {
      margin-bottom: 8px;
    }
    .lock-status-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      display: inline-block;
    }
    .lock-status-pill.unlocked {
      background: #EDF7E8;
      color: #2F631E;
      border: 1px solid #C4E3B5;
    }
    .lock-status-pill.locked {
      background: #FBECEC;
      color: #8F2232;
      border: 1px solid #ECC4C8;
    }
    .catalog-icon {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .catalog-body {
      flex: 1;
    }
    .catalog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .catalog-name {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy);
    }
    .catalog-badge {
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-muted);
      background: #EAE2D2;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .catalog-desc {
      font-size: 12px;
      color: var(--ink-muted);
      margin-bottom: 8px;
    }
    .catalog-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .meta-tag {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 4px;
      background: #EAE2D2;
      color: var(--navy);
    }
    .meta-tag.gold {
      background: #FFF4D9;
      color: #7A5B17;
    }
    .meta-tag.olive {
      background: var(--olive-soft);
      color: #4C5435;
    }

    /* ================= RESPONSIVE MOBILE (< 480px) ================= */
    @media (max-width: 480px) {
      .farm-screen {
        padding-left: 2px;
        padding-right: 2px;
        max-width: 100%;
      }
      .screen-header {
        gap: 8px;
        margin-bottom: 12px;
      }
      .serif-title {
        font-size: 20px;
      }
      .farm-tabs {
        max-width: 100%;
      }
      .storage-bar {
        flex-wrap: wrap;
        justify-content: center;
        border-radius: 12px;
        padding: 6px 8px;
        gap: 4px;
      }
      .storage-btn {
        padding: 3px 7px;
        font-size: 10px;
      }
      .farm-container {
        padding: 8px;
        border-radius: 14px;
        margin-bottom: 12px;
      }
      .farm-grid-3x3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(3, minmax(0, 1fr));
        gap: 6px;
        width: 100%;
        max-width: 320px;
      }
      .soil-slot {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
      }
      .plant-layer {
        width: 80%;
        height: 80%;
      }
      .crop-badge-tag {
        top: 3px;
        left: 3px;
        padding: 1px 4px;
        gap: 2px;
      }
      .crop-countdown-badge {
        top: 2px;
        right: 2px;
        padding: 0.5px 4px;
        gap: 1.5px;
      }
      .countdown-clock-icon {
        font-size: 8px;
      }
      .countdown-text {
        font-size: 7.5px;
      }
      .tag-icon {
        font-size: 9.5px;
      }
      .tag-name {
        font-size: 8px;
      }
      .growth-bar-wrap {
        bottom: 3px;
        left: 4px;
        right: 4px;
        height: 4.5px;
      }
      .harvest-pill {
        bottom: 3px;
        font-size: 8px;
        padding: 1px 5px;
      }
      .empty-plus {
        font-size: 16px;
      }
      .empty-label {
        font-size: 8px;
      }
      .action-dock {
        gap: 6px;
        margin-bottom: 12px;
      }
      .action-card {
        padding: 6px 2px 5px;
        border-radius: 10px;
      }
      .action-icon {
        height: 32px;
        margin-bottom: 2px;
      }
      .action-label {
        font-size: 11px;
      }
      .action-count {
        font-size: 9px;
      }
      .seed-picker-strip {
        padding: 10px 10px;
        border-radius: 12px;
      }
      .seed-options-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
      }
      .seed-card-btn {
        padding: 5px 6px;
        gap: 5px;
      }
      .seed-icon {
        font-size: 15px;
      }
      .seed-name {
        font-size: 10.5px;
      }
      .crop-status-card {
        padding: 10px 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
      .crop-catalog-card {
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        gap: 10px;
      }
      .catalog-icon {
        width: 48px;
        height: 48px;
      }
    }

    /* Modal Mở Khóa Ô Đất #5 - #9 (Rule 5) */
    .unlock-plot-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(20, 32, 44, 0.55);
      backdrop-filter: blur(3px);
      z-index: 210;
    }
    .unlock-plot-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 440px;
      z-index: 220;
      padding: 22px 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .modal-title {
      font-family: var(--font-serif);
      font-size: 19px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
    }
    .modal-close-btn {
      font-size: 16px;
      font-weight: 700;
      color: var(--ink-muted);
      cursor: pointer;
      border: none;
      background: none;
    }
    .modal-desc {
      font-size: 12.5px;
      color: var(--ink-muted);
      margin-bottom: 14px;
    }
    .unlock-options-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .unlock-option-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      background: #FAF6EF;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
    }
    .option-info {
      flex: 1;
    }
    .option-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      margin-bottom: 3px;
    }
    .coin-badge {
      background: #FFF3D6;
      color: #7A5B0B;
    }
    .farm-badge {
      background: #E8EFE3;
      color: #385E2B;
    }
    .option-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 2px;
    }
    .option-hint {
      font-size: 11px;
      color: var(--ink-muted);
      margin: 0;
    }
  `]
})
export class FarmComponent implements OnInit {
  state = inject(GameStateService);
  assets = FARM_ASSETS;
  soilBackground = FARM_ASSETS.tilledSoil;
  private destroyRef = inject(DestroyRef);

  activeTab = signal<'garden' | 'catalog'>('garden');
  selectedLockedPlotIndex = signal<number | null>(null);

  ngOnInit() {
    // Khởi tạo và đồng bộ trạng thái sinh trưởng ban đầu
    this.state.recalculatePlotStates();

    // Vòng lặp đếm ngược 1 giây thời gian thực (Rule 4 & 5)
    // Tự động dọn dẹp khi Component destroy qua takeUntilDestroyed
    interval(1000).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.state.recalculatePlotStates();
    });
  }

  getPlotCountdown(plot: FarmPlot): PlotCountdownResult {
    const cropConfig = CROP_CATALOG.find(c => c.id === plot.crop);
    const growthMinutes = cropConfig?.growthMinutes || 5;
    return computePlotCountdown(
      plot.plantedAtUtc,
      plot.harvestableAtUtc,
      growthMinutes,
      this.state.serverClockOffsetMs()
    );
  }

  seedOptions = CROP_CATALOG.map(c => ({
    id: c.id,
    name: c.nameVi,
    icon: c.id
  }));

  catalogList = CROP_CATALOG.map(c => ({
    id: c.id,
    nameVi: c.nameVi,
    growthTime: c.duration,
    coins: c.price * 2,
    xp: c.requiredXp || 20,
    desc: c.desc,
    icon: c.matureSvg
  }));

  activeCropInfo = computed(() => {
    const readyPlot = this.state.plots().find(p => (p.status || '').toLowerCase() === 'ready');
    if (readyPlot) {
      const crop = readyPlot.crop || 'carrot';
      const cat = CROP_CATALOG.find(c => c.id === crop);
      return {
        name: cat?.nameVi || 'Nông sản chín',
        status: 'Sẵn sàng thu hoạch!',
        time: 'Thu hoạch ngay ✨',
        icon: this.getPlantSprite(readyPlot)
      };
    }
    const growingPlot = this.state.plots().find(p => {
      const s = (p.status || '').toLowerCase();
      return s === 'growing' || s === 'seeded';
    });
    if (growingPlot) {
      const crop = growingPlot.crop || 'carrot';
      const cat = CROP_CATALOG.find(c => c.id === crop);
      const cd = this.getPlotCountdown(growingPlot);
      return {
        name: cat?.nameVi || 'Cây non',
        status: growingPlot.isWatered ? 'Đang lớn tươi tốt (Đã tưới)' : 'Cần chăm sóc (-2p tưới, -5p phân)',
        time: `⏱️ ${cd.label} (${cd.progress}%)`,
        icon: this.getPlantSprite(growingPlot)
      };
    }
    return {
      name: 'Vườn của bạn',
      status: 'Hãy gieo hạt giống mới!',
      time: '0 cây',
      icon: this.assets.seedBag
    };
  });

  selectTool(tool: 'plant' | 'water' | 'fertilize' | 'harvest') {
    this.state.selectedTool.set(tool);
    if (tool === 'harvest') {
      this.state.showToast('🧺 Chọn ô cây chín để thu hoạch');
    }
  }

  getCropIcon(cropKey?: string): string {
    const icons: Record<string, string> = {
      carrot: '🥕', potato: '🥔', corn: '🌽', tomato: '🍅',
      strawberry: '🍓', pumpkin: '🎃', sunflower: '🎃',
      wheat: '🌾', tulip: '🌾', blueberry: '🫐', rose: '🫐',
      mango: '🥭', watermelon: '🍉', kiwi: '🍉', lemon: '🍋',
      apple: '🍎', cherry: '🍒'
    };
    return (cropKey && icons[cropKey.toLowerCase()]) || '🌱';
  }

  getCropName(cropKey?: string): string {
    if (!cropKey) return 'Cây trồng';
    const key = cropKey.toLowerCase();
    const cat = CROP_CATALOG.find(c => c.id === key);
    if (cat) return cat.nameVi;
    // Backward compatibility aliases
    const legacyNames: Record<string, string> = {
      sunflower: 'Bí ngô',
      tulip: 'Lúa mì',
      rose: 'Việt quất',
      kiwi: 'Dưa hấu'
    };
    return legacyNames[key] || cropKey;
  }

  getPlantSprite(plot: FarmPlot): string {
    const status = (plot.status || '').toLowerCase();
    const cropKey = (plot.crop || '').toLowerCase();

    if (status === 'locked') return this.assets.lockedPadlock;
    if (status === 'seeded') return this.assets.seedsOnSoil;
    if (status === 'growing') {
      return plot.growthProgress >= 50 ? this.assets.growingPlant : this.assets.sprout;
    }
    if (status === 'ready') {
      const cat = CROP_CATALOG.find(c => c.id === cropKey);
      if (cat?.matureSvg) return cat.matureSvg;

      if (cropKey === 'sunflower') return this.assets.readyPumpkin;
      if (cropKey === 'tulip') return this.assets.readyWheat;
      if (cropKey === 'rose') return this.assets.readyBlueberry;
      if (cropKey === 'kiwi') return this.assets.readyWatermelon;

      return this.assets.readyCarrot;
    }
    return '';
  }

  getPlotReq(): PlotUnlockRequirement | null {
    const idx = this.selectedLockedPlotIndex();
    if (idx === null) return null;
    return getPlotUnlockRequirement(idx);
  }

  canUnlockPlotWithCrops(req: PlotUnlockRequirement | null): boolean {
    if (!req) return false;
    if (this.state.level() < req.minLevel) return false;
    return req.requiredCrops.every(c => (this.state.inventory().harvested[c.cropId] || 0) >= c.qty);
  }

  unlockWithCoins() {
    const idx = this.selectedLockedPlotIndex();
    if (idx === null) return;
    if (this.state.unlockPlotWithCoins(idx)) {
      this.selectedLockedPlotIndex.set(null);
    }
  }

  unlockWithCrops() {
    const idx = this.selectedLockedPlotIndex();
    if (idx === null) return;
    if (this.state.unlockPlotWithCrops(idx)) {
      this.selectedLockedPlotIndex.set(null);
    }
  }

  totalSeeds(): number {
    return Object.values(this.state.inventory().seeds).reduce((a, b) => a + b, 0);
  }

  readyPlotsCount(): number {
    return this.state.plots().filter(p => (p.status || '').toLowerCase() === 'ready').length;
  }

  handlePlotClick(index: number) {
    const plot = this.state.plots()[index];
    if (!plot) return;
    const status = (plot.status || '').toLowerCase();

    // 0. Nếu ô đất bị khóa -> mở modal lựa chọn mở khóa (Rule 5)
    if (status === 'locked') {
      this.selectedLockedPlotIndex.set(index);
      return;
    }

    // 1. Nếu ô đất chín -> bấm vào là thu hoạch ngay
    if (status === 'ready') {
      this.state.selectedTool.set('harvest');
      this.state.harvestPlot(index);
      return;
    }

    // 2. Nếu ô đất trống -> Gieo hạt giống đã chọn
    if (status === 'empty') {
      this.state.selectedTool.set('plant');
      this.state.plantSeed(index);
      return;
    }

    // 3. Nếu đang chọn công cụ cụ thể
    const tool = this.state.selectedTool();
    if (tool === 'plant') {
      this.state.plantSeed(index);
    } else if (tool === 'water') {
      this.state.waterPlot(index);
    } else if (tool === 'harvest') {
      this.state.harvestPlot(index);
    } else if (tool === 'fertilize') {
      this.state.fertilizePlot(index);
    } else {
      // Nhấp vào cây đang lớn -> ưu tiên tưới nước
      if (status === 'seeded' || status === 'growing') {
        this.state.selectedTool.set('water');
        this.state.waterPlot(index);
      }
    }
  }

  onSelectSeed(seedId: string, isUnlocked: boolean, lockInfo: any) {
    if (!isUnlocked) {
      this.state.showToast(`🔒 Hạt giống này đang khóa! Cần ${lockInfo.requiredXp} XP và mở bài học "${lockInfo.requiredLessonTitle}".`);
      return;
    }
    this.state.selectedSeed.set(seedId);
  }

  onFileImport(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        this.state.importBackupJson(content);
      }
      input.value = '';
    };
    reader.readAsText(file);
  }

  confirmReset() {
    if (confirm('Bạn có chắc chắn muốn đặt lại nông trại và điểm kinh nghiệm về ban đầu không?')) {
      this.state.resetGameToDefault();
    }
  }
}
