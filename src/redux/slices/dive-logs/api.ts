import config from 'react-native-config';

import {
  SimpleFormInitialValues,
  AdvancedFormInitialValues,
  DiveLogReturnValues,
} from '_utils/interfaces/data/logs';

export async function handleCreateDiveLog(
  body: SimpleFormInitialValues,
): Promise<DiveLogReturnValues> {
  try {
    const url = `${config.API_ENDPOINT}/review/add`;
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

export async function handleUpdateDiveLog(
  body: AdvancedFormInitialValues,
): Promise<DiveLogReturnValues> {
  try {
    const url = `${config.API_ENDPOINT}/review/patch`;
    const response = fetch(url, {
      method: 'PATCH',
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
