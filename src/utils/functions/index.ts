import { CookieHeaders } from '../interfaces/data/user';
export * from './component';

export function capitalize(str: string) {
  if (!str) {
    return;
  }
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

export function makeCookieHeaders(cookie_input: string): CookieHeaders {
  const cookie_output: { [key: string]: string } = {};
  const cookies_arr = cookie_input.split('Path=/,');

  for (let cookie of cookies_arr) {
    const cookie_item = cookie.trim().split(';');
    const [key, val] = cookie_item[0].split('=');
    (cookie_output[key] as string) = val;
  }

  // use only one expiry date since all of them expire at the same time.
  let accessTokenSection = cookies_arr[0].trim().split(';');
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  let [_, expiry] = accessTokenSection[1].split('=');
  cookie_output.expiry = expiry;

  return cookie_output as unknown as CookieHeaders;
}
