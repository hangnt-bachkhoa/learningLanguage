import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../core/services/game-state.service';
import { SPRITES } from '../../core/constants/crop-catalog.constant';
import { ShopItem } from '../../core/models/game.models';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <div class="shop-page">
      <div class="card-header">
        <div>
          <h2 class="serif-title" style="font-size:22px;">Cửa Hàng Nông Trại (General Store)</h2>
          <span style="font-size:12px;color:var(--ink-muted);">Dùng Xu 🪙 tích lũy từ việc học và thu hoạch để mua vật phẩm</span>
        </div>
        <div class="category-tabs">
          <button class="cat-tab" [class.active]="selectedCat() === 'all'" (click)="selectedCat.set('all')">Tất cả</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'seeds'" (click)="selectedCat.set('seeds')">Hạt giống</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'care'" (click)="selectedCat.set('care')">Chăm sóc</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'decor'" (click)="selectedCat.set('decor')">Trang trí</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'bundle'" (click)="selectedCat.set('bundle')">Gói Combo</button>
        </div>
      </div>

      <div class="products-grid">
        @for (prod of filteredProducts(); track prod.id) {
          @let isLocked = prod.cropKey ? !state.isCropUnlocked(prod.cropKey) : false;
          @let lockInfo = prod.cropKey ? state.getCropLockInfo(prod.cropKey) : null;

          <div class="vintage-card product-card" [class.item-locked]="isLocked">
            <!-- Huy hiệu trạng thái -->
            @if (isLocked) {
              <div class="prod-badge lock-badge">
                🔒 {{ lockInfo?.tierName }}
              </div>
            } @else {
              <div class="prod-badge">{{ prod.duration }}</div>
            }

            <div class="prod-sprite" [innerHTML]="getSprite(prod.sprite) | safeHtml"></div>
            <h4 class="prod-title">{{ prod.name }}</h4>
            <p class="prod-desc">{{ prod.desc }}</p>

            <!-- Điều kiện mở khóa nếu bị khóa -->
            @if (isLocked) {
              <div class="prod-lock-hint">
                <span class="lock-req-icon">🔒</span>
                <span class="lock-req-text">Cần {{ lockInfo?.requiredXp }} XP & Mở bài "{{ lockInfo?.requiredLessonTitle }}"</span>
              </div>
            } @else {
              <div class="prod-usage">{{ prod.usage }}</div>
            }

            <div class="prod-footer">
              <span class="price-tag">🪙 {{ prod.price }} Xu</span>
              @if (isLocked) {
                <button
                  class="btn btn-sm btn-locked"
                  (click)="state.showToast('🔒 Hạt giống này đang khóa! ' + (lockInfo?.missingReasons?.join(' & ') || ''))"
                  title="Chưa đủ điều kiện mua">
                  🔒 Chưa mở
                </button>
              } @else {
                <button class="btn btn-primary btn-sm" (click)="state.addToCart(prod)">+ Thêm vào giỏ</button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .category-tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .cat-tab {
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-size: 13px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--ink);
    }
    .cat-tab.active {
      background: var(--navy);
      color: #FFFDF9;
      border-color: var(--navy);
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
      margin-top: 14px;
    }
    .product-card {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 20px 16px;
    }
    .prod-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 10.5px;
      font-weight: 600;
      background: #EAE2D2;
      padding: 2px 7px;
      border-radius: 999px;
      color: var(--ink-muted);
    }
    .prod-sprite {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(1.4);
      margin: 10px 0;
    }
    .prod-title {
      font-family: var(--font-serif);
      font-size: 17px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 4px;
    }
    .prod-desc {
      font-size: 12px;
      color: var(--ink-muted);
      margin-bottom: 8px;
    }
    .prod-usage {
      font-size: 11.5px;
      background: var(--bg-paper);
      padding: 6px;
      border-radius: 4px;
      color: var(--olive);
      margin-bottom: 16px;
      font-weight: 500;
    }
    .prod-footer {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .price-tag {
      font-weight: 700;
      font-size: 14px;
      color: var(--gold-dark);
    }
    .item-locked {
      background: #F7F3EA;
      border: 1px dashed #C8BBA5;
      opacity: 0.88;
    }
    .item-locked .prod-sprite {
      filter: saturate(0.65) brightness(0.95);
    }
    .lock-badge {
      background: #FBE5E5;
      color: #9C2738;
      border: 1px solid #E8B4B8;
      font-weight: 700;
    }
    .prod-lock-hint {
      font-size: 11px;
      background: #FAF0E4;
      border: 1px solid #E4CEB2;
      padding: 6px 8px;
      border-radius: 6px;
      color: #7D4E1D;
      margin-bottom: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 5px;
      text-align: left;
      line-height: 1.25;
    }
    .btn-locked {
      background: #E2D9CB;
      color: #6C5B48;
      border: 1px solid #C4B5A0;
      cursor: not-allowed;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 10px;
      border-radius: var(--radius-sm);
    }
    .btn-locked:hover {
      background: #D8CEBE;
    }

    /* ================= RESPONSIVE MOBILE (< 600px) ================= */
    @media (max-width: 600px) {
      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      .products-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .product-card {
        padding: 16px 12px;
      }
    }
  `]
})
export class ShopComponent {
  state = inject(GameStateService);

  selectedCat = signal<string>('all');

  items: ShopItem[] = [
    {
      id: 's_carrot',
      cat: 'seeds',
      name: 'Hạt giống Cà rốt',
      price: 15,
      sprite: 's_carrot',
      duration: '2 lượt tưới',
      usage: 'Gieo hạt để thu hoạch 3 củ cà rốt mở bài Animals.',
      desc: 'Giống cà rốt ngọt giòn cho người mới.',
      cropKey: 'carrot'
    },
    {
      id: 's_corn',
      cat: 'seeds',
      name: 'Hạt giống Bắp ngô',
      price: 18,
      sprite: 's_corn',
      duration: '2 lượt tưới',
      usage: 'Thu hoạch bắp ngô vàng giàu dinh dưỡng.',
      desc: 'Dễ trồng, giá trị bán cao.',
      cropKey: 'corn'
    },
    {
      id: 's_tomato',
      cat: 'seeds',
      name: 'Hạt giống Cà chua',
      price: 22,
      sprite: 's_tomato',
      duration: '3 lượt tưới',
      usage: 'Trồng giàn cà chua đỏ mọng nước.',
      desc: 'Nông sản chủ lực mùa vụ.',
      cropKey: 'tomato'
    },
    {
      id: 's_sunflower',
      cat: 'seeds',
      name: 'Hạt giống Hoa hướng dương',
      price: 18,
      sprite: 's_sunflower',
      duration: '2 lượt tưới',
      usage: 'Trồng hoa hướng dương vàng óng.',
      desc: 'Hoa hướng dương rực rỡ đón nắng.',
      cropKey: 'sunflower'
    },
    {
      id: 's_rose',
      cat: 'seeds',
      name: 'Hạt giống Hoa hồng',
      price: 24,
      sprite: 's_rose',
      duration: '3 lượt tưới',
      usage: 'Trồng hoa hồng nhung kiêu sa.',
      desc: 'Sắc hoa quyến rũ cho khu vườn.',
      cropKey: 'rose'
    },
    {
      id: 's_tulip',
      cat: 'seeds',
      name: 'Hạt giống Hoa tulip',
      price: 20,
      sprite: 's_tulip',
      duration: '2 lượt tưới',
      usage: 'Gieo hoa tulip Hà Lan thanh tao.',
      desc: 'Búp hoa màu tím hồng vintage.',
      cropKey: 'tulip'
    },
    {
      id: 's_mango',
      cat: 'seeds',
      name: 'Hạt giống Xoài',
      price: 35,
      sprite: 's_mango',
      duration: '3 lượt tưới',
      usage: 'Trồng cây xoài cát ngọt lịm.',
      desc: 'Xoài vàng thơm ngọt, giá bán cao.',
      cropKey: 'mango'
    },
    {
      id: 's_kiwi',
      cat: 'seeds',
      name: 'Hạt giống Kiwi',
      price: 32,
      sprite: 's_kiwi',
      duration: '3 lượt tưới',
      usage: 'Trồng giàn kiwi xanh tươi mát.',
      desc: 'Kiwi giàu vitamin, sinh trưởng tốt.',
      cropKey: 'kiwi'
    },
    {
      id: 's_lemon',
      cat: 'seeds',
      name: 'Hạt giống Chanh',
      price: 22,
      sprite: 's_lemon',
      duration: '2 lượt tưới',
      usage: 'Trồng cây chanh vàng mọng nước.',
      desc: 'Chanh vàng thanh mát, mau cho trái.',
      cropKey: 'lemon'
    },
    {
      id: 's_apple',
      cat: 'seeds',
      name: 'Hạt giống Táo',
      price: 40,
      sprite: 's_apple',
      duration: '4 lượt tưới',
      usage: 'Trồng cây táo đỏ trĩu cành.',
      desc: 'Táo đỏ giòn ngọt, thưởng nhiều XP.',
      cropKey: 'apple'
    },
    {
      id: 's_cherry',
      cat: 'seeds',
      name: 'Hạt giống Cherry',
      price: 50,
      sprite: 's_cherry',
      duration: '4 lượt tưới',
      usage: 'Trồng cherry đỏ mọng thượng hạng.',
      desc: 'Loại quả quý mang lại giá trị cao nhất.',
      cropKey: 'cherry'
    },
    {
      id: 'c_water',
      cat: 'care',
      name: 'Bình nước tinh khiết (x3)',
      price: 10,
      sprite: 'water',
      duration: 'Dùng ngay',
      usage: 'Cộng +3 lượt tưới nước vào kho đồ.',
      desc: 'Giữ ẩm cho đất nảy mầm nhanh chóng.'
    },
    {
      id: 'c_fert',
      cat: 'care',
      name: 'Phân bón hữu cơ',
      price: 20,
      sprite: 'fertilizer',
      duration: 'Tăng tốc',
      usage: 'Thúc đẩy cây trồng chín tức thì.',
      desc: 'Phân bón ủ tự nhiên giàu dưỡng chất.'
    },
    {
      id: 'd_lamp',
      cat: 'decor',
      name: 'Đèn lồng khu vườn vintage',
      price: 40,
      sprite: 'lamp',
      duration: 'Vĩnh viễn',
      usage: 'Thắp sáng ấm áp cho mảnh vườn ban đêm.',
      desc: 'Đèn sắt rèn cổ điển phong cách châu Âu.'
    },
    {
      id: 'b_starter',
      cat: 'bundle',
      name: 'Gói Khởi Đầu Vườn Học',
      price: 50,
      sprite: 'bundle',
      duration: 'Combo ưu đãi',
      usage: 'Nhận 2 Hạt Cà rốt + 3 Nước + 1 Phân bón.',
      desc: 'Gói tiện lợi mở đầu cuộc hành trình.'
    }
  ];

  filteredProducts(): ShopItem[] {
    const cat = this.selectedCat();
    if (cat === 'all') return this.items;
    return this.items.filter(i => i.cat === cat);
  }

  getSprite(key: string): string {
    return SPRITES[key] || SPRITES['bundle'];
  }
}
