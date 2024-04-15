import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.products;

export const productsSelector = createSelector(
  selectProducts,
  (state) => state
);
