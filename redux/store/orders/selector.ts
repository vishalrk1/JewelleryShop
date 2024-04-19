import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectOrders = (state: RootState) => state.orders;

export const ordersSelector = createSelector(selectOrders, (state) => state);
