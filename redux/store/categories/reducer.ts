import { createReducer } from "@reduxjs/toolkit";
import { getCategories } from "./action";
import { ICategory } from "@/lib/types";

interface CategoriesState {
  categories: ICategory[] | null;
  fetching: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
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
      state.categories = action.payload;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.payload as string;
    });
});

export default categoriesReducer;
