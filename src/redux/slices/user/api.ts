import config from 'react-native-config';
import { User } from '_utils/interfaces/data/user';

interface Auth {
  auth_token: string;
  message: string;
  status: string;
  msg?: string; // failed
}

interface LoginResponse {
  data: Auth;
  user: User;
  msg?: string; // failed login
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
    }).then(res => res.json());
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
    }).then(res => res.json());
    return response;
  } catch (err) {
    throw err;
  }
}
