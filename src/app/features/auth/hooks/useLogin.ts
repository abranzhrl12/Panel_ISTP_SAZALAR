// src/features/auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// Importa tipos de login de login.schemas.ts
import {
  type LoginCredentials,
  type LoginResponse,
} from "../services/login.schemas";
import { login } from "../services/login.service"; // <-- ¡IMPORTACIÓN ACTUALIZADA!
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => login(credentials),

    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        user: data.user,
      });
      navigate("/home");
    },

    onError: (error) => {
      console.error("Login fallido:", error);
    },
  });
};
