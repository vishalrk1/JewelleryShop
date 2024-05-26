import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/categories`);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Something went wrong, cant fetch categories");
      }
    } catch (error: any) {
      return { error: error.message };
    }
  }
);
