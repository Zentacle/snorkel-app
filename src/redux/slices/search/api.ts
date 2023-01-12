import config from 'react-native-config';
import qs from 'qs';
import {
  AutocompleteResponse,
  TypeaheadResponse,
  InitialSearchValues,
} from '_utils/interfaces/data/search';
import { Spot } from '_utils/interfaces/data/spot';

interface ResponseWithSpots {
  data: Spot[];
}

interface ResponseWithAutocomplete {
  data: AutocompleteResponse[];
}

interface ResponseWithTypeahead {
  data: TypeaheadResponse[];
}

export async function handleTypeAhead(
  query: string,
): Promise<ResponseWithTypeahead> {
  try {
    const url = `${config.API_ENDPOINT}/search/typeahead?${query}`;
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
): Promise<ResponseWithTypeahead> {
  try {
    const url = `${config.API_ENDPOINT}/search/typeahead/nearby?${query}`;
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

export async function handleSearch(
  values: InitialSearchValues,
): Promise<ResponseWithSpots> {
  try {
    const queryString = qs.stringify(values);

    const url = `${config.API_ENDPOINT}/spots/search?${queryString}`;
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
