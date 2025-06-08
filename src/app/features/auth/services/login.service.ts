// src/features/auth/services/login.service.ts (sin cambios)

import { GraphQLClient } from "graphql-request";
import {
  LoginCredentialsSchema,
  LoginResponseSchema,
  type LoginCredentials,
  type LoginResponse,
} from "../schemas/login.schemas";
import { USER_LOGIN_MUTATION } from "../api/auth.gql";


export const login = async (
  client: GraphQLClient, // <-- Recibe el cliente como dependencia
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  LoginCredentialsSchema.parse(credentials);
  const variables = { loginInput: credentials };
  const response = await client.request(USER_LOGIN_MUTATION, variables);
  const validatedResponse = LoginResponseSchema.parse(response);
  return validatedResponse.login;
};