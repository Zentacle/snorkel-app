import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import { handleRegister, handleLogin } from './api';
import { User } from '_utils/interfaces/data/user';
import { AppThunk, RootState } from '../../store';

const ACTIVE_USER = 'active_user';
const AUTH_TOKEN = 'auth_token';

interface UserState {
  active_user: User | null;
  loading: boolean;
  error: {
    status: boolean;
  };
  auth_token: string | null;
}

const initialState: UserState = {
  active_user: null,
  loading: false,
  error: {
    status: false,
  },
  auth_token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.active_user = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.auth_token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error.status = action.payload;
    },
    logout: (state, _action: PayloadAction) => {
      state.active_user = null;
      state.auth_token = '';
    },
  },
});

const { setUser, setAuthToken, setLoading, setError, logout } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user.active_user;
export const isLoggedIn = (state: RootState) =>
  Boolean(state.user.active_user && state.user.auth_token);

export const registerUser =
  (user: User): AppThunk =>
  async (dispatch, _getState) => {
    try {
      dispatch(setLoading(true));

      const auth = await handleRegister(user);
      await setStorage(null, auth.auth_token);

      dispatch(setAuthToken(auth.auth_token));
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (err) {
      console.log('ERROR', err);
      dispatch(setError(true));
      throw err;
    }
  };

export const loginUser =
  (user: User): AppThunk =>
  async (dispatch, _getState) => {
    try {
      dispatch(setLoading(true));

      const response = await handleLogin(user);
      await setStorage(response.user, response.data.auth_token);

      dispatch(setAuthToken(response.data.auth_token));
      dispatch(setUser(response.user));
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (err) {
      console.log('ERROR', err);
      dispatch(setError(true));
      throw err;
    }
  };

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

export const autoAuth = (): AppThunk => async (dispatch, _getState) => {
  const userObj = await AsyncStorage.getItem(ACTIVE_USER);
  const tokenStr = await AsyncStorage.getItem(AUTH_TOKEN);
  if (userObj && tokenStr) {
    dispatch(setUser(JSON.parse(userObj) as User));
    dispatch(setAuthToken(tokenStr));
  }
};

export default userSlice.reducer;
