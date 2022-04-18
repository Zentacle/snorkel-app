import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import {
  handleRegister,
  handleLogin,
  handleUpdateUser,
  handleGoogleregister,
  handleGetCurrentUser,
} from './api';
import { User, GoogleLoginResponse } from '_utils/interfaces/data/user';
import { AppThunk, RootState } from '../../store';
// import { makeCookieHeaders } from '_utils/functions';

const ACTIVE_USER = 'active_user';
const AUTH_TOKEN = 'auth_token';
const AUTH_COOKIE = 'auth_cookie';

interface ErrorObj {
  status: boolean;
  message: string | null;
}

interface UserState {
  active_user: User | null;
  loading: boolean;
  error: ErrorObj;
  auth_token: string | null;
  auth_cookie: string | null;
  autoAuthLoading: boolean;
}

const initialState: UserState = {
  active_user: null,
  loading: false,
  autoAuthLoading: false,
  error: {
    status: false,
    message: null,
  },
  auth_token: null,
  auth_cookie: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (user: User, thunkApi) => {
    const response = await handleLogin(user);
    console.log('resp', response);
    if (!response.data) {
      return thunkApi.rejectWithValue(response.msg);
    }
    await setStorage(
      response.user,
      response.data.auth_token,
      response.cookie_header,
    );
    return response;
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: User, thunkApi) => {
    const response = await handleRegister(user);
    console.log('resp', response);
    if (!response.cookie_header) {
      return thunkApi.rejectWithValue(response.msg);
    }
    await setStorage(null, response.auth_token, response.cookie_header);
    return response;
  },
);

export const autoAuth = createAsyncThunk(
  'user/autoAuth',
  async (_, thunkApi) => {
    const userObj = await AsyncStorage.getItem(ACTIVE_USER);
    const tokenStr = await AsyncStorage.getItem(AUTH_TOKEN);
    const cookieHeader = await AsyncStorage.getItem(AUTH_COOKIE);
    if (!userObj || !tokenStr) {
      return thunkApi.rejectWithValue('User object not available');
    }
    return {
      active_user: JSON.parse(userObj) as User,
      auth_token: tokenStr,
      auth_cookie: cookieHeader,
    };
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userInput: User, thunkApi) => {
    const { user } = (await thunkApi.getState()) as { user: UserState };
    // only request to update user if loggedIn because it wouldn't work otherwise anyway
    if (!user.auth_cookie) {
      return;
    }
    const response = await handleUpdateUser(userInput, user.auth_cookie);
    if (response.msg) {
      if (response.msg === 'token has expired') {
      }
      return thunkApi.rejectWithValue(response.msg);
    }

    return response;
  },
);

export const getCurrentUser = createAsyncThunk(
  'user/me',
  async (_, thunkApi) => {
    const { user } = (await thunkApi.getState()) as { user: UserState };
    // only request to update user if loggedIn because it wouldn't work otherwise anyway
    if (!user.auth_cookie) {
      return;
    }
    const response = await handleGetCurrentUser(
      user.auth_cookie,
      user.auth_token as string,
    );
    if (!response.access_token) {
      await clearStorage();
      thunkApi.dispatch(logout());
      return thunkApi.rejectWithValue('unable to fetch the currennt user');
    }

    await setStorage(response, response.access_token);
    return response;
  },
);

export const googleRegister = createAsyncThunk<
  GoogleLoginResponse,
  { credential: string }
>('user/googleRegister', async (body, thunkApi) => {
  const response = await handleGoogleregister(body);
  if (!response.cookie_header) {
    return thunkApi.rejectWithValue('Unable to register with Google');
  }

  await setStorage(
    response.user,
    response.data.auth_token,
    response.cookie_header,
  );
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state, _action: PayloadAction) => {
      state.active_user = null;
      state.auth_token = '';
      state.auth_cookie = '';
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
        state.auth_cookie = action.payload.cookie_header;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error.status = false;
        state.error.message = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error.status = true;
        state.error.message =
          typeof action.payload === 'string'
            ? action.payload
            : 'There was an error logging in. Please try again later';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.auth_token = action.payload.auth_token;
        state.auth_cookie = action.payload.cookie_header;
      })
      .addCase(autoAuth.pending, state => {
        state.autoAuthLoading = true;
      })
      .addCase(autoAuth.rejected, (state, action) => {
        state.autoAuthLoading = false;
        state.error.status = true;
        state.error.message = action.payload as string;
      })
      .addCase(autoAuth.fulfilled, (state, action) => {
        state.autoAuthLoading = false;
        state.auth_token = action.payload.auth_token;
        state.active_user = action.payload.active_user;
        state.auth_cookie = action.payload.auth_cookie;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error.status = true;
        state.error.message = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.active_user = action.payload as User;
      })
      .addCase(googleRegister.pending, state => {
        state.loading = true;
      })
      .addCase(googleRegister.rejected, (state, action) => {
        state.loading = false;
        state.error.status = true;
        state.error.message = action.payload as string;
      })
      .addCase(googleRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.auth_token = action.payload.data.auth_token;
        state.auth_cookie = action.payload.cookie_header;
        state.active_user = action.payload.user;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.auth_token = action.payload?.access_token as string;
        state.active_user = action.payload as User;
      });
  },
});

const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.active_user;
export const selectLoggedInState = (state: RootState) =>
  Boolean(state.user.active_user && state.user.auth_cookie);
export const selectErrorState = (state: RootState) => state.user.error;
export const selectLoadingState = (state: RootState) => state.user.loading;
export const selectAutoAuthLoadingState = (state: RootState) =>
  state.user.autoAuthLoading;
export const selectAuthCookie = (state: RootState) => state.user.auth_cookie;
export const selectAuthToken = (state: RootState) => state.user.auth_token;
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
      await AsyncStorage.removeItem(AUTH_TOKEN),
      await AsyncStorage.removeItem(AUTH_COOKIE)
    );
  } catch (err) {
    throw err;
  }
};

const setStorage = async (
  user: User | null,
  token?: string,
  cookie?: string,
) => {
  if (user) {
    await AsyncStorage.setItem(ACTIVE_USER, JSON.stringify(user));
  }
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN, token);
  }
  if (cookie) {
    await AsyncStorage.setItem(AUTH_COOKIE, cookie);
  }
};

export default userSlice.reducer;
