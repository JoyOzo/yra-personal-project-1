import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from '../services/notification.service';
import { authFeature } from '../../store/auth/auth.reducer';

export const authGuard: CanActivateFn = (_route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const notify = inject(NotificationService);

  // Ask the NgRx store whether someone is logged in
  const isAuthenticated = store.selectSignal(authFeature.selectIsAuthenticated)();
  if (isAuthenticated) {
    return true;
  }

  notify.info('Please log in to access this section.');

  // Redirect to Login and remember where the user was trying to go
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};