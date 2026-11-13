import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Resource, ResourceFilter } from '../../shared/models/resource.model';
import { ResourcesActions } from './resources.actions';

export interface ResourcesState {
  items: Resource[];
  loading: boolean;
  error: string | null;
  search: string;
  filter: ResourceFilter;
}

const initialState: ResourcesState = {
  items: [],
  loading: false,
  error: null,
  search: '',
  filter: 'all',
};

export const resourcesFeature = createFeature({
  name: 'resources',
  reducer: createReducer(
    initialState,
    on(ResourcesActions.load, (state) => ({ ...state, loading: true, error: null })),
    on(ResourcesActions.loadSuccess, (state, { items }) => ({ ...state, items, loading: false })),
    on(ResourcesActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(ResourcesActions.setSearch, (state, { search }) => ({ ...state, search })),
    on(ResourcesActions.setFilter, (state, { filter }) => ({ ...state, filter })),
  ),
  // A derived selector: combines three pieces of state into the list the page shows
  extraSelectors: ({ selectItems, selectSearch, selectFilter }) => ({
    selectVisibleItems: createSelector(
      selectItems,
      selectSearch,
      selectFilter,
      (items, search, filter) => {
        const query = search.trim().toLowerCase();
        return items.filter(
          (r) =>
            (filter === 'all' || r.type === filter || r.category === filter) &&
            (!query ||
              r.title.toLowerCase().includes(query) ||
              r.description.toLowerCase().includes(query)),
        );
      },
    ),
  }),
});