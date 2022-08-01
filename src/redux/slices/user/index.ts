import { AppleAuthReturn } from 'src/screens/Auth/utils/interfaces';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import {
  handleRegister,
  handleLogin,
  handleUpdateUser,
  handleGoogleregister,
  handleGetCurrentUser,
  handleAppleregister,
  handleFetchUserWalletAddress,
} from './api';
import { User } from '_utils/interfaces/data/user';
import { AppThunk, RootState } from '../../store';
import { setAmplitudeUserId } from '_utils/functions/amplitude';

const ACTIVE_USER = 'active_user';
const AUTH_TOKEN = 'auth_token';
const IS_EXISTING_USER = 'is_existing_user';
const REFRESH_TOKEN = 'refresh_token';

interface ErrorObj {
  status: boolean;
  message: string | null;
}

interface UserState {
  active_user: User | null;
  loading: boolean;
  error: ErrorObj;
  auth_token: string | null;
  refresh_token: string | null;
  autoAuthLoading: boolean;
  existing_user: boolean;
  type: 'login' | 'register' | null;
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
  refresh_token: null,
  existing_user: false,
  type: null,
};

export const handleCheckExistingUser = createAsyncThunk(
  'user/existingUser',
  async () => {
    const response = await checkExistingUser();

    return response;
  },
);

export const fetchUserWalletAddress = createAsyncThunk(
  'user/fetchWalletAddress',
  async (auth_token: string, thunkApi) => {
    const response = await handleFetchUserWalletAddress(auth_token);
    if (!response.address) {
      return thunkApi.rejectWithValue('there was an error fetching the wallet');
    }
    return response;
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (user: User, thunkApi) => {
    const response = await handleLogin(user);

    if (!(response.data && response.data.auth_token)) {
      return thunkApi.rejectWithValue(response.msg);
    }

    await setStorage(
      response.user,
      response.data.auth_token,
      response.data.refresh_token,
    );
    await flagExistingUser();
    return {
      user: response.user,
      data: response.data,
    };
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: User, thunkApi) => {
    const response = await handleRegister(user);
    if (!(response.data && response.data.auth_token)) {
      return thunkApi.rejectWithValue(response.msg);
    }

    await setStorage(
      response.user,
      response.data.auth_token,
      response.data.refresh_token,
    );
    await flagExistingUser();
    return {
      ...response,
    };
  },
);

export const autoAuth = createAsyncThunk(
  'user/autoAuth',
  async (_, thunkApi) => {
    const userObj = await AsyncStorage.getItem(ACTIVE_USER);
    const tokenStr = await AsyncStorage.getItem(AUTH_TOKEN);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
    if (!tokenStr || !refreshToken) {
      return thunkApi.rejectWithValue('User object not available');
    }
    return {
      active_user: userObj ? (JSON.parse(userObj) as User) : ({} as User),
      auth_token: tokenStr,
      refresh_token: refreshToken,
    };
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userInput: User, thunkApi) => {
    const { user } = (await thunkApi.getState()) as { user: UserState };
    // only request to update user if loggedIn because it wouldn't work otherwise anyway
    if (!user.auth_token) {
      return;
    }
    const response = await handleUpdateUser(
      userInput,
      user.auth_token as string,
    );
    if (response.msg) {
      if (response.msg === 'token has expired') {
        thunkApi.dispatch(logout());
      }
      return thunkApi.rejectWithValue(response.msg);
    }

    await setStorage(response);

    return response;
  },
);

export const getCurrentUser = createAsyncThunk(
  'user/me',
  async (_, thunkApi) => {
    const { user } = (await thunkApi.getState()) as { user: UserState };
    // only request to update user if loggedIn because it wouldn't work otherwise anyway
    if (!user || !user.refresh_token) {
      return thunkApi.rejectWithValue('unable to fetch the current user');
    }

    const response = await handleGetCurrentUser(user.refresh_token as string);
    if (!response.access_token) {
      await clearStorage();
      thunkApi.dispatch(logout());
      return thunkApi.rejectWithValue('unable to fetch the current user');
    }

    await setStorage(response, response.access_token);
    return response;
  },
);

export const googleRegister = createAsyncThunk(
  'user/googleRegister',
  async (body: { credential: string }, thunkApi) => {
    const response = await handleGoogleregister(body);

    if (!(response.data && response.data.auth_token)) {
      return thunkApi.rejectWithValue('Unable to register with Google');
    }

    await setStorage(
      response.user,
      response.data.auth_token,
      response.data.refresh_token,
    );

    await flagExistingUser();

    return {
      user: response.user,
      data: response.data,
    };
  },
);

export const appleRegister = createAsyncThunk(
  'user/appleRegister',
  async (body: AppleAuthReturn, thunkApi) => {
    const response = await handleAppleregister(body);

    if (!(response.data && response.data.auth_token)) {
      return thunkApi.rejectWithValue('Unable to register with Apple');
    }

    await setStorage(
      response.user,
      response.data.auth_token,
      response.data.refresh_token,
    );

    await flagExistingUser();

    return {
      user: response.user,
      data: response.data,
    };
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state, _action: PayloadAction) => {
      state.active_user = null;
      state.auth_token = null;
      state.refresh_token = null;
      state.type = null;
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
        state.existing_user = true;
        state.refresh_token = action.payload.data.refresh_token;
        state.type = 'login';
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
        state.auth_token = action.payload.data.auth_token;
        state.existing_user = true;
        state.refresh_token = action.payload.data.refresh_token;
        state.type = 'register';
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
        state.existing_user = true;
        state.refresh_token = action.payload.refresh_token;
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
        state.active_user = action.payload.user;
        state.existing_user = true;
        state.refresh_token = action.payload.data.refresh_token as string;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.auth_token = action.payload?.access_token as string;
        state.active_user = action.payload as User;
      })
      .addCase(getCurrentUser.pending, state => {
        state.loading = true;
        state.error.status = false;
        state.error.message = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error.status = true;
        state.error.message =
          typeof action.payload === 'string'
            ? action.payload
            : 'There was an error fetching the current user. Please try again later';
      })
      .addCase(handleCheckExistingUser.fulfilled, (state, action) => {
        state.existing_user = action.payload;
      })
      .addCase(appleRegister.pending, state => {
        state.loading = true;
      })
      .addCase(appleRegister.rejected, (state, action) => {
        state.loading = false;
        state.error.status = true;
        state.error.message = action.payload as string;
      })
      .addCase(appleRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = null;
        state.auth_token = action.payload.data.auth_token;
        state.active_user = action.payload.user;
        state.existing_user = true;
        state.refresh_token = action.payload.data.refresh_token as string;
      })
      .addCase(fetchUserWalletAddress.fulfilled, (state, action) => {
        (state.active_user as User).wallet_address = action.payload.address;
      });
  },
});

const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.active_user;
export const selectLoggedInState = (state: RootState) =>
  Boolean(state.user.refresh_token && state.user.auth_token);
export const selectErrorState = (state: RootState) => state.user.error;
export const selectLoadingState = (state: RootState) => state.user.loading;
export const selectAutoAuthLoadingState = (state: RootState) =>
  state.user.autoAuthLoading;
export const selectAuthToken = (state: RootState) => state.user.auth_token;
export const selectExistingUser = (state: RootState) =>
  state.user.existing_user;
export const selectAuthType = (state: RootState) => state.user.type;

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
      await AsyncStorage.removeItem(REFRESH_TOKEN)
    );
  } catch (err) {
    throw err;
  }
};

const flagExistingUser = async () => {
  await AsyncStorage.setItem(IS_EXISTING_USER, 'true');
};

export const checkExistingUser = async () => {
  const isExistingUser = await AsyncStorage.getItem(IS_EXISTING_USER);

  return !!isExistingUser;
};

const setStorage = async (
  user: User | null,
  token?: string,
  refresh_token?: string,
) => {
  if (user) {
    if (user.id) {
      setAmplitudeUserId(user.id);
    }
    await AsyncStorage.setItem(ACTIVE_USER, JSON.stringify(user));
  }
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN, token);
  }

  if (refresh_token) {
    await AsyncStorage.setItem(REFRESH_TOKEN, refresh_token);
  }
};

export default userSlice.reducer;
