import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginPayload, RegisterPayload, User } from '../../shared/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ payload: RegisterPayload }>(),
    'Register Success': emptyProps(),
    'Register Failure': props<{ error: string }>(),

    Login: props<{ payload: LoginPayload }>(),
    'Login Success': props<{ user: User; remember: boolean }>(),
    'Login Failure': props<{ error: string }>(),

    Logout: emptyProps(),
  },
});