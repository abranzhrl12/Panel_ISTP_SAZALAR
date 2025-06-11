// @features/user-management/users/schemas/user-management.schemas.ts
// Esquemas de validación para la obtención de usuarios.

import { z } from "zod";
// Importa la interfaz User, ya que tus usuarios están tipados de esa manera.
import { type User } from "@features/auth/interface/user-interface";

// ====================================================================
// Esquema para Listar Usuarios
// ====================================================================

// Define el esquema para la respuesta de la consulta que lista todos los usuarios.
// Esto debe coincidir con la estructura de la respuesta de tu backend GraphQL para 'users'.
export const GetUsersResponseSchema = z.object({
  // El nombre del campo aquí (ej. 'users') debe coincidir con el campo de la consulta GraphQL
  // que devuelve el array de usuarios.
  users: z.array(
    z.object({
      id: z.string(),
      email: z.string().email(),
      isActive: z.boolean(),
      avatarUrl: z.string().nullable(), // Puede ser null
      avatarPublicId: z.string().nullable().optional(), // Puede ser null o undefined
      createdAt: z.string(), // Generalmente un string de fecha ISO
      updatedAt: z.string().optional(), // Puede ser opcional
      role: z // El rol puede ser un objeto anidado o nulo
        .object({
          id: z.string(), // ID del rol (puede ser string o number)
          name: z.string(),
          description: z.string().optional(), // Puede ser opcional
          permissions: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().optional(),
              })
            )
            .optional(), // Los permisos pueden ser opcionales
        })
        .optional(), // El rol completo puede ser opcional
    }) as unknown as z.ZodType<User> // Asegura que cada objeto en el array sea del tipo 'User'
  ),
});

// Tipo inferido para la lista de usuarios, que es el array de usuarios.
export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>["users"];
