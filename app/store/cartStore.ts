import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
      name: "bacan-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);