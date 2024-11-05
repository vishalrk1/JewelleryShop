import { create } from "zustand";

interface UseModelProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModel = create<UseModelProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
