// @shared\hooks\auth\useAuth.ts
// Este hook proporciona el estado de autenticación global del usuario.

import { useEffect, useState } from "react";
import { useAuthStore } from "@features/auth/store/auth.store"; // Importa useAuthStore desde su propio archivo
import { type User } from "@features/auth/interface/user-interface"; // Importa la interfaz User

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  isLoading: boolean; // Indica si la autenticación inicial está cargando
}

/**
 * Hook para acceder al estado de autenticación del usuario.
 * Proporciona el usuario logeado, el estado de autenticación y si está cargando.
 */
export const useAuth = (): UseAuthReturn => {
  // Utilizamos `shallow` con el selector para optimizar re-renderizados.
  // Esto asegura que el componente solo se re-renderice si los valores de accessToken o user cambian,
  // no solo la referencia del objeto que los contiene.
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  // Estado para controlar si la autenticación inicial está "cargando".
  const [isLoading, setIsLoading] = useState(true);

  // Determina si el usuario está autenticado basándose en la existencia de un accessToken.
  const isAuthenticated = !!accessToken;

  // `useEffect` para simular una carga inicial o verificar el token.
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Aquí puedes tener lógica para validar el token si es necesario al cargar la app.
      // Por ahora, solo simula que la carga ha terminado.
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []); // Se ejecuta solo una vez al montar el componente

  return {
    isAuthenticated,
    user,
    accessToken,
    isLoading,
  };
};
