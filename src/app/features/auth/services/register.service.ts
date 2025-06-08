// src/features/auth/services/register.service.ts
// Este servicio maneja las operaciones de registro de usuario.

import { graphqlClient } from "@shared/api/graphql-client";
import {
  RegisterCredentialsSchema,
  RegisterResponseSchema,
  type RegisterCredentials,
  type RegisterResponse,
} from "./register.schemas";

import { USER_REGISTER_MUTATION } from "./auth.gql";

export const register = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  // 1. Valida las credenciales de entrada utilizando el esquema Zod.
  RegisterCredentialsSchema.parse(credentials);
  // 2. Prepara las variables para la mutación GraphQL.
  const variables = { registerInput: credentials };
  // 3. Envía la petición GraphQL al servidor.
  const response = await graphqlClient.request(
    USER_REGISTER_MUTATION,
    variables
  );
  // 4. Valida la respuesta recibida del servidor.
  const validatedResponse = RegisterResponseSchema.parse(response);

  // 5. Retorna la parte relevante de la respuesta, que es el objeto 'registerUser'.
  return validatedResponse.registerUser;
};
