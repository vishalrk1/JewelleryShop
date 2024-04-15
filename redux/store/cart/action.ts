import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ id, email }: any, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        params: {
          id: id,
          email: email,
        },
      });
      if (!res.data) {
        return thunkAPI.rejectWithValue("Error in getting data");
      }
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
