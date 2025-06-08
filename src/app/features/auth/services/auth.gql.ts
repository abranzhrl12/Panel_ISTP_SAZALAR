// src/features/auth/services/auth.gql.ts
import { gql } from "graphql-request";

export const USER_LOGIN_MUTATION = gql`
  mutation UserLogin($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
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
  }
`;

// ====================================================================
// MUTACIÓN DE REGISTRO (CORREGIDA para coincidir con el retorno del backend actual)
// ====================================================================

export const USER_REGISTER_MUTATION = gql`
  mutation UserRegister($registerInput: CreateUserInput!) {
    registerUser(createUserInput: $registerInput) {
      id
      email
      role
      isActive
      avatarUrl
    }
  }
`;
