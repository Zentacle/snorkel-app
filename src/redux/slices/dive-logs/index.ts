import { createSlice } from '@reduxjs/toolkit';
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

export const selectAllDiveLogs = (state: RootState) =>
  Object.values(state.dive_logs.diveLogs);

export const selectDiveLog = (state: RootState, id: number) =>
  state.dive_logs.diveLogs[id];

export default diveLogsSlice.reducer;
