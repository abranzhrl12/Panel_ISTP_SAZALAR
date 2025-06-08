// src/features/auth/services/login.schemas.ts
import { z } from "zod";
// CORRECCIÓN: Ruta de importación de la interfaz User ajustada.
import { type User } from "@features/auth/interface/user-interface";

// Esquema de validación para las credenciales de Login
export const LoginCredentialsSchema = z.object({
  email: z.string().email("Por favor, introduce un email válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

// Esquema para la respuesta que esperamos del servidor al Login
export const LoginResponseSchema = z.object({
  login: z.object({
    accessToken: z.string(),
    user: z.object({
      id: z.string(),
      email: z.string().email(),
      isActive: z.boolean(),
      avatarUrl: z.string().nullable(),
      role: z.object({
        id: z.string(), 
        name: z.string(),
        permissions: z.array(
          z.object({
            // <-- ¡AÑADIDO! Array de permisos
            id: z.string(), // O z.number()
            name: z.string(),
            description: z.string().optional(),
          })
        ),
      }),
    }) as z.ZodType<User>, // Asegura que el tipo inferido sea 'User'
  }),
});

// Tipos inferidos de los esquemas para Login
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>["login"];
