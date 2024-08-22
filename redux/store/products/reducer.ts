import { createReducer } from "@reduxjs/toolkit";
import { getProducts } from "./action";
import { products_product } from "@/prisma/generated/client";
import { IProduct } from "@/lib/types";

interface ProducstsState {
  products: IProduct[] | [];
  fetching: boolean;
  error: string | null;
}

const initialState = {
  products: [],
  fetching: false,
  error: null,
} as ProducstsState;

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProducts.pending, (state) => {
      state.fetching = true;
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.fetching = false;
      state.products = action.payload;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    });
});

export default productsReducer;
