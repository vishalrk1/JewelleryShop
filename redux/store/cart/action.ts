import { showErrorToast, showSucessToast } from "@/utils/toasts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ id, email }: { id: string; email: string }, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/cart`, {
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

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (
    { cart_id, cart_item_id }: { cart_id: string; cart_item_id: string },
    thunkAPI
  ) => {
    try {
      const req = await axios.delete(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/cart/${cart_id}`,
        {
          params: {
            cart_item_id: cart_item_id,
          },
        }
      );
      if (!req.data) {
        showErrorToast("Cant remove item right now, Try again!!", true);
        throw new Error("Error in deleting cart item");
      }
      showSucessToast("Item removed from cart successfully");
      return req.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addItemTOCart = createAsyncThunk(
  "cart/addItemTOCart",
  async (
    { cart_id, product_id }: { cart_id: number; product_id: number },
    thunkAPI
  ) => {
    try {
      const req = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/cart`,
        {},
        {
          params: {
            id: cart_id,
            product_id: product_id,
          },
        }
      );
      if (!req.data) {
        showErrorToast("Item not added to cart, Try again!!", true);
        throw new Error("Error in adding item to cart");
      }
      showSucessToast("Item added to cart successfully");
      return req.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    {
      cart_id,
      cart_item_id,
      quantity,
    }: { cart_id: string; cart_item_id: string; quantity: number },
    thunkAPI
  ) => {
    try {
      const req = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/cart/${cart_id}`,
        {},
        {
          params: {
            cart_item_id: cart_item_id,
            quantity: quantity,
          },
        }
      );
      if (!req.data) {
        throw new Error("Error in deleting cart item");
      }
      return req.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
