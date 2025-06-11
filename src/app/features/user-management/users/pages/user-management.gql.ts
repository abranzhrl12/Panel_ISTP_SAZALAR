// @features\user-management\users\pages\user-management.gql.ts
// Definiciones GraphQL para la gestión de usuarios (CRUD de usuarios por administradores).

import { gql } from "graphql-request";

// ====================================================================
// Mutación para Crear Usuario (por Administrador)
// ====================================================================
// Crea un nuevo usuario con los detalles proporcionados.
// La mutación espera un 'createUserInput' de tipo 'CreateUserInput!'.
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      isActive
      avatarUrl
      avatarPublicId # Incluido para consistencia con la interfaz User
      createdAt
      updatedAt # Incluido para consistencia con la interfaz User
      role {
        id
        name
        description # Incluido para consistencia con la interfaz User
        permissions {
          id
          name
          description # Incluido para consistencia con la interfaz User
        }
      }
    }
  }
`;

// ====================================================================
// Mutación para Actualizar un Usuario Existente (por Administrador)
// ====================================================================
export const UPDATE_USER_MANAGEMENT_MUTATION = gql`
  mutation UpdateUser($id: String!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      id
      email
      isActive
      avatarUrl
      role {
        id
        name
        description
        permissions {
          id
          name
          description
        }
      }
    }
  }
`;

// Query para obtener una lista de usuarios
export const GET_ALL_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      email
      isActive
      avatarUrl
      avatarPublicId
      createdAt
      updatedAt
      role {
        id
        name
        description
        permissions {
          id
          name
          description
        }
      }
    }
  }
`;
// Opcional: Mutación para eliminar un usuario
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
