import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of state.toasts(); track toast.id) {
        <div class="toast-bubble">
          {{ toast.text }}
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 120;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    }
    .toast-bubble {
      background: var(--navy);
      color: #FFFDF9;
      padding: 10px 18px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid rgba(232, 215, 168, 0.4);
      box-shadow: 0 4px 16px rgba(38, 56, 71, 0.25);
      animation: toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes toastIn {
      from { transform: translateY(12px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  state = inject(GameStateService);
}
