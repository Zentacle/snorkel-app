import Geolocation from 'react-native-geolocation-service';
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import { RootState } from '../../store';
import {
  DiveLogsState,
  AdvancedDiveLogReturnValues,
} from '_utils/interfaces/data/logs';
import {
  handleFetchNearbyRecentDiveLogs,
  handleFetchOwnDiveLogs,
  handleFetchSingleDiveLog
} from './api';

interface DiveLogsStoreState {
  diveLogs: {
    [id: number]: DiveLogsState;
  };
  orderedDiveLogs: DiveLogsState[];
  loading: boolean;
  error: {
    status: boolean;
    message: string | null;
  };
  activeDiveLog: AdvancedDiveLogReturnValues | null;
  recentLogs: DiveLogsState[];
}

interface NormalizedObj {
  [id: string]: DiveLogsState;
}

const initialState: DiveLogsStoreState = {
  diveLogs: {},
  orderedDiveLogs: [],
  loading: false,
  error: {
    status: false,
    message: null,
  },
  activeDiveLog: null,
  recentLogs: [],
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

interface RecentNearbyParams {
  auth_token: string;
  position?: Geolocation.GeoPosition;
}

export const fetchSingleDiveLog = createAsyncThunk(
  'dive-logs/fetch-single-dive-log',
  async (id: number, thunkApi) => {
    const response = await handleFetchSingleDiveLog(id)
      .catch(() => ({ msg: 'Could not fetch dive logs'}));;
    if (response.msg) {
      return thunkApi.rejectWithValue({
        msg: response.msg,
        id,
      });
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
    )
    if (response.msg) {
      return thunkApi.rejectWithValue(response.msg);
    }
    AsyncStorage.setItem('dive-logs/fetch-dive-logs', JSON.stringify(response.data));
    return response.data;
  },
);

export const loadOwnDiveLogs = createAsyncThunk(
  'dive-logs/load-dive-logs',
  async (_data, thunkApi) => {
    const diveLogs = await AsyncStorage.getItem('dive-logs/fetch-dive-logs')
    if (!diveLogs) {
      return thunkApi.rejectWithValue('no dive logs');
    }
    return JSON.parse(diveLogs);
  }
)

export const fetchNearbyRecentDiveLogs = createAsyncThunk(
  'dive-logs/fetch-nearby-recent-dive-logs',
  async (params: RecentNearbyParams, thunkApi) => {
    const response = await handleFetchNearbyRecentDiveLogs(
      params.auth_token,
      params.position?.coords.latitude,
      params.position?.coords.longitude,
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
        state.orderedDiveLogs = action.payload.reviews;
      })
      .addCase(loadOwnDiveLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.diveLogs = normalizeData(action.payload.reviews);
        state.orderedDiveLogs = action.payload.reviews;
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
        const payload: any = action.payload;
        state.loading = false;
        state.error.status = false;
        state.error.message = payload.msg
            ? payload.msg
            : 'There was an fetching dive logs. Please try again later';
        state.activeDiveLog = { spot: state.diveLogs[payload.id].spot, review: state.diveLogs[payload.id] };
      })
      .addCase(fetchNearbyRecentDiveLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.recentLogs = action.payload;
      });
  },
});

export const selectAllDiveLogs = (state: RootState) => state.dive_logs.diveLogs;
export const selectOrderedDiveLogs = (state: RootState) => state.dive_logs.orderedDiveLogs;
export const selectRecentDiveLogs = (state: RootState) => state.dive_logs.recentLogs;
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
