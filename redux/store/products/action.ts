import { products_product } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ categoryId, isFeatured }: any, thunkAPI) => {
    console.log(process.env.NEXT_PUBLIC_ENDPOINT_URL);
    try {
      const res = await axios.get("http://localhost:3000/api/products", {
        params: {
          catId: categoryId,
          isFeatured: isFeatured,
        },
      });
      if (res.data) {
        return res.data as products_product[];
      }
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
