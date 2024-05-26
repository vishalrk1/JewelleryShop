import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async ({ user_id }: { user_id: string }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/orders`, {
        params: {
          id: user_id,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Something went wrong, cant get orders!!");
      }
    } catch (error: any) {
      return error.message;
    }
  }
);
