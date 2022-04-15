import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Spot } from '_utils/interfaces/data/spot';
import { InitialSearchValues } from '_utils/interfaces/data/search';
import { RootState } from '../../store';
import { handleSearch } from './api';

interface NormalizedObj {
  [id: string]: Spot;
}
interface SearchResultsState {
  results: NormalizedObj;
  loading: boolean;
  error: {
    status: boolean;
    message: string | null;
  };
}

const initialState: SearchResultsState = {
  results: {},
  loading: false,
  error: {
    status: false,
    message: null,
  },
};

const normalizeData = (data: Spot[]) => {
  const normalizedObj: NormalizedObj = {};
  for (let item of data) {
    normalizedObj[item.id.toString()] = item;
  }
  return normalizedObj;
};

export const search = createAsyncThunk(
  'search/search',
  async (values: InitialSearchValues, thunkApi) => {
    console.log('triggered redux', values);
    const response = await handleSearch(values);
    if (!response.data) {
      return thunkApi.rejectWithValue('search failed');
    }
    return response.data;
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
    builder
      .addCase(search.pending, state => {
        state.loading = true;
        state.error.status = false;
        state.error.message = null;
      })
      .addCase(search.rejected, (state, action) => {
        state.loading = false;
        state.error.status = true;
        state.error.message =
          typeof action.payload === 'string'
            ? action.payload
            : 'There was an error completing the search. Please try again';
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.results = normalizeData(action.payload);
      });
  },
});

export const selectSearchResults = (state: RootState) => {
  state.search.results;
};

export default searchSlice.reducer;
