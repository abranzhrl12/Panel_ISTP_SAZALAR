// src/features/user-management/hooks/useUpdateUser.ts
// Hook para la actualización de usuarios por un administrador.

import { useMutation, useQueryClient } from "@tanstack/react-query";
// Importa el servicio de user-management que contiene la función updateUserAdmin.
import { updateUserAdmin } from "../services/user-management.service";
// Importa los tipos de esquema de entrada y respuesta para la actualización de usuario.
import {
  type UpdateUserManagementInput,
  type UpdateUserManagementResponse,
} from "../services/user-management.schemas";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  // useMutation tipado para la respuesta (UpdateUserManagementResponse), el tipo de error y el objeto de variables.
  return useMutation<
    UpdateUserManagementResponse,
    Error,
    { id: string; input: UpdateUserManagementInput }
  >({
    mutationFn: ({ id, input }) => updateUserAdmin(id, input), // La función que llama al servicio

    onSuccess: (updatedUserData) => {
      // Invalida la caché de queries relacionadas con usuarios
      // para que cualquier lista o detalle de usuario (ej. en un dashboard de admin) se refetch.
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // También invalida la query específica de este usuario si existe.
      queryClient.invalidateQueries({ queryKey: ["user", updatedUserData.id] });

      console.log(
        "Usuario actualizado exitosamente (por admin):",
        updatedUserData
      );
      // Aquí podrías añadir lógica para mostrar un mensaje de éxito al administrador
    },

    onError: (error) => {
      console.error("Error al actualizar usuario (por admin):", error);
      // Aquí podrías mostrar un mensaje de error específico al administrador
    },
  });
};
