import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PIXEL_UI_ICONS } from '../../../core/constants/pixel-ui-icons.constant';

@Component({
  selector: 'app-pixel-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="pixel-icon-host"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [innerHTML]="safeSvg()">
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 0;
    }
    .pixel-icon-host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .pixel-icon-host ::ng-deep svg {
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      shape-rendering: crispEdges;
      display: block;
    }
  `]
})
export class PixelIconComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly name = input.required<string>();
  readonly size = input<number>(18);

  readonly safeSvg = computed<SafeHtml>(() => {
    const raw = PIXEL_UI_ICONS[this.name()] ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });
}
