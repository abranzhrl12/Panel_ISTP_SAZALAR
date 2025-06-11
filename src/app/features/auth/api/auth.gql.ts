// @features/auth/api/auth.gql.ts
import { gql } from "graphql-request";

export const USER_LOGIN_MUTATION = gql`
  mutation LoginUser($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      accessToken
      user {
        id
        email
        name
        lastName
        isActive
        role {
          id
          name
        }
      }
    }
  }
`;
