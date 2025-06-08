// src/shared/api/graphql-client.ts (sin cambios respecto a la última versión limpia)

import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error(
    "La variable VITE_GRAPHQL_ENDPOINT no está definida en tu archivo .env"
  );
}
export const createGraphQLClient = (accessToken?: string): GraphQLClient => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return new GraphQLClient(endpoint, { headers });
};

// Instancia pública del cliente GraphQL (sin token)
export const publicGraphQLClient = createGraphQLClient();