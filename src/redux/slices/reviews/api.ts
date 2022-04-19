import config from 'react-native-config';
import { Review } from '_utils/interfaces/data/review';

interface ResponseWithReviews {
  data: Review[];
}

export async function fetchReviews(
  beach_id: number,
): Promise<ResponseWithReviews> {
  try {
    const url = `${config.API_ENDPOINT}/reviews/get?beach_id=${beach_id}`;
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
