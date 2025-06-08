// src/features/user-management/services/user-management.service.ts
// Servicios para operaciones CRUD de usuarios (gestionados por administradores).

import { graphqlClient } from "@shared/api/graphql-client"; // Cliente GraphQL
import {
  CreateUserInputSchema,
  CreateUserResponseSchema,
  type CreateUserInput,
  type CreateUserResponse,
  UpdateUserManagementInputSchema,
  UpdateUserManagementResponseSchema,
  type UpdateUserManagementInput,
  type UpdateUserManagementResponse,
} from "./user-management.schemas";
import {
  CREATE_USER_MUTATION,
  UPDATE_USER_MANAGEMENT_MUTATION,
  GET_ALL_USERS_QUERY,
  DELETE_USER_MUTATION,
} from "./user-management.gql";
import { type User } from "@features/auth/interface/user-interface";

export const createUser = async (
  input: CreateUserInput
): Promise<CreateUserResponse> => {
  CreateUserInputSchema.parse(input); // Validar la entrada antes de enviar
  const variables = { createUserInput: input };
  const response = await graphqlClient.request(CREATE_USER_MUTATION, variables);
  const validatedResponse = CreateUserResponseSchema.parse(response);
  return validatedResponse.createUser;
};

export const updateUserAdmin = async (
  id: string,
  input: UpdateUserManagementInput
): Promise<UpdateUserManagementResponse> => {
  UpdateUserManagementInputSchema.parse(input);
  const variables = { id, updateUserInput: input };
  const response = await graphqlClient.request(
    UPDATE_USER_MANAGEMENT_MUTATION,
    variables
  );
  const validatedResponse = UpdateUserManagementResponseSchema.parse(response);
  return validatedResponse.updateUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await graphqlClient.request<{ users: User[] }>(
    GET_ALL_USERS_QUERY
  );

  return response.users as User[];
};

export const deleteUser = async (id: string): Promise<{ id: string }> => {
  // O el tipo de retorno que tenga tu mutación
  const variables = { id };
  const response = await graphqlClient.request<{ deleteUser: { id: string } }>(
    DELETE_USER_MUTATION,
    variables
  );
  return response.deleteUser;
};
