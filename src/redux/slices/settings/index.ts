import AsyncStorage from '@react-native-community/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../store';

interface SettingsState {
  measurementType?: string;
  activityType?: string;
}

const ACTIVITY_TYPE = 'activityType';
const MEASUREMENT_TYPE = 'measurementType';

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
    await setStorage(settings);
    dispatch(update(settings));
  };

export const autoHydrateSettings = (): AppThunk => async dispatch => {
  const settings: SettingsState = {};
  const activityType = await AsyncStorage.getItem(ACTIVITY_TYPE);
  const measurementType = await AsyncStorage.getItem(MEASUREMENT_TYPE);

  if (activityType) {
    settings.activityType = activityType;
  }

  if (measurementType) {
    settings.measurementType = measurementType;
  }

  dispatch(update(settings));
};

const setStorage = async (settings: SettingsState) => {
  if (settings.activityType) {
    await AsyncStorage.setItem(ACTIVITY_TYPE, settings.activityType);
  }

  if (settings.measurementType) {
    await AsyncStorage.setItem(MEASUREMENT_TYPE, settings.measurementType);
  }
};

export default settingsSlice.reducer;
