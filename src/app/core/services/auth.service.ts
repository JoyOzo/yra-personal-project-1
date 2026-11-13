import { Injectable } from '@angular/core';
import { Observable, defer, of, switchMap, throwError, timer } from 'rxjs';
import { LoginPayload, RegisterPayload, StoredUser, User } from '../../shared/models/user.model';

const USERS_KEY = 'yra_users';
const FAKE_NETWORK_DELAY = 1200; // lets the loading spinner be visible

@Injectable({ providedIn: 'root' })
export class AuthService {
  register(payload: RegisterPayload): Observable<User> {
    return timer(FAKE_NETWORK_DELAY).pipe(
      switchMap(() =>
        defer(() => {
          const users = this.readUsers();
          const email = payload.email.trim().toLowerCase();

          if (users.some((u) => u.email === email)) {
            return throwError(() => new Error('An account with this email already exists.'));
          }

          const newUser: StoredUser = { ...payload, email, id: crypto.randomUUID() };
          localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
          return of(this.toUser(newUser));
        }),
      ),
    );
  }

  login(payload: LoginPayload): Observable<User> {
    return timer(FAKE_NETWORK_DELAY).pipe(
      switchMap(() =>
        defer(() => {
          const email = payload.email.trim().toLowerCase();
          const match = this.readUsers().find(
            (u) => u.email === email && u.password === payload.password,
          );

          return match
            ? of(this.toUser(match))
            : throwError(() => new Error('Invalid email or password.'));
        }),
      ),
    );
  }

  private readUsers(): StoredUser[] {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') as StoredUser[];
    } catch {
      return [];
    }
  }

  private toUser(stored: StoredUser): User {
    const { password, ...user } = stored; // strip the password before it reaches the app state
    return user;
  }
}