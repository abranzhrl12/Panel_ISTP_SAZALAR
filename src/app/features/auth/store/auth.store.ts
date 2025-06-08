// src/features/auth/store/auth.store.ts
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware"; 
import { type User } from "@features/auth/interface/user-interface";
export interface AuthState {
  accessToken: string | null;
  user: User | null; 
  lastActivityTimestamp: number | null;
  logoutReason: string | null;
  _hasHydrated: boolean; 
  setAuth: (data: { accessToken: string; user: User }) => void;
  logout: (reason?: string) => void;
  setLastActivityTimestamp: (timestamp: number) => void;
  setLogoutReason: (reason: string | null) => void;
  setHasHydrated: (state: boolean) => void; 
}

export const useAuthStore = create<AuthState>()(
  devtools( 
    persist(
      (set) => ({
        accessToken: null,
        user: null,
        lastActivityTimestamp: null,
        logoutReason: null,
        _hasHydrated: false, 

        setAuth: ({ accessToken, user }) =>
          set({
            accessToken,
            user,
            lastActivityTimestamp: Date.now(),
            logoutReason: null,
          }),
        logout: (reason?: string) =>
          set({
            accessToken: null,
            user: null,
            lastActivityTimestamp: null,
            logoutReason: reason || null,
          }),
        setLastActivityTimestamp: (timestamp: number) =>
          set({ lastActivityTimestamp: timestamp }),
        setLogoutReason: (reason: string | null) => set({ logoutReason: reason }),
        setHasHydrated: (state: boolean) => { 
          set({ _hasHydrated: state });
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        // Esto se ejecutará DESPUÉS de que el store haya rehidratado
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setHasHydrated(true); 
          }
        },
      }
    )
  )
);