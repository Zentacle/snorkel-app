import AsyncStorage from '@react-native-community/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../store';

interface DiveShopState {}

const initialState: DiveShopState = {};

export const diveShopSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {},
});

export default diveShopSlice.reducer;
