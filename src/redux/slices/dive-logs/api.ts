import config from 'react-native-config';
import { Platform } from 'react-native';
import {
  SimpleFormInitialValues,
  AdvancedFormInitialValues,
  SimpleDiveLogReturnValues,
  AdvancedDiveLogReturnValues,
  DiveLogsState,
  FormImages,
} from '_utils/interfaces/data/logs';
interface OwnDiveLogsResponse {
  data: {
    reviews: DiveLogsState[];
  };
  msg: string;
}

export async function handleUploadDiveLogImages(
  body: FormImages[] = [],
  auth_token: string,
) {
  try {
    const formData = new FormData();
    body.forEach(asset => {
      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? asset.uri
            : asset.uri.replace('file://', ''),
        name: asset.name,
        type: asset.type,
      });
    });
    const url = `${config.API_ENDPOINT}/review/upload`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }).then(res => res.json());
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function handleCreateDiveLog(
  body: SimpleFormInitialValues,
  auth_token: string,
): Promise<SimpleDiveLogReturnValues> {
  try {
    console.log('body', body);
    const url = `${config.API_ENDPOINT}/review/add`;
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...body,
        include_wallet: 'true',
      }),
      headers: {
        'content-type': 'application/json',
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
  auth_token: string,
): Promise<AdvancedDiveLogReturnValues> {
  try {
    const url = `${config.API_ENDPOINT}/review/patch`;
    const response = fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        ...body,
        include_wallet: 'true',
      }),
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

export async function handleFetchOwnDiveLogs(
  auth_token: string,
  username: string,
): Promise<OwnDiveLogsResponse> {
  try {
    const url = `${config.API_ENDPOINT}/user/get?username=${username}`;
    const response = fetch(url, {
      method: 'GET',
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
