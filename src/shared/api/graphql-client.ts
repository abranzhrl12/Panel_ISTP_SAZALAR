// @shared/api/graphql-client.ts
import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@features/auth/store/auth.store";

const GRAPHQL_API_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT;

if (!GRAPHQL_API_URL) {
  console.error("Environment variable VITE_GRAPHQL_ENDPOINT is not defined.");
  // Dependiendo de tu aplicación, podrías lanzar un error o salir aquí.
  // throw new Error('VITE_GRAPHQL_ENDPOINT is not defined');
}

export const publicGraphQLClient = new GraphQLClient(GRAPHQL_API_URL);

export const createGraphQLClient = (accessToken?: string): GraphQLClient => {
  return new GraphQLClient(GRAPHQL_API_URL, {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
};

// OPCIÓN 1: Si realmente necesitas una función utilitaria que NO sea un hook de React
// y que pueda obtener el token de Zustand directamente.
// NOTA: Esto solo funcionará DESPUÉS de que el store de Zustand se haya hidratado.
// Si se llama antes, `accessToken` podría ser undefined/null.
export async function requestWithAuth(query: string, variables?: any) {
  const accessToken = useAuthStore.getState().accessToken;
  const client = createGraphQLClient(accessToken || undefined);
  return client.request(query, variables);
}

// OPCIÓN 2 (Recomendada): Eliminar getAuthenticatedGraphQLClient y usar useAuthClient en componentes
// y pasar el token explícitamente a createGraphQLClient en otros lugares si es necesario.
// Esto es generalmente más claro para el flujo de datos.
