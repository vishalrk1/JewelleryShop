import { IUser } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import useAddressStore from "./useAddressStore";
import useWishlistStore from "./useWishlistStore";
import useCartStore from "./useCartStore";
import useCategoryStore from "./useCategoryStore";

import * as z from "zod";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import { UserDetailsSchema } from "@/schemas";

interface UserState {
  user: IUser | null;
  isProfileComplete: boolean;
  fetching: boolean;
  error: string | null;
  getUser: (token: string) => Promise<void>;
  updateUser: (data: z.infer<typeof UserDetailsSchema>) => Promise<boolean>;
  setUser: (user: IUser | null) => void;
}

const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isProfileComplete: false,
  fetching: false,
  error: null,
  // if get usr data with token
  getUser: async (token: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // if categories data is not present means not sent from server fetch it again
      !useCategoryStore.getState().categories &&
        useCategoryStore.getState().getCategory();
      useWishlistStore.getState().getWishlist(token);
      useCartStore.getState().getCart(token);
      useAddressStore.getState().setAddresses(res.data.user?.addresses);
      set({
        user: res.data?.user,
        isProfileComplete: res?.data?.user.isProfileComplete === "true",
        fetching: false,
        error: null,
      });
    } catch (error) {
      useUserStore.getState();
      useAuthStore.getState().logoutUser(); // logging out user if failed to get data
      const errorMessage = axios.isAxiosError(error)
            ? error?.response?.data?.message
            : "An unknow error has occuted";
      set({ error: errorMessage, fetching: false });
    }
  },
  updateUser: async (data) => {
    const token = useAuthStore.getState().token;
    set({ fetching: true, error: null });
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      useAddressStore.getState().setAddresses(res.data.user?.addresses);
      set({
        user: res.data?.user,
        isProfileComplete: res?.data?.user.isProfileComplete,
        fetching: false,
        error: null,
      });
      showSucessToast("Profile updated successfully");
      return true;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "Updating profile failed!!";
      set({ error: errorMessage, fetching: false });
      set({
        error: errorMessage || "Registration failed",
        fetching: false,
      });
      showErrorToast(errorMessage, true);
      return false;
    }
  },
  // update user
  setUser: (user: IUser | null) => {
    set({ user, fetching: false, error: null });
    useAddressStore.getState().setAddresses(user?.addresses || []);
  },
}));

export default useUserStore;
