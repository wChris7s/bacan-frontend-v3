import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "~/lib/api/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  isEntrepreneur: () => boolean;
  isCustomer: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      isEntrepreneur: () => get().user?.role === UserRole.ENTREPRENEUR,
      isCustomer: () => get().user?.role === UserRole.CUSTOMER,
    }),
    {
      name: "auth-storage",
    }
  )
);
