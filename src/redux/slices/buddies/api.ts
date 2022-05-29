import config from 'react-native-config';

import { User } from '_utils/interfaces/data/user';
import { NearbyExplore } from '.';

interface ResponseWithUsers {
  data: User[];
  msg?: string;
}

export async function fetchNearbyBuddies(
  coords: NearbyExplore,
): Promise<ResponseWithUsers> {
  try {
    if (coords.latitude && coords.longitude) {
      const url = `${config.API_ENDPOINT}/users/nearby?latitude=${coords.latitude}&longitude=${coords.longitude}`;
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