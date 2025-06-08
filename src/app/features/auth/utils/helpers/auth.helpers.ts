// src/features/auth/utils/auth.helpers.ts
// Este archivo contiene funciones de ayuda para el módulo de autenticación.

import {
  login,
  type LoginResponse,
} from "@features/auth/services/auth.service"; // Importa la función de login y su tipo de respuesta
import { type LoginCredentials } from "@features/auth/services/auth.service"; // Importa el tipo de credenciales de login
import type { AuthState } from "@features/auth/store/auth.store"; // Importa el tipo de estado de AuthStore
// Importa el tipo de estado de AuthStore

/**
 * Función helper para manejar el inicio de sesión automático después de un evento (ej. registro).
 * Realiza la llamada a la API de login, actualiza el store de autenticación y navega.
 *
 * @param credentials Las credenciales (email, password) para el inicio de sesión.
 * @param navigate La función `navigate` de `react-router-dom` para la redirección.
 * @param setAuth La acción `setAuth` del store de autenticación para actualizar el estado.
 */
export const performAutoLogin = async (
  credentials: LoginCredentials,
  navigate: (path: string, options?: { replace?: boolean }) => void,
  setAuth: AuthState["setAuth"] // Tipado preciso para la función setAuth del store
) => {
  try {
    // Realiza la petición de login a la API.
    const loginData: LoginResponse = await login(credentials);

    // Actualiza el estado de autenticación global en el store.
    setAuth({
      accessToken: loginData.accessToken,
      user: loginData.user,
    });

    // Navega a la página principal, reemplazando la entrada actual en el historial.
    navigate("/home", { replace: true });
  } catch (loginError) {
    // Manejo de errores si el inicio de sesión automático falla.
    console.error("Error al iniciar sesión automáticamente:", loginError);
    // Redirige al usuario a la página de login para que intente manualmente.
    navigate("/login", { replace: true });
    // Lanzar el error de nuevo para que el hook llamador pueda manejarlo si es necesario.
    throw loginError;
  }
};
