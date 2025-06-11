// @features/user-management/users/hooks/useCreateUser.ts
// Hook para la creación de usuarios por un administrador.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/user-management.service";
import {
  type CreateUserInput,
  type CreatedUserResponse,
} from "../schemas/createUser.schema";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatedUserResponse, Error, CreateUserInput>({
    mutationFn: (input: CreateUserInput) => createUser(input), // La función que llama al servicio para crear el usuario

    onSuccess: (data) => {
      // 1. Invalida la caché de queries relacionadas con usuarios.
      queryClient.invalidateQueries({ queryKey: ["users"] });

      console.log("Usuario creado exitosamente:", data);
    },

    onError: (error) => {
      console.error("Error al crear usuario:", error);
    },
  });
};
