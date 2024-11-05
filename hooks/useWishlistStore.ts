import { IWishlist } from "@/lib/types";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import axios from "axios";
import { create } from "zustand";

interface WishlistState {
  wishlist: IWishlist | null;
  fetching: boolean;
  error: string | null;
  getWishlist: (token: string) => Promise<void>;
  deleteWishlistItem: (productId: string, token: string) => Promise<void>;
  addItemToWishlist: (productId: string, token: string) => Promise<void>;
  isProductInWishlist: (productId: string) => boolean;
}

const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: null,
  fetching: false,
  error: null,
  // function for get wishlist data
  getWishlist: async (token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ wishlist: res.data?.data, fetching: false, error: null });
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknow error has occuted";
      set({ error: errorMessage, fetching: false });
      showErrorToast("Failed to fetch Wishlist please try again");
    }
  },

  // Function for Add product to wishlist
  addItemToWishlist: async (productId: string, token: string) => {
    set({ fetching: true, error: null });
    console.log("Adding to wishlist: ", productId, token);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ wishlist: res.data?.data, fetching: false, error: null });
      showSucessToast("Item added to wishlist successfully");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknow error has occuted";
      set({ error: errorMessage, fetching: false });
      showErrorToast("Failed to add item to wishlist please try again");
    }
  },

  // Function for Remove product from wishlist
  deleteWishlistItem: async (productId: string, token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ wishlist: res.data?.data, fetching: false, error: null });
      showSucessToast("Item removed from wishlist successfully");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknow error has occuted";
      set({ error: errorMessage, fetching: false });
      showErrorToast("Failed to delete item from wishlist please try again");
    }
  },
  isProductInWishlist: (productId: string) => {
    const state = get();
    return (
      state.wishlist?.products.some((product) => product._id === productId) ||
      false
    );
  },
}));

export default useWishlistStore;
