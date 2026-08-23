export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  // phone?: string;
  password1: string;
  password2: string;
}

export interface authState {
  isLoading: boolean;
  error: string | null;
  isError: boolean;
  isAuthenticated: boolean;
  user: User | null;
  showPassword: boolean;
  detail: string | null;
}

export interface User {
  pk: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  username: string;
  is_verfied: boolean;
}
