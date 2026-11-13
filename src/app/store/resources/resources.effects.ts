import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';
import { ResourceService } from '../../core/services/resource.service';
import { ResourcesActions } from './resources.actions';

export const loadResources$ = createEffect(
  (actions$ = inject(Actions), resourceService = inject(ResourceService)) =>
    actions$.pipe(
      ofType(ResourcesActions.load),
      exhaustMap(() =>
        resourceService.getResources().pipe(
          map((items) => ResourcesActions.loadSuccess({ items })),
          catchError((error: Error) => of(ResourcesActions.loadFailure({ error: error.message }))),
        ),
      ),
    ),
  { functional: true },
);

export const loadResourcesFailure$ = createEffect(
  (actions$ = inject(Actions), notify = inject(NotificationService)) =>
    actions$.pipe(
      ofType(ResourcesActions.loadFailure),
      tap(() => notify.error('Could not load resources. Please try again.')),
    ),
  { functional: true, dispatch: false },
);