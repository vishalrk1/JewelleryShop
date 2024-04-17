import { products_wishlist_products } from "@prisma/client";
import { createReducer } from "@reduxjs/toolkit";
import { deleteWishlistItem, getWishlist } from "./action";

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
  builder
    .addCase(getWishlist.pending, (state) => {
      state.fetching = true;
    })
    .addCase(deleteWishlistItem.pending, (state) => {
      state.fetching = true;
    })

    .addCase(getWishlist.fulfilled, (state, action) => {
      state.fetching = false;
      state.wishlist = action.payload.products_wishlist_products;
    })
    .addCase(deleteWishlistItem.fulfilled, (state, action) => {
      state.fetching = false;
      state.wishlist = action.payload.products_wishlist_products;
    })

    .addCase(getWishlist.rejected, (state, action) => {
      state.fetching = false;
      state.error = action?.payload as string;
    })
    .addCase(deleteWishlistItem.rejected, (state, action) => {
      state.fetching = false;
      state.error = action?.payload as string;
    });
});

export default wishlistReducer;
