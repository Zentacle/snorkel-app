import config from 'react-native-config';
import { Spot } from '_utils/interfaces/data/spot';
import type {
  RecommendedArgs,
  ResponseWithImages,
} from '_utils/interfaces/data/spot';
import { NearbyExplore } from '.';
import { NewDiveSiteForm } from '_utils/interfaces/data/logs';

interface ResponseWithSpots {
  data: Spot[];
  msg: string;
}

interface ResponseWithSpot {
  data: Spot;
  msg: string;
}

export async function fetchDiveSites(
  coords: NearbyExplore,
): Promise<ResponseWithSpots> {
  try {
    let url = `${config.API_ENDPOINT}/spots/get`;

    if (coords.latitude && coords.longitude) {
      url = `${config.API_ENDPOINT}/spots/nearby?lat=${coords.latitude}&lng=${coords.longitude}`;
    }

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
  args: RecommendedArgs,
): Promise<ResponseWithSpots> {
  try {
    let url = `${config.API_ENDPOINT}/spots/recs`;
    if (args.latitude && args.latitude) {
      url = `${config.API_ENDPOINT}/spots/recs?lat=${args.latitude}&lng=${args.longitude}`;
    }
    const response = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.token}`,
      },
    }).then(res => res.json());
    return response;
  } catch (err) {
    throw err;
  }
}

export async function fetchDiveSiteImages(
  beach_id: number,
): Promise<ResponseWithImages> {
  try {
    const url = `${config.API_ENDPOINT}/beachimages?beach_id=${beach_id}`;
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

export async function fetchCreateDiveSite(
  body: NewDiveSiteForm,
  auth_token: string,
): Promise<any> {
  try {
    const url = `${config.API_ENDPOINT}/spots/add`;
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...body,
        latitude: body.location.lat,
        longitude: body.location.lng,
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
