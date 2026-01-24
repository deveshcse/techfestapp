// stores/useModalStore.ts
import { create } from "zustand";
import { ReactNode } from "react";

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  title: string;
  description: string;
  open: (content: ReactNode, title: string, description: string) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  title: "",
  description: "",
  open: (content, title, description) => set({ isOpen: true, content, title, description }),
  close: () => set({ isOpen: false, content: null }),
}));
