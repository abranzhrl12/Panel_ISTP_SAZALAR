// src/features/auth/services/login.service.ts
// Este servicio maneja las operaciones de inicio de sesión de usuario.
import { graphqlClient } from "@shared/api/graphql-client";
import {
  LoginCredentialsSchema,
  LoginResponseSchema,
  type LoginCredentials,
  type LoginResponse,
} from "./login.schemas";

import { USER_LOGIN_MUTATION } from "./auth.gql";

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  // 1. Valida las credenciales de entrada utilizando el esquema Zod.
  LoginCredentialsSchema.parse(credentials);
  // 2. Prepara las variables para la mutación GraphQL.
  const variables = { loginInput: credentials };
  // 3. Envía la petición GraphQL al servidor utilizando el cliente configurado.
  const response = await graphqlClient.request(USER_LOGIN_MUTATION, variables);
  // 4. Valida la respuesta recibida del servidor utilizando el esquema Zod.
  const validatedResponse = LoginResponseSchema.parse(response);
  // 5. Retorna la parte relevante de la respuesta, que es el objeto 'login'.
  return validatedResponse.login;
};
