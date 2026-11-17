import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, PixelIconComponent],
  template: `
    <div class="modal-backdrop open" (click)="close.emit()">
      <div class="modal-box" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3 class="serif-title" style="font-size:18px; display:flex; align-items:center; gap:8px;">
            <app-pixel-icon name="icon_cart" [size]="18"></app-pixel-icon>
            <span>Giỏ hàng nông trại</span>
          </h3>
          <button class="close-btn" (click)="close.emit()">✕</button>
        </div>

        <div class="modal-body">
          @if (state.cart().length === 0) {
            <p style="text-align:center; color:var(--ink-muted); padding:24px 0;">
              Giỏ hàng của bạn đang trống!
            </p>
          } @else {
            <div class="cart-items">
              @for (item of state.cart(); track item.item.id) {
                <div class="cart-row">
                  <div class="cart-name">
                    <div>{{ item.item.name }}</div>
                    <small style="color:var(--ink-muted); display:inline-flex; align-items:center; gap:4px;">
                      <app-pixel-icon name="icon_coin" [size]="12"></app-pixel-icon>
                      <span>{{ item.item.price }} Xu x {{ item.qty }}</span>
                    </small>
                  </div>
                  <div class="cart-price" style="display:inline-flex; align-items:center; gap:4px;">
                    <app-pixel-icon name="icon_coin" [size]="13"></app-pixel-icon>
                    <span>{{ item.item.price * item.qty }} Xu</span>
                  </div>
                </div>
              }
            </div>
            <div class="cart-summary">
              <span>Tổng thanh toán:</span>
              <strong style="color:var(--gold-dark);font-size:16px; display:inline-flex; align-items:center; gap:4px;">
                <app-pixel-icon name="icon_coin" [size]="15"></app-pixel-icon>
                <span>{{ state.cartTotal() }} Xu</span>
              </strong>
            </div>
          }
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" (click)="close.emit()">Đóng</button>
          @if (state.cart().length > 0) {
            <button class="btn btn-primary" (click)="checkout()">Thanh toán ngay</button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close-btn {
      font-size: 16px;
      color: var(--ink-muted);
    }
    .modal-body {
      padding: 20px;
      max-height: 360px;
      overflow-y: auto;
    }
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .cart-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px dashed var(--border);
    }
    .cart-name {
      font-weight: 600;
      font-size: 13.5px;
    }
    .cart-price {
      font-weight: 700;
    }
    .cart-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid var(--border-strong);
      font-size: 15px;
    }
    .modal-footer {
      padding: 14px 20px;
      background: var(--bg-paper);
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  `]
})
export class CartModalComponent {
  state = inject(GameStateService);
  close = output<void>();

  checkout() {
    if (this.state.checkoutCart()) {
      this.close.emit();
    }
  }
}
