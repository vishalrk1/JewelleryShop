import { IUser } from "@/lib/types";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import axios from "axios";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import useUserStore from "./useUserStore";

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
          console.log(error);
          set({
            status: "failed",
            error: error?.response?.data || "Registration failed",
            fetching: false,
          });
          showErrorToast(error?.data, true);
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
            set({
              status: "succeeded",
              token: res.data.token,
              phone: res.data.user.phone,
              fetching: false,
            });
            showSucessToast("Login successful 😎, Welcome back!!");
          }
        } catch (error: any) {
          set({
            status: "failed",
            error: error.response?.data || "Login failed",
            fetching: false,
          });
          showErrorToast(error.response?.data, true);
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
        showSucessToast("Logged out successfully!");
      },
      checkAuth: async () => {
        const { token } = get();
        if (token) {
          useUserStore.getState().getUser(token);
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
