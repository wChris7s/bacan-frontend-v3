import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponse, User, UserRole } from "~/lib/api/types";
import { apiClient, tokenManager } from "~/lib/api/client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  loginWithResponse: (response: LoginResponse) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;

  // Helpers
  isEntrepreneur: () => boolean;
  isCustomer: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

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
          console.error("Logout error:", error);
        } finally {
          tokenManager.clearTokens();
          set({ user: null, isAuthenticated: false });
        }
      },

      initializeAuth: async () => {
        set({ isLoading: true });

        // Check if we have a valid token
        if (tokenManager.hasValidToken()) {
          try {
            // Try to refresh the token to verify it's still valid
            const refreshed = await apiClient.refreshToken();
            if (refreshed) {
              const user: User = {
                externalId: refreshed.userExternalId,
                email: refreshed.email,
                role: refreshed.role,
                firstName: refreshed.firstName,
                lastName: refreshed.lastName,
              };
              set({ user, isAuthenticated: true, isLoading: false });
              return;
            }
          } catch (error) {
            console.error("Token refresh failed:", error);
          }
        }

        // No valid token or refresh failed
        tokenManager.clearTokens();
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      isEntrepreneur: () => get().user?.role === UserRole.ENTREPRENEUR,
      isCustomer: () => get().user?.role === UserRole.CUSTOMER,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
