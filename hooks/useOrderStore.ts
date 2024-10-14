import { IAddress, ICart, Order } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";
import useAddressStore from "./useAddressStore";
import useCartStore from "./useCartStore";
import { showErrorToast, showSucessToast } from "@/utils/toasts";

interface OrderStoreState {
  orders: Order[];
  fetching: boolean;
  error: string | null;
  getOrders: (token: string) => Promise<void>;
  creatOrder: (
    token: string,
    paymentMethod: string,
    shippingAddress: IAddress
  ) => Promise<boolean>;
}

const useOrderStore = create<OrderStoreState>((set, get) => ({
  orders: [],
  fetching: false,
  error: null,
  getOrders: async (token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ orders: res.data.data, fetching: false, error: null });
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
    }
  },
  creatOrder: async (
    token: string,
    paymentMethod: string,
    shippingAddress: IAddress
  ) => {
    set({ fetching: true, error: null });
    try {
      if (!shippingAddress) {
        throw new Error("No shipping address found");
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/create`,
        {
          shippingAddress,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API call wasa sucess updating state now");
      set({
        orders: get().orders.concat([res.data.data as Order]),
        fetching: false,
        error: null,
      });
      useCartStore.getState().clearCart();
      useCartStore.getState().getCart(token);
      showSucessToast("Order placed successfully 😎")
      return true;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      showErrorToast(errorMessage, true)
      set({ error: errorMessage, fetching: false });
      return false;
    }
  },
}));

export default useOrderStore;
