import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart } from "~/lib/api/types";

interface CartState {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  clearLocalCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      setCart: (cart) => set({ cart }),
      clearLocalCart: () => set({ cart: null }),
    }),
    {
      name: "cart-storage",
    }
  )
);
