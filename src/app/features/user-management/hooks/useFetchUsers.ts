// src/features/user-management/hooks/useFetchUsers.ts
// Hook para obtener una lista de usuarios (típicamente para un panel de administración).

import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { getAllUsers } from "../services/user-management.service";
import { type User } from "@features/auth/interface/user-interface";

export const useFetchUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"], // Clave única para esta query en la caché de React Query
    queryFn: getAllUsers, // La función que React Query ejecutará para obtener los datos
    staleTime: 5 * 60 * 1000, // Los datos se consideran "frescos" por 5 minutos antes de ser invalidados automáticamente

    onSuccess: (data: string | any[]) => {
      console.log(
        "Lista de usuarios obtenida exitosamente:",
        data.length,
        "usuarios."
      );
    },
    onError: (error: any) => {
      console.error("Error al obtener la lista de usuarios:", error);
    },
  } as UseQueryOptions<User[], Error>);
};
