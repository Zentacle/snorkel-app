import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import { handleRegister, handleLogin } from './api';
import { User } from '_utils/interfaces/data/user';
import { AppThunk, RootState } from '../../store';

const ACTIVE_USER = 'active_user';
const AUTH_TOKEN = 'auth_token';

interface ErrorObj {
  status: boolean;
  message: string | null;
}

interface UserState {
  active_user: User | null;
  loading: boolean;
  error: ErrorObj;
  auth_token: string | null;
}

const initialState: UserState = {
  active_user: null,
  loading: false,
  error: {
    status: false,
    message: null,
  },
  auth_token: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (user: User, thunkApi) => {
    const response = await handleLogin(user);
    if (!response.data) {
      return thunkApi.rejectWithValue(response.msg);
    }
    await setStorage(response.user, response.data.auth_token);
    return response;
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: User, thunkApi) => {
    const response = await handleRegister(user);
    if (!response.auth_token) {
      return thunkApi.rejectWithValue(response.msg);
    }
    await setStorage(null, response.auth_token);
    return response;
  },
);

export const autoAuth = createAsyncThunk(
  'user/autoAuth',
  async (_, thunkApi) => {
    const userObj = await AsyncStorage.getItem(ACTIVE_USER);
    const tokenStr = await AsyncStorage.getItem(AUTH_TOKEN);
    if (!userObj || !tokenStr) {
      return thunkApi.rejectWithValue('User object not available');
    }
    return {
      active_user: JSON.parse(userObj) as User,
      auth_token: tokenStr,
    };
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state, _action: PayloadAction) => {
      state.active_user = null;
      state.auth_token = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error.status = false;
        state.error.message = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error.status = true;
        state.error.message =
          typeof action.payload === 'string'
            ? action.payload
            : 'There was an error logging in. Please try again later';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.active_user = action.payload.user;
        state.auth_token = action.payload.data.auth_token;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error.status = false;
        state.error.message = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error.status = true;
        state.error.message =
          typeof action.payload === 'string'
            ? action.payload
            : 'There was an error logging in. Please try again later';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.auth_token = action.payload.auth_token;
      })
      .addCase(autoAuth.rejected, (state, action) => {
        state.error.status = true;
        state.error.message = action.payload as string;
      })
      .addCase(autoAuth.fulfilled, (state, action) => {
        state.auth_token = action.payload.auth_token;
        state.active_user = action.payload.active_user;
      });
  },
});

const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.active_user;
export const isLoggedIn = (state: RootState) =>
  Boolean(state.user.active_user && state.user.auth_token);
export const selectErrorState = (state: RootState) => state.user.error;

export const logoutUser = (): AppThunk => async (dispatch, _getState) => {
  try {
    await clearStorage();
    dispatch(logout());
  } catch (err) {
    throw err;
  }
};

const clearStorage = async () => {
  try {
    return (
      await AsyncStorage.removeItem(ACTIVE_USER),
      await AsyncStorage.removeItem(AUTH_TOKEN)
    );
  } catch (err) {
    throw err;
  }
};

const setStorage = async (user: User | null, token?: string) => {
  if (user) {
    await AsyncStorage.setItem(ACTIVE_USER, JSON.stringify(user));
  }
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN, token);
  }
};

export default userSlice.reducer;
