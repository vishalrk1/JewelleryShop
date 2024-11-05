import { IProduct } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";
import useCartStore from "./useCartStore";

interface ProductsState {
  products: IProduct[];
  fetching: boolean;
  error: string | null;
  getProducts: (categoryId: string, isFeatured: boolean) => Promise<void>;
}

const useProductStore = create<ProductsState>((set) => ({
  products: [],
  fetching: false,
  error: null,
  getProducts: async (categoryId: string, isFeatured: boolean) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.get<{ message: string; data: IProduct[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/products/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
            "Content-Type": "application/json",
          },
          params: {
            isFeatured: isFeatured,
          },
        }
      );
      if (res.data && res.data.data) {
        set({ products: res.data.data, fetching: false, error: null });
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "Cant fetch the products";
      set({ error: errorMessage, fetching: false });
    }
  },
}));

export default useProductStore;
