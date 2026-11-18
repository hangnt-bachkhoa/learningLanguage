import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
import { SPRITES } from '../../../core/constants/crop-catalog.constant';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, PixelIconComponent, SafeHtmlPipe],
  template: `
    <div class="modal-backdrop open" (click)="close.emit()">
      <div class="modal-box cart-modal-box" (click)="$event.stopPropagation()">
        <!-- MODAL HEADER -->
        <div class="modal-header">
          <div class="header-title-wrap">
            <h3 class="serif-title cart-title">
              <app-pixel-icon name="icon_cart" [size]="18"></app-pixel-icon>
              <span>Giỏ hàng nông trại</span>
            </h3>
            @if (state.cartCount() > 0) {
              <span class="cart-count-pill">{{ state.cartCount() }} món</span>
            }
          </div>
          <button type="button" class="close-btn" (click)="close.emit()" title="Đóng giỏ hàng">
            <app-pixel-icon name="icon_cross" [size]="14"></app-pixel-icon>
          </button>
        </div>

        <!-- MODAL BODY -->
        <div class="modal-body">
          @if (state.cart().length === 0) {
            <div class="empty-cart-state">
              <div class="empty-icon-wrap">
                <app-pixel-icon name="icon_cart" [size]="32"></app-pixel-icon>
              </div>
              <h4 class="serif-title empty-title">Giỏ hàng của bạn đang trống!</h4>
              <p class="empty-desc">Khám phá Cửa Hàng để chọn thêm Hạt giống, Nước tưới và Phân bón cho nông trại.</p>
            </div>
          } @else {
            <div class="cart-items">
              @for (item of state.cart(); track item.item.id) {
                <div class="cart-row">
                  <!-- Thumbnail -->
                  <div class="item-thumb" [innerHTML]="getSprite(item.item.sprite) | safeHtml"></div>

                  <!-- Name & Unit price -->
                  <div class="item-info">
                    <div class="item-name">{{ item.item.name }}</div>
                    <div class="unit-price">
                      <app-pixel-icon name="icon_coin" [size]="12"></app-pixel-icon>
                      <span>{{ item.item.price }} Xu / cái</span>
                    </div>
                  </div>

                  <!-- Quantity Stepper Controls -->
                  <div class="qty-stepper">
                    <button
                      type="button"
                      class="step-btn"
                      (click)="state.updateCartQty(item.item.id, -1)"
                      title="Giảm 1">
                      −
                    </button>
                    <span class="qty-val">{{ item.qty }}</span>
                    <button
                      type="button"
                      class="step-btn"
                      (click)="state.updateCartQty(item.item.id, 1)"
                      title="Tăng 1">
                      +
                    </button>
                  </div>

                  <!-- Subtotal -->
                  <div class="item-subtotal">
                    <app-pixel-icon name="icon_coin" [size]="13"></app-pixel-icon>
                    <span>{{ item.item.price * item.qty }} Xu</span>
                  </div>

                  <!-- Remove Item Button -->
                  <button
                    type="button"
                    class="remove-item-btn"
                    (click)="state.removeFromCart(item.item.id)"
                    title="Xóa vật phẩm này">
                    <app-pixel-icon name="icon_cross" [size]="12"></app-pixel-icon>
                  </button>
                </div>
              }
            </div>

            <!-- SUMMARY BOX -->
            <div class="cart-summary-card">
              <div class="summary-line">
                <span class="summary-label">Số dư Xu hiện có:</span>
                <span class="user-coins">
                  <app-pixel-icon name="icon_coin" [size]="14"></app-pixel-icon>
                  <strong>{{ state.coins() }} Xu</strong>
                </span>
              </div>
              <div class="summary-line total-line">
                <span class="summary-label">Tổng thanh toán:</span>
                <strong class="total-coins">
                  <app-pixel-icon name="icon_coin" [size]="16"></app-pixel-icon>
                  <span>{{ state.cartTotal() }} Xu</span>
                </strong>
              </div>

              @if (state.coins() < state.cartTotal()) {
                <div class="insufficient-alert">
                  <app-pixel-icon name="icon_warning" [size]="14"></app-pixel-icon>
                  <span>Ví không đủ! Bạn còn thiếu <strong>{{ state.cartTotal() - state.coins() }} Xu</strong>. Hãy giảm bớt số lượng hoặc hoàn thành Quiz để tích lũy thêm Xu.</span>
                </div>
              }
            </div>
          }
        </div>

        <!-- MODAL FOOTER -->
        <div class="modal-footer">
          @if (state.cart().length > 0) {
            <button type="button" class="clear-all-btn" (click)="state.clearCart()">
              Làm trống giỏ
            </button>
          }
          <div class="footer-actions">
            <button type="button" class="btn btn-secondary btn-sm" (click)="close.emit()">Đóng</button>
            @if (state.cart().length > 0) {
              <button
                type="button"
                class="btn btn-primary"
                [disabled]="state.coins() < state.cartTotal()"
                (click)="checkout()">
                Thanh toán ngay
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-modal-box {
      max-width: 520px;
      width: 100%;
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-lg);
      box-shadow: 0 16px 40px rgba(38, 56, 71, 0.28);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border);
      background: #FAF7F0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .cart-title {
      font-size: 17px;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--navy);
    }

    .cart-count-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
      background: #A65E65;
      color: #FFFDF9;
    }

    .close-btn {
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: var(--bg-card);
      color: var(--ink-muted);
      cursor: pointer;
      transition: all 0.15s;
    }
    .close-btn:hover {
      background: #EDE5D6;
      color: var(--navy);
    }

    .modal-body {
      padding: 16px 18px;
      max-height: 380px;
      overflow-y: auto;
    }

    /* Empty state */
    .empty-cart-state {
      text-align: center;
      padding: 28px 12px;
    }
    .empty-icon-wrap {
      width: 54px;
      height: 54px;
      margin: 0 auto 12px;
      border-radius: 50%;
      background: #F1E9DB;
      border: 1px dashed var(--border-strong);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.85;
    }
    .empty-title {
      font-size: 16px;
      color: var(--navy);
      margin: 0 0 6px;
    }
    .empty-desc {
      font-size: 12.5px;
      color: var(--ink-muted);
      max-width: 300px;
      margin: 0 auto;
      line-height: 1.4;
    }

    /* Cart Items list */
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cart-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: #FAF8F2;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      transition: background 0.15s;
    }
    .cart-row:hover {
      background: #F5EFE3;
    }

    .item-thumb {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      background: #FFFDF9;
      border: 1px solid var(--border-strong);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      box-sizing: border-box;
    }
    .item-thumb :deep(img) {
      max-width: 28px;
      max-height: 28px;
      image-rendering: pixelated;
      object-fit: contain;
    }

    .item-info {
      flex: 1;
      min-width: 0;
    }
    .item-name {
      font-weight: 700;
      font-size: 13.5px;
      color: var(--navy);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .unit-price {
      font-size: 11.5px;
      color: var(--ink-muted);
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
    }

    /* Stepper Controls */
    .qty-stepper {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-sm);
      background: #FFFDF9;
      overflow: hidden;
      flex-shrink: 0;
    }
    .step-btn {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      font-weight: 700;
      font-size: 14px;
      color: var(--navy);
      cursor: pointer;
      user-select: none;
      transition: background 0.1s;
    }
    .step-btn:hover {
      background: #EDE5D6;
    }
    .qty-val {
      min-width: 24px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      color: var(--navy);
      padding: 0 4px;
    }

    /* Subtotal */
    .item-subtotal {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--navy);
      min-width: 60px;
      justify-content: flex-end;
    }

    /* Remove button */
    .remove-item-btn {
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: var(--ink-muted);
      border-radius: 4px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s;
    }
    .remove-item-btn:hover {
      background: #FBE5E5;
      color: #9C2738;
    }

    /* Summary Card */
    .cart-summary-card {
      margin-top: 14px;
      padding: 12px 14px;
      background: #F7F3EA;
      border: 1px dashed var(--border-strong);
      border-radius: var(--radius-sm);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .summary-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--navy);
    }
    .summary-label {
      color: #5A6A78;
    }
    .user-coins {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--navy);
    }
    .total-line {
      padding-top: 6px;
      border-top: 1px solid rgba(217, 200, 181, 0.6);
      font-size: 14.5px;
    }
    .total-coins {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 16px;
      color: #8C5E2D;
    }

    /* Insufficient coins warning */
    .insufficient-alert {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 8px 10px;
      background: #FBE5E5;
      border: 1px solid #E8B4B8;
      border-radius: 6px;
      font-size: 11.5px;
      color: #9C2738;
      line-height: 1.35;
      margin-top: 4px;
    }
    .insufficient-alert strong {
      font-weight: 700;
    }

    /* Modal Footer */
    .modal-footer {
      padding: 12px 18px;
      background: #FAF7F0;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .clear-all-btn {
      background: transparent;
      border: none;
      color: #9C2738;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
      padding: 4px;
    }
    .clear-all-btn:hover {
      color: #6D1724;
    }
    .footer-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .btn[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
      filter: grayscale(0.5);
    }

    /* Mobile Responsive adjustments */
    @media (max-width: 480px) {
      .cart-modal-box {
        max-width: calc(100vw - 20px);
      }
      .modal-body {
        padding: 12px;
      }
      .cart-row {
        gap: 8px;
        padding: 8px;
      }
      .item-name {
        font-size: 12.5px;
      }
      .unit-price {
        font-size: 10.5px;
      }
      .item-subtotal {
        font-size: 11.5px;
        min-width: 48px;
      }
      .qty-stepper {
        scale: 0.95;
      }
    }
  `]
})
export class CartModalComponent {
  state = inject(GameStateService);
  close = output<void>();

  getSprite(key: string): string {
    return SPRITES[key] || SPRITES['bundle'];
  }

  checkout() {
    if (this.state.checkoutCart()) {
      this.close.emit();
    }
  }
}
