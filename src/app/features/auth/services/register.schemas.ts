// src/features/auth/services/register.schemas.ts
import { z } from "zod";
import { type User } from "@features/auth/interface/user-interface"; // Importa la interfaz User

// Esquema de validación para las credenciales de Registro
export const RegisterCredentialsSchema = z
  .object({
    email: z.string().email("Por favor, introduce un email válido."),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    // Añade un campo para confirmar la contraseña (si tu UI lo requiere)
    // confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.password, {
    // Ejemplo de refinamiento para confirmación
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"], // Ruta del error si las contraseñas no coinciden
  });

// ====================================================================
// Esquema para la respuesta del Registro (CORREGIDA)
// ====================================================================
// Ahora el campo 'registerUser' en la respuesta es directamente el objeto 'User'.
// NO espera 'accessToken' ni un 'user' anidado dentro de 'registerUser'.
export const RegisterResponseSchema = z.object({
  registerUser: z.object({
    id: z.string(),
    email: z.string().email(),
    role: z.string(),
    isActive: z.boolean(),
    avatarUrl: z.string().nullable(),
  }) as unknown as z.ZodType<User>, // Asegura que el tipo inferido sea 'User'
});

// Tipos inferidos de los esquemas para Registro
export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
// El tipo de respuesta 'RegisterResponse' ahora es directamente el tipo 'User'.
export type RegisterResponse = z.infer<
  typeof RegisterResponseSchema
>["registerUser"];
