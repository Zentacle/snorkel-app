import config from 'react-native-config';
import {
  User,
  Auth,
  LoginResponse,
  UpdateUserReturn,
  GoogleLoginResponse,
} from '_utils/interfaces/data/user';
import { makeCookieHeaders } from '_utils/functions';

export async function handleRegister(body: User): Promise<Auth> {
  try {
    const url = `${config.API_ENDPOINT}/user/register`;
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      const data = await res.json();
      return {
        ...data,
        cookie_header: res.headers.get('set-cookie'),
      };
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function handleLogin(body: User): Promise<LoginResponse> {
  try {
    const url = `${config.API_ENDPOINT}/user/login`;
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      const data = await res.json();
      return {
        ...data,
        cookie_header: res.headers.get('set-cookie'),
      };
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function handleUpdateUser(
  body: User,
  auth_cookie: string,
): Promise<UpdateUserReturn> {
  try {
    const csrf_token = makeCookieHeaders(auth_cookie).csrf_access_token;
    const url = `${config.API_ENDPOINT}/user/patch`;
    const response = fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf_token,
      },
    }).then(res => res.json());
    return response;
  } catch (err) {
    throw err;
  }
}

export async function handleGetUser(username: string) {
  try {
    const url = `${config.API_ENDPOINT}/user/get?username=${username}`;
    const response = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
    return response;
  } catch (err) {
    throw err;
  }
}

export async function handleGoogleregister(body: {
  credential: string;
}): Promise<GoogleLoginResponse> {
  try {
    const url = `${config.API_ENDPOINT}/user/google_register`;
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async res => {
        const data = await res.json();
        return {
          ...data,
          cookie_header: res.headers.get('set-cookie'),
        };
      })
      .catch(err => {
        console.log(err);
      });
    return response;
  } catch (err) {
    throw err;
  }
}
