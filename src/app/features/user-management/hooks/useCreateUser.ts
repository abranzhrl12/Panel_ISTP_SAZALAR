// src/features/user-management/hooks/useCreateUser.ts
// Hook para la creación de usuarios por un administrador.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/user-management.service"; // Importa el servicio de creación de usuario
import {
  type CreateUserInput,
  type CreateUserResponse,
} from "../services/user-management.schemas";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateUserResponse, Error, CreateUserInput>({
    mutationFn: (input: CreateUserInput) => createUser(input),

    onSuccess: (newUserData) => {
      // Invalida la caché de queries relacionadas con usuarios
      // para que cualquier lista de usuarios (ej. en un dashboard de admin) se refetch.
      queryClient.invalidateQueries({ queryKey: ["users"] });

      console.log("Usuario creado exitosamente (por admin):", newUserData);
      // Aquí podrías añadir lógica para mostrar un mensaje de éxito al administrador
    },

    onError: (error) => {
      console.error("Error al crear usuario (por admin):", error);
      // Aquí podrías mostrar un mensaje de error específico al administrador
    },
  });
};
