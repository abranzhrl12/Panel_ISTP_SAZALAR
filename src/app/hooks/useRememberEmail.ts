// @app/hooks/useRememberEmail.ts
import { useState, useEffect, useCallback } from "react";
import type { IStorage } from "@shared/services/storage/storage.interface";

interface UseRememberEmailReturn {
  email: string;
  setEmail: (email: string) => void;
  rememberMe: boolean;
  setRememberMe: (checked: boolean) => void;
  handleRememberEmail: (currentEmail: string, shouldRemember: boolean) => void;
}
export const useRememberEmail = (
  storageService: IStorage
): UseRememberEmailReturn => {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = storageService.getItem("rememberedEmail"); // Usa el servicio inyectado
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // Marca el checkbox si hay un email guardado
    }
  }, [storageService]); // Dependencia del servicio de almacenamiento

  const handleRememberEmail = useCallback(
    (currentEmail: string, shouldRemember: boolean) => {
      if (shouldRemember) {
        storageService.setItem("rememberedEmail", currentEmail); // Usa el servicio inyectado
      } else {
        storageService.removeItem("rememberedEmail"); // Usa el servicio inyectado
      }
    },
    [storageService]
  );

  return {
    email,
    setEmail,
    rememberMe,
    setRememberMe,
    handleRememberEmail,
  };
};
