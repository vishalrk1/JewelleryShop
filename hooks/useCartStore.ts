import { ICart } from "@/lib/types";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import axios from "axios";
import { create } from "zustand";

interface CartStoreState {
  cart: ICart | null;
  fetching: boolean;
  error: string | null;
  totalAmount: number;
  convenienceFee: number;
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
  clearCart: () => void;
  calculateTotalPrice: () => void;
  isProductInCart: (productId: string) => boolean;
}

const useCartStore = create<CartStoreState>((set, get) => ({
  cart: null,
  fetching: false,
  error: null,
  totalAmount: 0,
  convenienceFee: 0,
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
      get().calculateTotalPrice();
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
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
      get().calculateTotalPrice();
      showSucessToast("Item added to cart successfully");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
    }
  },
  removeItemFromCart: async (productId: string, token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ cart: res.data.data, fetching: false, error: null });
      get().calculateTotalPrice();
      showSucessToast("Item removed from cart successfully");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
    }
  },
  updateCartItemQuantity: async (
    productId: string,
    quantity: number,
    token: string
  ) => {
    set({ fetching: true, error: null });
    try {
      // if quantity is 0 remove the item from cart
      if (quantity === 0) {
        useCartStore.getState().removeItemFromCart(productId, token);
        return;
      }

      // first update the car quantity instantely for fast user state update
      const currentCart = get().cart;
      if (!currentCart) {
        throw new Error("Cart is not initialized");
      }

      // Optimistic update
      const updatedItems = currentCart.items.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );

      const updatedCart: ICart = {
        ...currentCart,
        items: updatedItems,
      };

      set({ cart: updatedCart, fetching: true, error: null });

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/update`,
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
      if (res.status === 404) {
        showErrorToast(res.data?.message, true);
        return;
      }
      set({ cart: res.data.data, fetching: false, error: null });
      get().calculateTotalPrice();
      showSucessToast("Item quantity updated successfully");
    } catch (error) {
      get().getCart(token); // refetch & up[date] cart in case of api failure
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
      showErrorToast(errorMessage, true);
    }
  },
  clearCart: () => {
    set({ cart: null, fetching: true, error: null, totalAmount: 0, convenienceFee: 0 });
  },
  calculateTotalPrice: () => {
    const totalCatValue = get().cart?.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    set({
      totalAmount: totalCatValue || 0,
      fetching: false,
      error: null,
      convenienceFee: 0.1 * (totalCatValue || 0),
    });
  },
  isProductInCart: (productId: string) => {
    const cart = get().cart;
    return cart?.items.some((item) => item.product._id === productId) || false;
  },
}));

export default useCartStore;
