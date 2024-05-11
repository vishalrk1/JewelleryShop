import { createReducer } from "@reduxjs/toolkit";
import { getUserFeedbacks } from "./action";

interface FeedbacksState {
  feedbacks: any[];
  fetching: boolean;
  error: string | null;
}

const initialState: FeedbacksState = {
  feedbacks: [],
  fetching: false,
  error: null,
};

const feedbacksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUserFeedbacks.pending, (state) => {
      state.fetching = true;
    })
    .addCase(getUserFeedbacks.fulfilled, (state, action) => {
      state.fetching = false;
      state.feedbacks = action.payload?.feedbacks;
    })
    .addCase(getUserFeedbacks.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    });
});

export default feedbacksReducer;
