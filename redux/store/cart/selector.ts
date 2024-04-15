import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;

export const cartSelector = createSelector(selectCart, (state) => state);
