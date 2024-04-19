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
      return { error: error.message };
    }
  }
);

export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItemToWishlist",
  async ({
    wishlist_id,
    product_id,
  }: {
    wishlist_id: string;
    product_id: string;
  }) => {
    try {
      const req = await axios.post(
        `http://localhost:3000/api/wishlist/${wishlist_id}`,
        {},
        {
          params: {
            product_id: product_id,
          },
        }
      );
      if (req.status === 200) {
        return req.data;
      } else {
        throw new Error("Error adding item to wishlist");
      }
    } catch (error: any) {
      return { error: error.message };
    }
  }
);

export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlistItem",
  async ({
    id,
    wishlist_id,
    product_id,
  }: {
    id: string;
    wishlist_id: string;
    product_id: string;
  }) => {
    try {
      const req = await axios.delete(
        `http://localhost:3000/api/wishlist/${wishlist_id}`,
        {
          params: {
            id,
            product_id,
          },
        }
      );
      if (!req.data) {
        throw new Error("Error deleting wishlist item");
      }
      return req.data;
    } catch (error: any) {
      console.log(error);
      return { error: error.message };
    }
  }
);
