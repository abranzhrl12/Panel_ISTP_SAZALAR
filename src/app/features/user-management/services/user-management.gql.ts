// src/features/user-management/services/user-management.gql.ts
// Definiciones GraphQL para la gestión de usuarios (CRUD de usuarios por administradores).

import { gql } from "graphql-request";

// ====================================================================
// Mutación para Crear un Nuevo Usuario (por Administrador)
// ====================================================================
// CORRECCIÓN CLAVE: La mutación ahora acepta una única variable $createUserInput
// que coincide con el nombre del argumento del campo 'createUser' en el backend.
export const CREATE_USER_MUTATION = gql`
  mutation CreateNewUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      isActive
      avatarUrl
      role {
        id
        name
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
      }
    }
  }
`;

// Opcional: Query para obtener una lista de usuarios (Asegúrate que tu backend devuelva 'role' como objeto)
// Actualizado: La consulta ahora solo pide 'name' para el rol.
export const GET_ALL_USERS_QUERY = gql`
  query GetUsers {
    # Cambiado el nombre de la operación a 'GetUsers' para que coincida con tu ejemplo
    users {
      id
      email
      isActive
      role {
        name # <-- Actualizado para pedir solo el nombre del rol
      }
      avatarUrl
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
