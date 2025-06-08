// src/features/auth/hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// Importa tipos de registro
import {
  type RegisterCredentials,
  type RegisterResponse,
} from "../services/register.schemas";
import { register } from "../services/register.service"; // <-- ¡IMPORTACIÓN ACTUALIZADA!
import { useAuthStore } from "../store/auth.store";
// Importa la función helper para el inicio de sesión automático
import { performAutoLogin } from "../utils//helpers/auth.helpers";

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation<RegisterResponse, Error, RegisterCredentials>({
    mutationFn: (credentials: RegisterCredentials) => register(credentials),

    onSuccess: async (
      registeredUser: RegisterResponse,
      variables: RegisterCredentials
    ) => {
      console.log("Usuario registrado exitosamente:", registeredUser);

      await performAutoLogin(
        { email: variables.email, password: variables.password },
        navigate,
        setAuth
      );
    },

    onError: (error) => {
      console.error("Registro fallido:", error);
    },
  });
};
