import { configureStore } from '@reduxjs/toolkit';

import diveSitesReducer from './slices/dive-sites';

import type { ThunkAction, Action } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    dive_sites: diveSitesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
