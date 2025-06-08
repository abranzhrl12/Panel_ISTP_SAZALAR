// src/features/auth/services/auth.service.ts
import { graphqlClient } from "@shared/api/graphql-client";
import {
  LoginCredentialsSchema,
  LoginResponseSchema,
  type LoginCredentials,
  type LoginResponse,
} from "./login.schemas";
import {
  RegisterCredentialsSchema,
  RegisterResponseSchema,
  type RegisterCredentials,
  type RegisterResponse,
} from "./register.schemas";
import { USER_LOGIN_MUTATION, USER_REGISTER_MUTATION } from "./auth.gql";

// Función de servicio para Login
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  LoginCredentialsSchema.parse(credentials);

  const variables = { loginInput: credentials };
  const response = await graphqlClient.request(USER_LOGIN_MUTATION, variables);

  const validatedResponse = LoginResponseSchema.parse(response);
  return validatedResponse.login;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  RegisterCredentialsSchema.parse(credentials);

  const variables = { registerInput: credentials };
  const response = await graphqlClient.request(
    USER_REGISTER_MUTATION,
    variables
  );

  const validatedResponse = RegisterResponseSchema.parse(response);
  return validatedResponse.registerUser;
};
export type { LoginResponse };
export type { LoginCredentials };
