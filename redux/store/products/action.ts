import { IProduct } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ categoryId, isFeatured }: any, thunkAPI): Promise<IProduct[]> => {
    try {
      const res = await axios.get<{ message: string; data: IProduct[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/products/${categoryId}`,
        {
          params: {
            isFeatured: isFeatured,
          },
        }
      );
      if (res.data) {
        return res.data.data;
      } else {
        throw new Error(res.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
);
