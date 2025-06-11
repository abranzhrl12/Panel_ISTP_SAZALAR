// @features\auth\store\auth.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type User } from "@features/auth/interface/user-interface"; // Importa la interfaz User

export interface AuthState {
  [x: string]: any;
  accessToken: string | null;
  refreshToken: string | null; // Asumo que también manejas refreshToken
  user: User | null; // Usa la interfaz User aquí
  lastActivityTimestamp: number | null; // Timestamp de la última actividad del usuario
  logoutReason: "inactivity" | "manual" | null; // Razón del último cierre de sesión (ej: 'inactivity', 'manual')

  // Acciones para modificar el estado
  setAuth: (data: { accessToken: string; user: User }) => void;
  logout: (reason?: "inactivity" | "manual" | null) => void; // Acción para cerrar sesión, opcionalmente con una razón
  setTokens: (accessToken: string, refreshToken: string) => void; // Acción para actualizar solo los tokens
  setLastActivityTimestamp: (timestamp: number) => void; // Acción para actualizar el timestamp de actividad
  setLogoutReason: (reason: "inactivity" | "manual" | null) => void; // Acción para establecer la razón del logout
  setUser: (user: User) => void; // <-- ¡NUEVA ACCIÓN: Para actualizar solo el objeto de usuario!
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 'get' está aquí pero no se usa en las acciones actuales. Es normal para el linter.
      accessToken: null,
      refreshToken: null,
      user: null,
      lastActivityTimestamp: Date.now(), // Inicializa con el tiempo actual al cargar el store
      logoutReason: null,

      setAuth: ({ accessToken, user }) =>
        set({
          accessToken,
          user,
          lastActivityTimestamp: Date.now(), // Actualiza el timestamp de actividad al iniciar sesión
          logoutReason: null, // Limpia cualquier razón de logout anterior
        }),

      logout: (reason = null) => {
        // Puedes añadir lógica para llamar a tu backend para invalidar el token si es necesario
        /*
        const currentAccessToken = get().accessToken; // Ejemplo de uso de 'get()'
        if (currentAccessToken) {
          try {
            fetch('http://tu-api.com/api/auth/logout', { // Reemplaza con la URL real de tu endpoint
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentAccessToken}`,
              },
            }).then(response => {
              if (!response.ok) console.error("Error al invalidar token en el backend:", response.statusText);
            }).catch(error => {
              console.error("Error de red al intentar invalidar token:", error);
            });
          } catch (error) {
            console.error("Error al intentar invalidar token (sincrónico):", error);
          }
        }
        */

        // Limpia el estado de autenticación en el cliente (Zustand y localStorage)
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          lastActivityTimestamp: null, // Limpia el timestamp al deslogearse
          logoutReason: reason, // Establece la razón del logout
        });
      },

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      setLastActivityTimestamp: (timestamp) =>
        set({ lastActivityTimestamp: timestamp }),

      setLogoutReason: (reason) => set({ logoutReason: reason }),

      // NUEVA ACCIÓN: Para actualizar solo el objeto de usuario
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // Nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
