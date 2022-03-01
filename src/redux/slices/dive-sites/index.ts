import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchDiveSites, fetchNearby, fetchDiveSite } from './api';
import { Spot } from '_utils/interfaces/data/spot';
import { AppThunk, RootState } from '../../store';

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

export const diveSitesSlice = createSlice({
  name: 'dive-sites',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    getAllDiveSites: (state, action: PayloadAction<Spot[]>) => {
      state.diveSpots = normalizeData(action.payload);
    },
    getDiveSite: (state, action: PayloadAction<Spot>) => {
      state.diveSpots[action.payload.id] = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error.status = action.payload;
    },
  },
});

const normalizeData = (data: Spot[]) => {
  const normalizedObj: NormalizedObj = {};
  for (let item of data) {
    normalizedObj[item.id.toString()] = item;
  }
  return normalizedObj;
};

const { getAllDiveSites, getDiveSite, setLoading, setError } =
  diveSitesSlice.actions;

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

export const handleFetchDiveSites =
  (): AppThunk => async (dispatch, _getState) => {
    try {
      dispatch(setLoading(true));
      const diveSites = await fetchDiveSites();
      dispatch(getAllDiveSites(diveSites.data));
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (err) {
      dispatch(setError(true));
      throw err;
    }
  };

export const handleFetchDiveSite =
  (id: number): AppThunk =>
  async (dispatch, _getState) => {
    try {
      dispatch(setLoading(true));
      const diveSite = await fetchDiveSite(id);
      // add divesite to dive sites object in state so we needen't make
      // network calls if a dive site exists in state
      dispatch(getDiveSite(diveSite.data));
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (err) {
      dispatch(setError(true));
      throw err;
    }
  };

export const isDiveSiteDetailinState = (id: number) => {
  return createSelector(
    [selectAllDiveSites],
    selectedDiveSites =>
      Boolean(selectedDiveSites[id]) && Boolean(selectedDiveSites[id].ratings),
  );
};

export const handleFetchNearby = async (id: number) => {
  try {
    const recommended = await fetchNearby(id);
    return recommended.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default diveSitesSlice.reducer;
