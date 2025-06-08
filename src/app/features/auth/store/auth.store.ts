// src/features/auth/store/auth.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// CORRECCIÓN: Ruta de importación de la interfaz User ajustada para la coherencia.
import { type User } from "@features/auth/interface/user-interface";

export interface AuthState {
  accessToken: string | null;
  user: User | null; // Usa la interfaz User aquí
  lastActivityTimestamp: number | null;
  logoutReason: string | null;

  // setAuth ahora acepta un objeto User del tipo de la interfaz
  setAuth: (data: { accessToken: string; user: User }) => void;
  logout: (reason?: string) => void;
  setLastActivityTimestamp: (timestamp: number) => void;
  setLogoutReason: (reason: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      lastActivityTimestamp: null,
      logoutReason: null,

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
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
