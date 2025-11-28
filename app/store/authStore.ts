import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LoginResponse, User, UserRole } from "~/lib/api/types";
import { apiClient, tokenManager } from "~/lib/api/client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  loginWithResponse: (response: LoginResponse) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  setHydrated: (state: boolean) => void;

  // Helpers
  isEntrepreneur: () => boolean;
  isCustomer: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,

      setHydrated: (state: boolean) => set({ isHydrated: state }),

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      loginWithResponse: (response: LoginResponse) => {
        const user: User = {
          externalId: response.userExternalId,
          email: response.email,
          role: response.role,
          firstName: response.firstName,
          lastName: response.lastName,
        };
        set({ user, isAuthenticated: true, isLoading: false });
      },

      logout: async () => {
        try {
          await apiClient.logout();
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        } finally {
          tokenManager.clearTokens();
          set({ user: null, isAuthenticated: false });
        }
      },

      initializeAuth: async () => {
        const state = get();

        // Si ya tenemos usuario en el estado persistido y token válido
        if (state.user && state.isAuthenticated && tokenManager.hasValidToken()) {
          set({ isLoading: false, isHydrated: true });
          return;
        }

        // Si tenemos token pero no usuario, intentamos refrescar
        if (tokenManager.hasValidToken()) {
          set({ isLoading: true });
          try {
            const refreshed = await apiClient.refreshToken();
            if (refreshed) {
              const user: User = {
                externalId: refreshed.userExternalId,
                email: refreshed.email,
                role: refreshed.role,
                firstName: refreshed.firstName,
                lastName: refreshed.lastName,
              };
              set({ user, isAuthenticated: true, isLoading: false, isHydrated: true });
              return;
            }
          } catch (error) {
            console.error("Error al refrescar token:", error);
          }
        }

        // No hay token válido o el refresh falló
        tokenManager.clearTokens();
        set({ user: null, isAuthenticated: false, isLoading: false, isHydrated: true });
      },

      isEntrepreneur: () => get().user?.role === UserRole.ENTREPRENEUR,
      isCustomer: () => get().user?.role === UserRole.CUSTOMER,
    }),
    {
      name: "bacan-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);