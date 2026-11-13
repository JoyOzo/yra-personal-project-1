import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EventItem } from '../../shared/models/event.model';

export const EventsActions = createActionGroup({
  source: 'Events',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ items: EventItem[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});