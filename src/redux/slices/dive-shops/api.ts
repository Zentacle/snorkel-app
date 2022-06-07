import config from 'react-native-config';
import { Platform } from 'react-native';

import type {
  DiveShopFull,
  DiveShopInitialValues,
} from '_utils/interfaces/data/shops';
import { FormImages } from '_utils/interfaces/data/logs';

export async function handleCreateDiveShop(
  body: DiveShopInitialValues,
  auth_token: string,
): Promise<DiveShopFull> {
  try {
    const url = `${config.API_ENDPOINT}/shop/create`;
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
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

export async function handleUploadDiveShopImages(
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
    const url = `${config.API_ENDPOINT}/shop/upload`;
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
