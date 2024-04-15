import { cart_cart, cart_cartitem } from "@prisma/client";
import { createReducer } from "@reduxjs/toolkit";
import { getCart } from "./action";

interface cartState {
  cart: cart_cart | null;
  cartItems: any[];
  fetching: boolean;
  error: string | null;
}

const initialState = {
  cart: null,
  fetching: false,
  error: null,
} as cartState;

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCart.pending, (state) => {
      state.fetching = true;
    })
    .addCase(getCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
      state.cartItems = action.payload?.cart_cartitem;
    })
    .addCase(getCart.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    });
});

export default cartReducer;
