import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { authFeature } from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly store = inject(Store);

  readonly navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Programmes', path: '/programmes' },
    { label: 'Resources', path: '/resources' },
    { label: 'Events', path: '/events' },
    { label: 'Media', path: '/media' },
    { label: 'Opportunities', path: '/opportunities' },
    { label: 'Community', path: '/community' },
  ];

  readonly menuOpen = signal(false);

  // Read straight from the NgRx store
  readonly isAuthenticated = this.store.selectSignal(authFeature.selectIsAuthenticated);
  readonly user = this.store.selectSignal(authFeature.selectUser);
  readonly firstName = computed(() => this.user()?.fullName.split(' ')[0] ?? '');

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  logout() {
    this.closeMenu();
    this.store.dispatch(AuthActions.logout());
  }
}