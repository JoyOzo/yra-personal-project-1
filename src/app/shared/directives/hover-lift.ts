import { computed, Directive, input, signal } from '@angular/core';

/**
 * Lifts an element slightly and adds a shadow while the mouse is over it.
 * Usage: <div appHoverLift> or <div appHoverLift [liftBy]="8">
 */
@Directive({
  selector: '[appHoverLift]',
  host: {
    '(mouseenter)': 'lifted.set(true)',
    '(mouseleave)': 'lifted.set(false)',
    '[style.transition]': '"transform 0.2s ease, box-shadow 0.2s ease"',
    '[style.transform]': 'transform()',
    '[style.box-shadow]': 'shadow()',
  },
})
export class HoverLift {
  readonly liftBy = input(4);

  readonly lifted = signal(false);
  readonly transform = computed(() => (this.lifted() ? `translateY(-${this.liftBy()}px)` : null));
  readonly shadow = computed(() => (this.lifted() ? '0 16px 34px rgba(16, 42, 52, 0.16)' : null));
}