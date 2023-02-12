import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DiveShopFull } from '_utils/interfaces/data/shops';

import { AppThunk, RootState } from '../../store';
import { fetchNearbyShops } from './api';

export interface NearbyExplore {
  latitude?: number;
  longitude?: number;
}

interface DiveShopState {
  shops: DiveShopFull[];
  loading: boolean;
  error: {
    status: boolean;
  };
}

const initialState: DiveShopState = {
  shops: [],
  loading: false,
  error: {
    status: false,
  },
};

export const handleFetchNearbyShops = createAsyncThunk(
  'shops/fetchNearby',
  async (coords: NearbyExplore, thunkApi) => {
    const response = await fetchNearbyShops(coords);
    if (!response.data) {
      return thunkApi.rejectWithValue(response.msg);
    }
    return response.data;
  },
);

export const diveShopSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(handleFetchNearbyShops.pending, state => {
        state.loading = true;
        state.error.status = false;
      })
      .addCase(handleFetchNearbyShops.rejected, state => {
        state.loading = false;
        state.error.status = true;
      })
      .addCase(handleFetchNearbyShops.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.shops = action.payload;
      });
  },
});

export const selectNearbyShops = (state: RootState) => state.dive_shops.shops;

export default diveShopSlice.reducer;
