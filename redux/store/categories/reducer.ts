import { createReducer } from "@reduxjs/toolkit";
import { getCategories } from "./action";
import { categories_category } from "@/prisma/generated/client";

interface CategoriesState {
  categories: categories_category[] | null;
  fetching: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: null,
  fetching: false,
  error: null,
} as CategoriesState;

const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCategories.pending, (state) => {
      state.fetching = true;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.fetching = false;
      state.categories = action.payload?.categories;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    });
});

export default categoriesReducer;
