export type MeasurementUnit = 'imperial' | 'metric';
export interface User {
  bio?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  id?: number;
  profile_pic?: string;
  registered_on?: Date;
  username?: string;
  password?: string;
  admin?: boolean;
  hometown?: string;
  email?: string;
  access_token?: string;
  unit?: MeasurementUnit;
  wallet_address?: string;
  has_pro?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface CookieHeaders {
  access_token_cookie: string;
  csrf_access_token: string;
  refresh_token_cookie: string;
  csrf_refresh_token: string;
  expiry: string;
}

export interface AuthData {
  auth_token: string;
  refresh_token: string;
  message: string;
  status: string;
  type: 'login' | 'register' | null;
}

export interface LoginResponse {
  data: AuthData;
  user: User;
  msg?: string; // failed login
}

export interface UpdateUserReturn extends User {
  msg?: string;
}
