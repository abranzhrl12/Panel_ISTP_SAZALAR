// src/features/user-management/hooks/useDeleteUser.ts
// Hook para la eliminación de usuarios por un administrador.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/user-management.service";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  // useMutation tipado para la respuesta de deleteUser, el tipo de error y el ID del usuario a eliminar.
  return useMutation<{ id: string }, Error, string>({
    mutationFn: (id: string) => deleteUser(id), // La función que llama al servicio para eliminar el usuario
    onSuccess: (deletedUserData) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(
        "Usuario eliminado exitosamente (por admin):",
        deletedUserData.id
      );
    },

    onError: (error) => {
      console.error("Error al eliminar usuario (por admin):", error);
    },
  });
};
