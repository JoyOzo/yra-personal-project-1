import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { readSession } from '../../core/utils/session.util';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: readSession(), // restores the saved session on page refresh
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.register, AuthActions.login, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.registerSuccess, (state) => ({ ...state, loading: false })),
    on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
    on(AuthActions.registerFailure, AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(AuthActions.logout, (state) => ({ ...state, user: null })),
  ),
  // createFeature already gives us selectUser, selectLoading and selectError.
  extraSelectors: ({ selectUser }) => ({
    selectIsAuthenticated: createSelector(selectUser, (user) => user !== null),
  }),
});