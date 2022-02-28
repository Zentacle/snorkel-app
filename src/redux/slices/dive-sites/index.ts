import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchDiveSites,
  fetchNearby,
  fetchDiveSite,
  fetchReviews,
} from './api';
import { Spot } from '_utils/interfaces/data/spot';
import { AppThunk, RootState } from '../../store';

interface NormalizedObj {
  [id: string]: Spot;
}
interface DiveSpotState {
  diveSpots: NormalizedObj;
}

const initialState: DiveSpotState = {
  diveSpots: {},
};

export const diveSitesSlice = createSlice({
  name: 'dive-sites',
  initialState: initialState,
  reducers: {
    getAllDiveSites: (state, action: PayloadAction<Spot[]>) => {
      state.diveSpots = normalizeData(action.payload);
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

const { getAllDiveSites } = diveSitesSlice.actions;

export const selectAllDiveSites = (state: RootState) =>
  state.dive_sites.diveSpots;

export const selectDiveSiteById = (id: number) => {
  const selectedDiveSite = createSelector(
    [selectAllDiveSites],
    diveSites => diveSites[id],
  );

  return selectedDiveSite;
};

export const handleFetchDiveSites =
  (): AppThunk => async (dispatch, _getState) => {
    try {
      const diveSites = await fetchDiveSites();
      dispatch(getAllDiveSites(diveSites.data));
    } catch (err) {
      throw err;
    }
  };

export const handleFetchDiveSite = async (id: number) => {
  try {
    const diveSite = await fetchDiveSite(id);
    return diveSite.data;
  } catch (err) {
    throw err;
  }
};

export const handleFetchReviews = async (id: number) => {
  try {
    const review = await fetchReviews(id);
    return review.data;
  } catch (err) {
    throw err;
  }
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
