import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { CartModalComponent } from './shared/components/cart-modal/cart-modal.component';
import { GameStateService } from './core/services/game-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TopbarComponent,
    ToastComponent,
    CartModalComponent
  ],
  template: `
    <div class="app-shell">
      <app-sidebar></app-sidebar>
      <div class="main-content" [class.desktop-collapsed]="state.isDesktopSidebarCollapsed()">
        <app-topbar (openCart)="isCartOpen.set(true)"></app-topbar>
        <main class="content-body">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Toast Container -->
      <app-toast></app-toast>

      <!-- Cart Modal -->
      @if (isCartOpen()) {
        <app-cart-modal (close)="isCartOpen.set(false)"></app-cart-modal>
      }
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      min-height: 100vh;
    }
    .main-content {
      margin-left: 82px;
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      transition: margin-left 0.25s ease;
    }
    .main-content.desktop-collapsed {
      margin-left: 0 !important;
    }
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0 !important;
      }
      .content-body {
        padding: 14px 14px 40px;
      }
    }
    .content-body {
      flex: 1;
      padding: 24px 28px 48px;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  state = inject(GameStateService);
  isCartOpen = signal<boolean>(false);
}
