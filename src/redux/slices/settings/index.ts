import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../store';

interface SettingsState {
  activityType?: string;
}

const ACTIVITY_TYPE = 'activityType';

const initialState: SettingsState = {};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<SettingsState>) => {
      if (action.payload.activityType) {
        state.activityType = action.payload.activityType;
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

  if (activityType) {
    settings.activityType = activityType;
  }

  dispatch(update(settings));
};

const setStorage = async (settings: SettingsState) => {
  if (settings.activityType) {
    await AsyncStorage.setItem(ACTIVITY_TYPE, settings.activityType);
  }
};

export default settingsSlice.reducer;
