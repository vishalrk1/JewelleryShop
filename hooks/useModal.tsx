import { create } from "zustand";

interface useModel {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModel = create<useModel>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
