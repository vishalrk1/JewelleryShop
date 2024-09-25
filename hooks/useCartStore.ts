import { ICart } from "@/lib/types";
import { showSucessToast } from "@/utils/toasts";
import axios from "axios";
import { create } from "zustand";

interface CartStoreState {
  cart: ICart | null;
  fetching: boolean;
  error: string | null;
  getCart: (token: string) => Promise<void>;
  addItemToCart: (
    productId: string,
    quantity: number,
    token: string
  ) => Promise<void>;
  removeItemFromCart: (productId: string, token: string) => Promise<void>;
  updateCartItemQuantity: (
    productId: string,
    quantity: number,
    token: string
  ) => Promise<void>;
  clearCart: (token: string) => Promise<void>;
  isProductInCart: (productId: string) => boolean;
}

const useCartStore = create<CartStoreState>((set, get) => ({
  cart: null,
  fetching: false,
  error: null,
  getCart: async (token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ cart: res.data.data, fetching: false, error: null });
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
    }
  },
  addItemToCart: async (productId: string, quantity: number, token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/add`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ cart: res.data.data, fetching: false, error: null });
      showSucessToast("Item added to cart successfully");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
    }
  },
  removeItemFromCart: async () => {},
  updateCartItemQuantity: async () => {},
  clearCart: async () => {},
  isProductInCart: (productId: string) => {
    const cart = get().cart;
    return cart?.items.some((item) => item._id === productId) || false;
  },
}));

export default useCartStore;
