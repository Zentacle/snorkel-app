import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../store';
import { AdvancedFormInitialValues as DiveLog } from '_utils/interfaces/data/logs';

interface DiveLogsState {
  diveLogs: {
    [id: number]: DiveLog;
  };
}

const initialState: DiveLogsState = {
  diveLogs: {},
};

export const diveLogsSlice = createSlice({
  name: 'dive-logs',
  initialState: initialState,
  reducers: {
    getAllDiveLogs: (state, action: PayloadAction<DiveLog[]>) => {
      state.diveLogs = action.payload;
    },
    // NOTE:  this should be temporary and a resolution done as soon as funn api integration is achieved
    saveDiveLog: (state, action: PayloadAction<DiveLog>) => {
      // state.diveLogs.push(action.payload);
      state.diveLogs[action.payload.id as number] = action.payload;
    },
    editDiveLog: (state, action: PayloadAction<DiveLog>) => {
      state.diveLogs[action.payload.id as number] = action.payload;
    },
  },
});

export const { saveDiveLog, editDiveLog } = diveLogsSlice.actions;

export const selectAllDiveLogs = (state: RootState) => state.dive_logs.diveLogs;

export const selectDiveLogById = (id: number) => {
  const selectedDiveLog = createSelector(
    [selectAllDiveLogs],
    diveLogs => diveLogs[id],
  );

  return selectedDiveLog;
};

export default diveLogsSlice.reducer;
