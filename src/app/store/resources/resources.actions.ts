import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Resource, ResourceFilter } from '../../shared/models/resource.model';

export const ResourcesActions = createActionGroup({
  source: 'Resources',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ items: Resource[] }>(),
    'Load Failure': props<{ error: string }>(),
    'Set Search': props<{ search: string }>(),
    'Set Filter': props<{ filter: ResourceFilter }>(),
  },
});