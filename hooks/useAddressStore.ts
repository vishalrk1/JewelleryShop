import { IAddress } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";
import * as z from "zod";
import { AddressDetailsSchema } from "@/schemas";
import { showErrorToast, showSucessToast } from "@/utils/toasts";

interface AddressState {
  addresses: IAddress[] | [];
  fetching: boolean;
  error: string | null;
  getAddresses: () => Promise<void>;
  addAddress: (
    address: z.infer<typeof AddressDetailsSchema>,
    token: string
  ) => Promise<boolean>;
  updateAddress: (
    address: z.infer<typeof AddressDetailsSchema>,
    addressId: string,
    token: string
  ) => Promise<boolean>;
  deleteAddress: (addressId: string, token: string) => Promise<boolean>;
  setAddresses: (addresses: IAddress[]) => void;
}

const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  fetching: false,
  error: null,
  getAddresses: async () => {
    set({ fetching: true, error: null });
  },
  addAddress: async (
    address: z.infer<typeof AddressDetailsSchema>,
    token: string
  ) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address/add`,
        {
          ...address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      set({ addresses: res.data.addresses, fetching: false, error: null });
      return true;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      showErrorToast(errorMessage, true);
      set({ error: errorMessage, fetching: false });
      return false;
    }
  },
  updateAddress: async (
    address: z.infer<typeof AddressDetailsSchema>,
    addressId: string,
    token: string
  ) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address/${addressId}`,
        {
          ...address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.address);
      set({ addresses: res.data.address, fetching: false, error: null });
      showSucessToast("Address updated successfully");
      return true;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      showErrorToast(errorMessage, true);
      set({ error: errorMessage, fetching: false });
      return false;
    }
  },
  deleteAddress: async (addressId: string, token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ addresses: res.data.addresses, fetching: false, error: null });
      showSucessToast("Address deleted successfully");
      return true;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      showErrorToast(errorMessage, true);
      set({ error: errorMessage, fetching: false });
      return false;
    }
  },
  setAddresses: (addresses: IAddress[]) => {
    set({ addresses, fetching: false, error: null });
  },
}));

export default useAddressStore;
