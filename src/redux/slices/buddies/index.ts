import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { RootState } from '../../store';
import {
  fetchNearbyBuddies,
} from './api';
import { User } from '_utils/interfaces/data/user';

interface BuddyState {
  buddies: User[];
  loading: boolean;
  error: {
    status: boolean;
  };
}

const initialState: BuddyState = {
  buddies: [],
  loading: false,
  error: {
    status: false,
  },
};

export interface NearbyExplore {
  latitude?: number;
  longitude?: number;
}

export const handleFetchNearbyBuddies = createAsyncThunk(
  'buddies/fetchNearby',
  async (coords: NearbyExplore, thunkApi) => {
    const response = await fetchNearbyBuddies(coords);
    if (!response.data) {
      return thunkApi.rejectWithValue(response.msg);
    }
    return response.data;
  },
);

export const buddiesSlice = createSlice({
  name: 'buddies',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(handleFetchNearbyBuddies.pending, state => {
        state.loading = true;
        state.error.status = false;
      })
      .addCase(handleFetchNearbyBuddies.rejected, state => {
        state.loading = false;
        state.error.status = true;
      })
      .addCase(handleFetchNearbyBuddies.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.buddies = action.payload;
      })
  },
});

export const selectNearbyBuddies = (state: RootState) =>
  state.buddies.buddies;

export default buddiesSlice.reducer;
