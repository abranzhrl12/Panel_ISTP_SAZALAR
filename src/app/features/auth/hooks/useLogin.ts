// @features\auth\hooks\useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  type LoginCredentials,
  type LoginResponse,
} from "../schemas/login.schemas";
import { login } from "../services/login.service";
import { useAuthStore, type AuthState } from "../store/auth.store";
import { publicGraphQLClient } from "@shared/api/graphql-client"; // Correcto: usa el cliente público

export const useLogin = () => {
  // CORRECCIÓN: Tipar 'state' con AuthState
  const setAuth = useAuthStore((state: AuthState) => state.setAuth);
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) =>
      login(publicGraphQLClient, credentials), // Pasa el cliente público

    onSuccess: async (loggedInUser: LoginResponse) => {
      setAuth({
        accessToken: loggedInUser.accessToken,
        user: loggedInUser.user,
      });
      navigate("/home", { replace: true });
    },

    onError: (error) => {
      console.error("Login fallido:", error);
    },
  });
};
