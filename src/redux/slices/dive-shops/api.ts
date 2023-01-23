import config from 'react-native-config';
import { Platform } from 'react-native';

import type {
  DiveShopFull,
  DiveShopInitialValues,
  DiveShopTypeaheadResponse,
} from '_utils/interfaces/data/shops';
import { FormImages } from '_utils/interfaces/data/logs';
import { NearbyExplore } from '.';

interface ResponseWith<T> {
  data: T;
}

export async function fetchNearbyShops(
  coords: NearbyExplore,
): Promise<ResponseWith<DiveShopFull[]>> {
  try {
    if (coords.latitude && coords.longitude) {
      const url = `${config.API_ENDPOINT}/shop/nearby?lat=${coords.latitude}&lng=${coords.longitude}`;
      const response = fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
      return response;
    } else {
      return {
        'data': [],
      }
    }
  } catch (err) {
    throw err;
  }
}

export async function handleCreateDiveShop(
  body: DiveShopInitialValues,
  auth_token: string,
): Promise<DiveShopFull> {
  try {
    const url = `${config.API_ENDPOINT}/shop/create`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
    }).then(res => res.json());
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function handleUploadDiveShopImage(
  body: FormImages,
  auth_token: string,
  id: number,
) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri:
        Platform.OS === 'android' ? body.uri : body.uri.replace('file://', ''),
      name: body.name,
      type: body.type,
    });
    const url = `${config.API_ENDPOINT}/shop/${id}/logo`;
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

export async function handleUploadStampImage(
  body: FormImages,
  auth_token: string,
  id: number,
) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri:
        Platform.OS === 'android' ? body.uri : body.uri.replace('file://', ''),
      name: body.name,
      type: body.type,
    });
    const url = `${config.API_ENDPOINT}/shop/${id}/stamp_image`;
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

export async function handleTypeAhead(
  query: string,
): Promise<ResponseWith<DiveShopTypeaheadResponse>> {
  try {
    const url = `${config.API_ENDPOINT}/shop/typeahead?${query}`;
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

export async function handleGetDiveShop(
  id: number,
): Promise<ResponseWith<DiveShopFull>> {
  try {
    const url = `${config.API_ENDPOINT}/shop/${id}`;
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

export async function handleTypeAheadNearby(
  query: string,
): Promise<ResponseWith<DiveShopTypeaheadResponse>> {
  try {
    const url = `${config.API_ENDPOINT}/shop/typeahead/nearby?${query}`;
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
