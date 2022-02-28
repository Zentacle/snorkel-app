import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchReviews } from './api';
import { Review } from '_utils/interfaces/data/review';
import { AppThunk, RootState } from '../../store';

interface NormalizedObj {
  [id: string]: Review[];
}
interface ReviewState {
  reviews: NormalizedObj;
}

const initialState: ReviewState = {
  reviews: {},
};

interface ReviewsPayload {
  beach_id: number;
  reviews: Review[];
}

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState: initialState,
  reducers: {
    getAllReviews: (state, action: PayloadAction<ReviewsPayload>) => {
      state.reviews[action.payload.beach_id] = action.payload.reviews;
    },
  },
});

const { getAllReviews } = reviewSlice.actions;

export const selectAllReviews = (state: RootState) => state.reviews.reviews;

export const selectreviewById = (id: number) => {
  const selectedreview = createSelector(
    [selectAllReviews],
    reviews => reviews[id],
  );

  return selectedreview;
};

export const isReviewInState = (id: number) => {
  return createSelector([selectAllReviews], selectedRevs =>
    Boolean(selectedRevs[id]),
  );
};

export const handleFetchReviews =
  (id: number): AppThunk =>
  async (dispatch, _getState) => {
    try {
      const reviews = await fetchReviews(id);
      dispatch(
        getAllReviews({
          reviews: reviews.data,
          beach_id: id,
        }),
      );
      return reviews.data;
    } catch (err) {
      throw err;
    }
  };

export default reviewSlice.reducer;
