import { User } from '../../shared/models/user.model';

const SESSION_KEY = 'yra_session';

/** Reads the logged-in user from localStorage (remember me) or sessionStorage. */
export function readSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

/** "Remember me" keeps the session in localStorage; otherwise it ends with the browser tab. */
export function writeSession(user: User, remember: boolean): void {
  clearSession();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}