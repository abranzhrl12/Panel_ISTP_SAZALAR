// src/features/user-management/services/user-management.schemas.ts
// Esquemas de validación para la gestión de usuarios (usado por administradores).

import { z } from "zod";
// Importamos la interfaz User actualizada desde el módulo de autenticación.
// CORRECCIÓN: Ruta de importación ajustada para User.
import { type User } from "@features/auth/interface/user-interface";

// ====================================================================
// Esquema para Crear Usuario (por Administrador)
// ====================================================================

// Actualizado: Define el esquema de entrada para crear un nuevo usuario.
// Ahora incluye 'roleId' como número en lugar de 'role' como string.
export const CreateUserInputSchema = z.object({
  email: z.string().email("Correo electrónico inválido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  roleId: z.number().int("El ID del rol debe ser un número entero."), // <-- Actualizado a roleId: number
  isActive: z.boolean().default(true), // Por defecto, activo
});

// Tipo inferido para la entrada de creación de usuario.
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

// Actualizado: Esquema de respuesta para la creación de usuario.
// Ahora espera un objeto 'role' anidado en lugar de un string directamente.
export const CreateUserResponseSchema = z.object({
  createUser: z.object({
    // El nombre del campo aquí debe coincidir con el campo de la mutación en tu backend
    id: z.string(),
    email: z.string().email(),
    isActive: z.boolean(),
    avatarUrl: z.string().nullable(),
    role: z.object({
      // <-- Actualizado para esperar un objeto de rol
      id: z.string(), // O z.number(), según el tipo de ID de rol en tu backend
      name: z.string(),
    }),
  }) as z.ZodType<User>, // Asegura que el tipo inferido sea 'User'
});

// Tipo inferido para la respuesta de creación de usuario.
export type CreateUserResponse = z.infer<
  typeof CreateUserResponseSchema
>["createUser"];

// ====================================================================
// Esquema para Actualizar Usuario (por Administrador)
// ====================================================================

// Define el esquema de entrada para actualizar un usuario existente.
// Todos los campos son opcionales, ya que las actualizaciones pueden ser parciales.
// Si tu backend permite actualizar el rol por ID, necesitarías un roleId: z.number().optional().
export const UpdateUserManagementInputSchema = z
  .object({
    email: z.string().email("Correo electrónico inválido.").optional(),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .optional(), // Si permites cambiar contraseña aquí
    roleId: z
      .number()
      .int("El ID del rol debe ser un número entero.")
      .optional(), // <-- Añadido roleId opcional para actualización
    isActive: z.boolean().optional(),
    avatarUrl: z.string().url("URL de avatar inválida.").nullable().optional(),
  })
  .partial(); // .partial() hace que todos los campos sean opcionales automáticamente

// Tipo inferido para la entrada de actualización de usuario.
export type UpdateUserManagementInput = z.infer<
  typeof UpdateUserManagementInputSchema
>;

// Actualizado: Esquema de respuesta para la actualización de usuario.
// Similar a CreateUserResponse, espera un objeto 'role' anidado.
export const UpdateUserManagementResponseSchema = z.object({
  updateUser: z.object({
    // El nombre del campo aquí debe coincidir con el campo de la mutación en tu backend
    id: z.string(),
    email: z.string().email(),
    isActive: z.boolean(),
    avatarUrl: z.string().nullable(),
    role: z.object({
      // <-- Actualizado para esperar un objeto de rol
      id: z.string(), // O z.number(), según el tipo de ID de rol en tu backend
      name: z.string(),
    }),
  }) as z.ZodType<User>, // Asegura que el tipo inferido sea 'User'
});

// Tipo inferido para la respuesta de actualización de usuario.
export type UpdateUserManagementResponse = z.infer<
  typeof UpdateUserManagementResponseSchema
>["updateUser"];
