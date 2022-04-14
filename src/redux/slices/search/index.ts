import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Spot } from '_utils/interfaces/data/spot';
import { AppThunk, RootState } from '../../store';
import { handleTypeAhead, handleAutocomplete } from './api';

interface NormalizedObj {
  [id: string]: Spot;
}
interface SearchResultsState {
  results: NormalizedObj;
  loading: boolean;
  error: {
    status: boolean;
  };
}

const initialState: SearchResultsState = {
  results: {},
  loading: false,
  error: {
    status: false,
  },
};

export const typeAhead = createAsyncThunk(
  'search/typeahead',
  async (query: string, thunkApi) => {
    const response = await handleTypeAhead(query);
    return response;
    console.log('typeahead response', response);
  },
);

export const autocomplete = createAsyncThunk(
  'search/autocomplete',
  async (query: string, thunkApi) => {
    const response = await handleAutocomplete(query);
    console.log('autocomplete response', response);
  },
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(autocomplete.pending, state => {});
  },
});

export default searchSlice.reducer;
