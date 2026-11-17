import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../core/services/game-state.service';
import { CROP_CATALOG, SPRITES } from '../../core/constants/crop-catalog.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, PixelIconComponent],
  template: `
    <div class="inventory-page">
      <div class="card-header">
        <div>
          <h2 class="serif-title" style="font-size:22px;">Kho Đồ & Balo Cá Nhân (Inventory)</h2>
          <span style="font-size:12px;color:var(--ink-muted);">Quản lý hạt giống, nông sản đã thu hoạch và dụng cụ chăm sóc</span>
        </div>
      </div>

      <!-- Harvested Crops -->
      <div class="vintage-card section-card">
        <h3 class="card-title" style="margin-bottom:14px; display:flex; align-items:center; gap:8px;">
          <app-pixel-icon name="icon_harvest_basket" [size]="20"></app-pixel-icon>
          <span>Nông Sản Thu Hoạch</span>
        </h3>
        <div class="items-grid">
          @for (k of objectKeys(state.inventory().harvested); track k) {
            @if (isKnownCrop(k)) {
              <div class="inv-slot">
                <div class="slot-sprite" [innerHTML]="getCropSprite(k) | safeHtml"></div>
                <div class="slot-name">{{ getCropName(k) }}</div>
                <div class="slot-qty">x{{ state.inventory().harvested[k] || 0 }}</div>
              </div>
            }
          }
        </div>
      </div>

      <!-- Seeds -->
      <div class="vintage-card section-card" style="margin-top:16px;">
        <h3 class="card-title" style="margin-bottom:14px; display:flex; align-items:center; gap:8px;">
          <app-pixel-icon name="icon_leaf_badge" [size]="20"></app-pixel-icon>
          <span>Hạt Giống</span>
        </h3>
        <div class="items-grid">
          @for (k of objectKeys(state.inventory().seeds); track k) {
            @if (isKnownCrop(k)) {
              <div class="inv-slot">
                <div class="slot-sprite" [innerHTML]="getSeedSprite(k) | safeHtml"></div>
                <div class="slot-name">Hạt {{ getCropName(k) }}</div>
                <div class="slot-qty">x{{ state.inventory().seeds[k] || 0 }}</div>
              </div>
            }
          }
        </div>
      </div>

      <!-- Care Supplies -->
      <div class="vintage-card section-card" style="margin-top:16px;">
        <h3 class="card-title" style="margin-bottom:14px; display:flex; align-items:center; gap:8px;">
          <app-pixel-icon name="icon_tools" [size]="20"></app-pixel-icon>
          <span>Dụng Cụ & Vật Phẩm Chăm Sóc</span>
        </h3>
        <div class="items-grid">
          <div class="inv-slot">
            <div class="slot-sprite" [innerHTML]="getSprite('water') | safeHtml"></div>
            <div class="slot-name">Nước tưới</div>
            <div class="slot-qty">{{ state.inventory().care.water }} lượt</div>
          </div>
          <div class="inv-slot">
            <div class="slot-sprite" [innerHTML]="getSprite('fertilizer') | safeHtml"></div>
            <div class="slot-name">Phân bón</div>
            <div class="slot-qty">{{ state.inventory().care.fertilizer }} túi</div>
          </div>
          <div class="inv-slot">
            <div class="slot-sprite" [innerHTML]="getSprite('speed_fertilizer') | safeHtml"></div>
            <div class="slot-name">Tăng tốc (-5p)</div>
            <div class="slot-qty">{{ state.inventory().care.speedFertilizer || 0 }} túi</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 12px;
    }
    .inv-slot {
      background: var(--bg-paper);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 14px 10px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .slot-sprite {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }
    .slot-sprite img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .slot-name {
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .slot-qty {
      font-size: 12px;
      font-weight: 700;
      color: var(--rose);
    }
  `]
})
export class InventoryComponent {
  state = inject(GameStateService);

  objectKeys = Object.keys;

  isKnownCrop(key: string): boolean {
    return CROP_CATALOG.some(c => c.id === key);
  }

  getCropName(key: string): string {
    const cat = CROP_CATALOG.find(c => c.id === key.toLowerCase());
    if (cat) return cat.nameVi;
    const legacy: Record<string, string> = {
      sunflower: 'Bí ngô',
      tulip: 'Lúa mì',
      rose: 'Việt quất',
      kiwi: 'Dưa hấu'
    };
    return legacy[key.toLowerCase()] || key;
  }

  getCropSprite(key: string): string {
    return SPRITES[key] || SPRITES['carrot'];
  }

  getSeedSprite(key: string): string {
    return SPRITES['seed_' + key] || SPRITES['seed'];
  }

  getSprite(key: string): string {
    return SPRITES[key] || SPRITES['basket'];
  }
}
