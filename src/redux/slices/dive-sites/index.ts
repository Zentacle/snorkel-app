import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { fetchDiveSites, fetchDiveSite, fetchRecommended } from './api';
import { Spot } from '_utils/interfaces/data/spot';
import { RootState } from '../../store';

interface NormalizedObj {
  [id: string]: Spot;
}
interface DiveSpotState {
  diveSpots: NormalizedObj;
  loading: boolean;
  error: {
    status: boolean;
  };
}

const initialState: DiveSpotState = {
  diveSpots: {},
  loading: false,
  error: {
    status: false,
  },
};

export const handleFetchRecommended = createAsyncThunk(
  'dive-sites/recommended',
  async (_, thunkApi) => {
    const response = await fetchRecommended();
    if (!response.data) {
      return thunkApi.rejectWithValue(response.msg);
    }
    return response.data;
  },
);

export const handleFetchDiveSites = createAsyncThunk(
  'dive-sites/fetchdiveSites',
  async (_, thunkApi) => {
    const response = await fetchDiveSites();
    if (!response.data) {
      return thunkApi.rejectWithValue(response.msg);
    }
    return response.data;
  },
);

export const handleFetchDiveSite = createAsyncThunk(
  'dive-sites/fetchdiveSite',
  async (id: number, thunkApi) => {
    const response = await fetchDiveSite(id);
    if (!response.data) {
      return thunkApi.rejectWithValue(response.msg);
    }
    return response.data;
  },
);

export const diveSitesSlice = createSlice({
  name: 'dive-sites',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(handleFetchDiveSites.pending, state => {
        state.loading = true;
        state.error.status = false;
      })
      .addCase(handleFetchDiveSites.rejected, state => {
        state.loading = false;
        state.error.status = true;
      })
      .addCase(handleFetchDiveSites.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.diveSpots = normalizeData(action.payload);
      })
      .addCase(handleFetchDiveSite.pending, state => {
        state.loading = true;
        state.error.status = false;
      })
      .addCase(handleFetchDiveSite.rejected, state => {
        state.loading = false;
        state.error.status = true;
      })
      .addCase(handleFetchDiveSite.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.diveSpots[action.payload.id] = action.payload;
      });
  },
});

const normalizeData = (data: Spot[]) => {
  const normalizedObj: NormalizedObj = {};
  for (let item of data) {
    normalizedObj[item.id.toString()] = item;
  }
  return normalizedObj;
};

export const selectAllDiveSites = (state: RootState) =>
  state.dive_sites.diveSpots;

export const selectDiveSiteById = (id: number) => {
  const selectedDiveSite = createSelector(
    [selectAllDiveSites],
    diveSites => diveSites[id],
  );

  return selectedDiveSite;
};

export const selectLoadingState = (state: RootState) =>
  state.dive_sites.loading;

export const selectErrorState = (state: RootState) => state.dive_sites.error;

export const isDiveSiteDetailinState = (id: number) => {
  return createSelector(
    [selectAllDiveSites],
    selectedDiveSites =>
      Boolean(selectedDiveSites[id]) && Boolean(selectedDiveSites[id].ratings),
  );
};

export default diveSitesSlice.reducer;
