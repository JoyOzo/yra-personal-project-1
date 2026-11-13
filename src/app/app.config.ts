import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withInMemoryScrolling,
} from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authFeature } from './store/auth/auth.reducer';
import * as authEffects from './store/auth/auth.effects';
import { resourcesFeature } from './store/resources/resources.reducer';
import * as resourcesEffects from './store/resources/resources.effects';
import { eventsFeature } from './store/events/events.reducer';
import * as eventsEffects from './store/events/events.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideStore(),
    provideState(authFeature),
    provideState(resourcesFeature),
    provideState(eventsFeature),
    provideEffects(authEffects, resourcesEffects, eventsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};