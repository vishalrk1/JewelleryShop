import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectUserFeedbacks = (state: RootState) => state.feedbacks;

export const categoriesSelector = createSelector(
  selectUserFeedbacks,
  (state) => state
);
