import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { EventService } from '../../core/services/event.service';
import { NotificationService } from '../../core/services/notification.service';
import { EventsActions } from './events.actions';

export const loadEvents$ = createEffect(
  (actions$ = inject(Actions), eventService = inject(EventService)) =>
    actions$.pipe(
      ofType(EventsActions.load),
      exhaustMap(() =>
        eventService.getEvents().pipe(
          map((items) => EventsActions.loadSuccess({ items })),
          catchError((error: Error) => of(EventsActions.loadFailure({ error: error.message }))),
        ),
      ),
    ),
  { functional: true },
);

export const loadEventsFailure$ = createEffect(
  (actions$ = inject(Actions), notify = inject(NotificationService)) =>
    actions$.pipe(
      ofType(EventsActions.loadFailure),
      tap(() => notify.error('Could not load events. Please try again.')),
    ),
  { functional: true, dispatch: false },
);