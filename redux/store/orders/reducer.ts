import { order_order } from "@prisma/client";
import { createReducer } from "@reduxjs/toolkit";
import { getOrders } from "./action";

interface OrdersState {
  orders: order_order[];
  fetching: boolean;
  error: string | null;
}

const initialState = {
  orders: [],
  fetching: false,
  error: null,
} as OrdersState;

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrders.pending, (state) => {
      state.fetching = true;
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.fetching = false;
      state.orders = action.payload?.orders;
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    });
});

export default ordersReducer;
