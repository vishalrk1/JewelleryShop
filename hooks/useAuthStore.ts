import { IUser } from "@/lib/types";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import axios from "axios";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import useUserStore from "./useUserStore";
import useWishlistStore from "./useWishlistStore";
import useCartStore from "./useCartStore";
import useAddressStore from "./useAddressStore";
import { useModel } from "./useModal";

interface AuthState {
  token: string | null;
  phone: string | null;
  fetching: boolean;
  status: string;
  error: string | null;
  registerUser: (
    name: string,
    phone: string,
    email: string,
    password: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  checkAuth: () => Promise<void>;
}

type AuthPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<Partial<AuthState>>
) => StateCreator<AuthState>;

const useAuthStore = create<AuthState>(
  (persist as AuthPersist)(
    (set, get) => ({
      token: null,
      phone: null,
      fetching: false,
      status: "idle",
      error: null,
      // function to set user
      registerUser: async (
        name: string,
        phone: string,
        email: string,
        password: string
      ) => {
        set({ fetching: true, status: "loading", error: null });
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
            {
              email,
              phone,
              password,
              first_name: name,
            }
          );

          if (res.status === 201) {
            delete res.data.password; // Ensure password is not stored
            useUserStore.getState().setUser(res.data.user as IUser);
            set({
              status: "succeeded",
              token: res.data.token,
              fetching: false,
            });
            showSucessToast("Registration successful 😎");
          }
        } catch (error: any) {
          const errorMessage = axios.isAxiosError(error)
            ? error?.response?.data?.message
            : "Registration failed!!";
          set({ error: errorMessage, fetching: false });
          set({
            status: "failed",
            error: errorMessage || "Registration failed",
            fetching: false,
          });
          showErrorToast(errorMessage, true);
        }
      },
      loginUser: async (phone: string, password: string) => {
        set({ fetching: true, status: "loading", error: null });
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
            {
              phone,
              password,
            }
          );

          if (res.data) {
            delete res.data.password; // Ensure password is not stored
            useUserStore.getState().setUser(res.data.user as IUser);
            useWishlistStore.getState().getWishlist(res.data.token);
            useCartStore.getState().getCart(res.data.token);
            useAddressStore.getState().setAddresses(res.data.user?.addresses);
            set({
              status: "succeeded",
              token: res.data.token,
              phone: res.data.user.phone,
              fetching: false,
            });
            showSucessToast("Login successful 😎, Welcome back!!");
          }
        } catch (error: any) {
          const errorMessage = axios.isAxiosError(error)
            ? error?.response?.data?.message
            : "Login Failed!!";
          set({ error: errorMessage, fetching: false });
          set({
            status: "failed",
            error: errorMessage || "Login Failed",
            fetching: false,
          });
          showErrorToast(errorMessage, true);
        }
      },
      logoutUser: () => {
        useUserStore.getState().setUser(null);
        set({
          token: null,
          phone: null,
          status: "succeeded",
          fetching: false,
        });
        useModel.getState().onClose();
        showSucessToast("Logged out successfully!");
      },
      checkAuth: async () => {
        set({ fetching: true, status: "loading", error: null });
        const { token } = get();
        if (token) {
          try {
            useUserStore.getState().getUser(token);
            set({ fetching: false, status: "idle", error: null });
          } catch (error) {
            set({ fetching: false, status: "idle", error: null });
          }
        } else {
          set({ fetching: false, status: "idle", error: null });
        }
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        token: state.token,
        phone: state.phone,
      }),
    }
  )
);

export default useAuthStore;
