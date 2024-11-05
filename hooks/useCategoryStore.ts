import { ICategory } from "@/lib/types";
import { create } from "zustand";

interface CategoryState {
  categories: ICategory[];
  fetching: boolean;
  error: string | null;
  getCategory: () => Promise<void>;
  setCategory: (categories: ICategory[] | null) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  fetching: false,
  error: null,
  getCategory: async () => {},
  setCategory: (categories: ICategory[] | null) => {
    set({ fetching: false, error: null, categories: categories || [] });
  },
}));

export default useCategoryStore;
