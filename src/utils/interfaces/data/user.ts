export interface User {
  display_name: string;
  first_name: string;
  last_name: string;
  id: number;
  profile_pic?: string;
  registered_on: Date;
  username: string;
  password: string;
  admin: boolean;
  hometown: string;
}

export interface CookieHeaders {
  access_token_cookie: string;
  csrf_access_token: string;
  refresh_token_cookie: string;
  csrf_refresh_token: string;
  expiry: string;
}
