// @features/user-management/users/hooks/useFetchUsers.ts
// Hook para obtener una lista de usuarios (típicamente para un panel de administración).

import { useQuery } from "@tanstack/react-query";
// Importa el servicio de user-management que contiene la función getAllUsers.
import { getAllUsers } from "../services/user-management.service";
// Importa la interfaz User desde el módulo de autenticación (ya que es el mismo tipo de usuario).
import { type User } from "@features/auth/interface/user-interface";

export const useFetchUsers = () => {
  // useQuery tipado para la data (array de User), el tipo de error y el queryKey.
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000,
  });
};
