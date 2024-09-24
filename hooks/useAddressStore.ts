import { IAddress } from "@/lib/types";
import { create } from "zustand";

interface AddressState {
  addresses: IAddress[] | [];
  fetching: boolean;
  error: string | null;
  getAddresses: () => Promise<void>;
  setAddresses: (addresses: IAddress[]) => void;
}

const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  fetching: false,
  error: null,
  getAddresses: async () => {
    set({ fetching: true, error: null });
  },
  setAddresses: (addresses: IAddress[]) => {
    set({ addresses, fetching: false, error: null });
  },
}));

export default useAddressStore;
