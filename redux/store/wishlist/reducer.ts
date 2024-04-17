import { products_wishlist_products } from "@prisma/client";
import { createReducer } from "@reduxjs/toolkit";
import { getWishlist } from "./action";

interface wishlistState {
  wishlist: products_wishlist_products[] | null;
  fetching: boolean;
  error: string | null;
}

const initialState = {
  wishlist: null,
  fetching: false,
  error: null,
} as wishlistState;

const wishlistReducer = createReducer(initialState, (builder) => {
  builder.addCase(getWishlist.pending, (state) => {
    state.fetching = true;
  });
  builder.addCase(getWishlist.fulfilled, (state, action) => {
    state.fetching = false;
    state.wishlist = action.payload.products_wishlist_products;
  });
  builder.addCase(getWishlist.rejected, (state, action) => {
    state.fetching = false;
    state.error = action?.payload as string;
  });
});

export default wishlistReducer;
