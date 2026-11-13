export interface User {
  id: string;
  fullName: string;
  email: string;
  country: string;
  institution: string;
  level: string;
  interests: string;
}

export interface RegisterPayload extends Omit<User, 'id'> {
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

// Only used inside the demo "database". The session never contains the password.
export interface StoredUser extends User {
  password: string;
}