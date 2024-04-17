import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async ({ user_id }: { user_id: string }) => {
    try {
      const req = await axios.get("http://localhost:3000/api/wishlist", {
        params: {
          id: user_id,
        },
      });
      if (!req.data) {
        throw new Error("Error getting wishlist");
      }
      return req.data;
    } catch (error: any) {
      console.log(error);
      return { error: error.message };
    }
  }
);
