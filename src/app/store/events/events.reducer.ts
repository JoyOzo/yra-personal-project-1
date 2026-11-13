import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EventItem } from '../../shared/models/event.model';
import { EventsActions } from './events.actions';

export interface EventsState {
  items: EventItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = { items: [], loading: false, error: null };

export const eventsFeature = createFeature({
  name: 'events',
  reducer: createReducer(
    initialState,
    on(EventsActions.load, (state) => ({ ...state, loading: true, error: null })),
    on(EventsActions.loadSuccess, (state, { items }) => ({ ...state, items, loading: false })),
    on(EventsActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
  ),
  // Derived selector: events sorted soonest first
  extraSelectors: ({ selectItems }) => ({
    selectUpcoming: createSelector(selectItems, (items) =>
      [...items].sort((a, b) => a.date.localeCompare(b.date)),
    ),
  }),
});