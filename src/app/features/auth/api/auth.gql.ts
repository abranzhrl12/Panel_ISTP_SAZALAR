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
          permissions {
            id
            name
          }
        }
      }
    }
  }
`;
