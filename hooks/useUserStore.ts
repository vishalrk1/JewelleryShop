import { IUser } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import useAddressStore from "./useAddressStore";
import useWishlistStore from "./useWishlistStore";

interface UserState {
  user: IUser | null;
  fetching: boolean;
  error: string | null;
  getUser: (token: string) => Promise<void>;
  setUser: (user: IUser | null) => void;
}

const useUserStore = create<UserState>((set, get) => ({
  user: null,
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
      set({ user: res.data.user, fetching: false, error: null });
      useWishlistStore.getState().getWishlist(token);
      useAddressStore.getState().setAddresses(res.data.user?.addresses);
    } catch (error) {
      useAuthStore.getState().logoutUser(); // logging out user if failed to get data
      const errorMessage = axios.isAxiosError(error)
        ? error.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
    }
  },
  // update user
  setUser: (user: IUser | null) => {
    set({ user, fetching: false, error: null });
    useAddressStore.getState().setAddresses(user?.addresses || []);
  },
}));

export default useUserStore;
