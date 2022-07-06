import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { RootState } from '../../store';
import {
  DiveLogsState,
  AdvancedDiveLogReturnValues,
} from '_utils/interfaces/data/logs';
import { handleFetchOwnDiveLogs, handleFetchSingleDiveLog } from './api';

interface DiveLogsStoreState {
  diveLogs: {
    [id: number]: DiveLogsState;
  };
  loading: boolean;
  error: {
    status: boolean;
    message: string | null;
  };
  activeDiveLog: AdvancedDiveLogReturnValues | null;
}

interface NormalizedObj {
  [id: string]: DiveLogsState;
}

const initialState: DiveLogsStoreState = {
  diveLogs: {},
  loading: false,
  error: {
    status: false,
    message: null,
  },
  activeDiveLog: null,
};

const normalizeData = (data: DiveLogsState[]) => {
  const normalizedObj: NormalizedObj = {};
  for (let item of data) {
    normalizedObj[item.id.toString()] = item;
  }
  return normalizedObj;
};

interface UserAuthCookie {
  auth_token: string;
  username: string;
}

export const fetchSingleDiveLog = createAsyncThunk(
  'dive-logs/fetch-single-dive-log',
  async (id: number, thunkApi) => {
    const response = await handleFetchSingleDiveLog(id);
    console.log('single resp', response);
    if (response.msg) {
      return thunkApi.rejectWithValue(response.msg);
    }
    return response;
  },
);

export const fetchOwnDiveLogs = createAsyncThunk(
  'dive-logs/fetch-dive-logs',
  async (userAuth: UserAuthCookie, thunkApi) => {
    const response = await handleFetchOwnDiveLogs(
      userAuth.auth_token,
      userAuth.username,
    );
    if (response.msg) {
      return thunkApi.rejectWithValue(response.msg);
    }
    return response.data;
  },
);

export const diveLogsSlice = createSlice({
  name: 'dive-logs',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOwnDiveLogs.pending, state => {
        state.loading = true;
        state.error.status = false;
        state.error.message = null;
        // state.diveLogs = {};
      })
      .addCase(fetchOwnDiveLogs.rejected, (state, action) => {
        state.loading = false;
        state.error.status = true;
        state.error.message =
          typeof action.payload === 'string'
            ? action.payload
            : 'There was an fetching dive logs. Please try again later';
      })
      .addCase(fetchOwnDiveLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.diveLogs = normalizeData(action.payload.reviews);
      })
      .addCase(fetchSingleDiveLog.pending, state => {
        state.loading = true;
        state.error.status = false;
        state.error.message = null;
        state.activeDiveLog = null;
      })
      .addCase(fetchSingleDiveLog.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.activeDiveLog = action.payload;
      })
      .addCase(fetchSingleDiveLog.rejected, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message =
          typeof action.payload === 'string'
            ? action.payload
            : 'There was an fetching dive logs. Please try again later';
        state.activeDiveLog = null;
      });
  },
});

export const selectAllDiveLogs = (state: RootState) => state.dive_logs.diveLogs;
export const selectDiveLogsLoadingState = (state: RootState) =>
  state.dive_logs.loading;

export const selectDiveLogById = (id: number) => {
  const selectedDiveLog = createSelector(
    [selectAllDiveLogs],
    diveLogs => diveLogs[id],
  );

  return selectedDiveLog;
};

export const selectActiveDiveLog = (state: RootState) =>
  state.dive_logs.activeDiveLog;

export default diveLogsSlice.reducer;
