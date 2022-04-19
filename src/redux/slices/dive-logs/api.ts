import config from 'react-native-config';
import {
  SimpleFormInitialValues,
  AdvancedFormInitialValues,
  SimpleDiveLogReturnValues,
  AdvancedDiveLogReturnValues,
  DiveLogsState,
} from '_utils/interfaces/data/logs';

import { makeCookieHeaders } from '_utils/functions';
interface OwnDiveLogsResponse {
  data: {
    reviews: DiveLogsState[];
  };
  msg: string;
}

export async function handleCreateDiveLog(
  body: SimpleFormInitialValues,
  auth_cookie: string,
  auth_token: string,
): Promise<SimpleDiveLogReturnValues> {
  try {
    const url = `${config.API_ENDPOINT}/review/add`;
    // const csrf_token = makeCookieHeaders(auth_cookie).csrf_access_token;
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        // 'X-CSRF-TOKEN': csrf_token,
        Authorization: `Bearer ${auth_token}`,
      },
    }).then(res => res.json());
    return response;
  } catch (err) {
    throw err;
  }
}

export async function handleUpdateDiveLog(
  body: AdvancedFormInitialValues,
  auth_cookie: string,
): Promise<AdvancedDiveLogReturnValues> {
  try {
    const url = `${config.API_ENDPOINT}/review/patch`;
    const csrf_token = makeCookieHeaders(auth_cookie).csrf_access_token;
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

export async function handleFetchOwnDiveLogs(
  auth_cookie: string,
  username: string,
): Promise<OwnDiveLogsResponse> {
  try {
    const url = `${config.API_ENDPOINT}/user/get?username=${username}`;
    const csrf_token = makeCookieHeaders(auth_cookie).csrf_access_token;
    const response = fetch(url, {
      method: 'GET',
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

export async function handleFetchSingleDiveLog(
  id: number,
): Promise<AdvancedDiveLogReturnValues> {
  try {
    const url = `${config.API_ENDPOINT}/review/get?review_id=${id}`;
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
