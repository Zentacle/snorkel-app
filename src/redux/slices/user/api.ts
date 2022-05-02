import config from 'react-native-config';
import {
  User,
  Auth,
  LoginResponse,
  UpdateUserReturn,
  GoogleLoginResponse,
} from '_utils/interfaces/data/user';

interface GetCurrentUserResponse extends User {
  cookie_header: string;
}

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
  auth_token: string,
): Promise<UpdateUserReturn> {
  try {
    const url = `${config.API_ENDPOINT}/user/patch`;
    const response = fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
    }).then(res => res.json());
    return response;
  } catch (err) {
    throw err;
  }
}

export async function handleGetCurrentUser(
  refresh_token: string,
): Promise<GetCurrentUserResponse> {
  try {
    const url = `${config.API_ENDPOINT}/user/me`;
    const response = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh_token}`,
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
