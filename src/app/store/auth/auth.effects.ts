import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { clearSession, writeSession } from '../../core/utils/session.util';
import { AuthActions } from './auth.actions';

// Only allow redirects to pages inside our own app.
function safeReturnUrl(url: string | null): string {
  return url && url.startsWith('/') && !url.startsWith('//') ? url : '/';
}

export const register$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ payload }) =>
        authService.register(payload).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError((error: Error) => of(AuthActions.registerFailure({ error: error.message }))),
        ),
      ),
    ),
  { functional: true },
);

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ payload }) =>
        authService.login(payload).pipe(
          map((user) => AuthActions.loginSuccess({ user, remember: payload.remember })),
          catchError((error: Error) => of(AuthActions.loginFailure({ error: error.message }))),
        ),
      ),
    ),
  { functional: true },
);

export const registerSuccess$ = createEffect(
  (actions$ = inject(Actions), notify = inject(NotificationService), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        notify.success('Registration successful! Please log in.');
        router.navigateByUrl('/login');
      }),
    ),
  { functional: true, dispatch: false },
);

export const loginSuccess$ = createEffect(
  (actions$ = inject(Actions), notify = inject(NotificationService), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user, remember }) => {
        writeSession(user, remember);
        notify.success(`Welcome back, ${user.fullName.split(' ')[0]}!`);
        const returnUrl = router.routerState.snapshot.root.queryParamMap.get('returnUrl');
        router.navigateByUrl(safeReturnUrl(returnUrl));
      }),
    ),
  { functional: true, dispatch: false },
);

export const failure$ = createEffect(
  (actions$ = inject(Actions), notify = inject(NotificationService)) =>
    actions$.pipe(
      ofType(AuthActions.registerFailure, AuthActions.loginFailure),
      tap(({ error }) => notify.error(error)),
    ),
  { functional: true, dispatch: false },
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), notify = inject(NotificationService), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        clearSession();
        notify.success('You have been logged out.');
        router.navigateByUrl('/');
      }),
    ),
  { functional: true, dispatch: false },
);