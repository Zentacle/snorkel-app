import config from 'react-native-config';
import { Spot } from '_utils/interfaces/data/spot';

interface ResponseWithSpots {
  data: Spot[];
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
