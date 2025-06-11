// @features\auth\services\login.service.ts

import { GraphQLClient } from "graphql-request";
import {
  LoginCredentialsSchema,
  LoginResponseSchema,
  type LoginCredentials,
  type LoginResponse,
} from "../schemas/login.schemas";
import { USER_LOGIN_MUTATION } from "../api/auth.gql"; // Asegúrate de que esta ruta sea correcta

export const login = async (
  client: GraphQLClient, // <-- Recibe el cliente como dependencia
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  LoginCredentialsSchema.parse(credentials); // Valida las credenciales de entrada
  const variables = { loginInput: credentials };
  const response = await client.request(USER_LOGIN_MUTATION, variables); // Realiza la solicitud GraphQL
  const validatedResponse = LoginResponseSchema.parse(response); // Valida la respuesta del servidor
  return validatedResponse.loginUser; // Retorna solo la parte 'loginUser'
};
