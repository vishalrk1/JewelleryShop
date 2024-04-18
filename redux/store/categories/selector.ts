import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCategories = (state: RootState) => state.categories;

export const categoriesSelector = createSelector(
  selectCategories,
  (state) => state
);
