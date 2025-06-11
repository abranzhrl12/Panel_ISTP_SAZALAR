// @features/user-management/users/schemas/createUser.schema.ts
// Este archivo define los esquemas de validación para la creación de usuarios.

import { z } from "zod";
// Importamos la interfaz User desde su ubicación centralizada
import { type User } from "@features/auth/interface/user-interface"; // Ajusta esta ruta si la interfaz User se mueve

// Esquema para la entrada (payload) de la mutación createUser.
// Esto valida los datos que el frontend envía al backend para crear un usuario.
export const CreateUserInputSchema = z.object({
  email: z.string().email("Debe ser un email válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  // `roleId` es un número entero positivo, ya que tu backend GraphQL espera `roleId: Int!`.
  roleId: z
    .number()
    .int("El ID del rol debe ser un número entero.")
    .positive("El ID del rol debe ser un número positivo."),
  // `isActive` es opcional, y por defecto se asume `true` si no se envía en el backend.
  isActive: z.boolean().optional(),
});

// Esquema para la respuesta esperada de la mutación createUser.
// Esto valida los datos que el backend devuelve después de crear un usuario.
// Debe ser consistente con tu interfaz User y lo que tu backend realmente devuelve.
export const CreatedUserResponseSchema = z.object({
  // El nombre del campo aquí (`createUser`) debe coincidir con el nombre de la mutación en tu backend GraphQL.
  createUser: z.object({
    id: z.string(), // El ID del usuario (generalmente un string UUID)
    email: z.string().email(),
    isActive: z.boolean(),
    avatarUrl: z.string().nullable().optional(), // Puede ser null o undefined
    avatarPublicId: z.string().nullable().optional(), // Puede ser null o undefined
    createdAt: z.string(), // Fecha de creación (generalmente un string ISO 8601)
    updatedAt: z.string().optional(), // Fecha de última actualización (puede ser opcional si no se devuelve siempre)
    role: z
      .object({
        // Objeto de rol, si tu backend lo devuelve
        id: z.string(), // ID del rol (string o number, según tu backend)
        name: z.string(), // Nombre del rol
        description: z.string().optional(), // Descripción del rol (opcional)
        permissions: z
          .array(
            z.object({
              // Lista de permisos (opcional)
              id: z.string(),
              name: z.string(),
              description: z.string().optional(), // Descripción del permiso (opcional)
            })
          )
          .optional(),
      })
      .optional(), // El rol completo puede ser opcional
  }) as unknown as z.ZodType<User>, // Asegura que el tipo inferido sea 'User'
});

// Tipos inferidos de los esquemas para su uso en la aplicación (TypeScript)
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type CreatedUserResponse = z.infer<
  typeof CreatedUserResponseSchema
>["createUser"];
