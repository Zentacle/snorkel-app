import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchDiveSites } from './api';
import { Spot } from '_utils/interfaces/data/spot';
import { AppThunk, RootState } from '../../store';

interface DiveSpotState {
  diveSpots: Spot[];
}

const initialState: DiveSpotState = {
  diveSpots: [],
};

export const diveSitesSlice = createSlice({
  name: 'dive-sites',
  initialState: initialState,
  reducers: {
    getAllDiveSites: (state, action: PayloadAction<Spot[]>) => {
      state.diveSpots = action.payload;
    },
  },
});

const { getAllDiveSites } = diveSitesSlice.actions;

export const selectAllDiveSites = (state: RootState) =>
  state.dive_sites.diveSpots;

export const handleFetchDiveSites =
  (): AppThunk => async (dispatch, _getState) => {
    try {
      const diveSites = await fetchDiveSites();
      dispatch(getAllDiveSites(diveSites.data));
    } catch (err) {
      throw err;
    }
  };

export default diveSitesSlice.reducer;
