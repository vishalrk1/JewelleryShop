import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectWhishlist = (state: RootState) => state.wishlist;

export const wishlistSelector = createSelector(
  selectWhishlist,
  (state) => state
);
