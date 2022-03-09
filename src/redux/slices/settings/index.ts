import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../store';

interface SettingsState {
  measurementType?: string;
  activityType?: string;
}

const initialState: SettingsState = {};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<SettingsState>) => {
      if (action.payload.activityType) {
        state.activityType = action.payload.activityType;
      }
      if (action.payload.measurementType) {
        state.measurementType = action.payload.measurementType;
      }
    },
  },
});

const { update } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const updateSettings =
  (settings: SettingsState): AppThunk =>
  async (dispatch, _getState) => {
    dispatch(update(settings));
  };

export default settingsSlice.reducer;
