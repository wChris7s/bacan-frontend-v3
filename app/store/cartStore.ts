import { create } from "zustand";
import { Cart } from "~/lib/api/types";

interface CartState {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  clearLocalCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  clearLocalCart: () => set({ cart: null }),
}));
