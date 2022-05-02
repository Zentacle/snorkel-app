import config from 'react-native-config';
import { Spot } from '_utils/interfaces/data/spot';

interface ResponseWithSpots {
  data: Spot[];
  msg: string;
}

interface ResponseWithSpot {
  data: Spot;
  msg: string;
}

export async function fetchDiveSites(): Promise<ResponseWithSpots> {
  try {
    const url = `${config.API_ENDPOINT}/spots/get`;
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

export async function fetchDiveSite(
  beach_id: number,
): Promise<ResponseWithSpot> {
  try {
    const url = `${config.API_ENDPOINT}/spots/get?beach_id=${beach_id}`;
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

export async function fetchNearby(
  beach_id: number,
): Promise<ResponseWithSpots> {
  try {
    const url = `${config.API_ENDPOINT}/spots/nearby?beach_id=${beach_id}`;
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

export async function fetchRecommended(
  token: string,
): Promise<ResponseWithSpots> {
  try {
    const url = `${config.API_ENDPOINT}/spots/recs`;
    const response = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
    return response;
  } catch (err) {
    throw err;
  }
}
