// @features\auth\schemas\login.schemas.ts
import { z } from "zod";
import { type User } from "@features/auth/interface/user-interface";

// Esquema de validación para las credenciales de Login
export const LoginCredentialsSchema = z.object({
  email: z.string().email("Por favor, introduce un email válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export const LoginResponseSchema = z.object({
  loginUser: z.object({
    accessToken: z.string(),
    user: z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      lastName: z.string(),
      isActive: z.boolean(),
      avatarUrl: z.string().nullable().optional(),
      role: z.object({
        id: z.string(),
        name: z.string(),
      }),
    }) as z.ZodType<User>,
  }),
});

// Tipos inferidos de los esquemas para Login
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>["loginUser"];
