import { TypeaheadResponse } from './../../../utils/interfaces/data/search';
import config from 'react-native-config';
import { AutocompleteResponse } from '_utils/interfaces/data/search';
import { Spot } from '_utils/interfaces/data/spot';

interface ResponseWithSpots {
  data: Spot[];
}

interface ResponseWithSpot {
  data: Spot;
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
    const url = `${config.API_ENDPOINT}/search/typeahead?query=${query}`;
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

export async function handleAutocomplete(
  q: string,
): Promise<ResponseWithAutocomplete> {
  try {
    const url = `${config.API_ENDPOINT}/search/autocomplete?q=${q}`;
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
