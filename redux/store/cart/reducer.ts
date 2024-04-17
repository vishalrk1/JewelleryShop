import { cart_cart, cart_cartitem } from "@prisma/client";
import { createReducer } from "@reduxjs/toolkit";
import {
  addItemTOCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "./action";
import { string } from "zod";

interface cartState {
  cart: cart_cart | null;
  cartItems: any[];
  fetching: boolean;
  error: string | null;
}

const initialState = {
  cart: null,
  cartItems: [],
  fetching: false,
  error: null,
} as cartState;

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCart.pending, (state) => {
      state.fetching = true;
    })
    .addCase(deleteCartItem.pending, (state) => {
      state.fetching = true;
    })
    .addCase(addItemTOCart.pending, (state) => {
      state.fetching = true;
    })
    .addCase(updateCartItem.pending, (state) => {
      state.fetching = true;
    })

    .addCase(getCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
      state.cartItems = action.payload?.cart_cartitem;
    })
    .addCase(deleteCartItem.fulfilled, (state, action) => {
      state.fetching = false;
      state.cartItems = action.payload?.cartItems;
    })
    .addCase(addItemTOCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cartItems = action.payload?.cartItems;
    })
    .addCase(updateCartItem.fulfilled, (state, action) => {
      state.fetching = false;
      state.cartItems = action.payload?.cartItems;
    })

    .addCase(getCart.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    })
    .addCase(deleteCartItem.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    })
    .addCase(addItemTOCart.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    })
    .addCase(updateCartItem.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    });
});

export default cartReducer;
