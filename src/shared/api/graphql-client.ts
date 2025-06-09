// src/shared/api/graphql-client.ts
import { GraphQLClient } from 'graphql-request';
import { useAuthStore } from '@features/auth/store/auth.store'; // Asegúrate de que esta ruta sea correcta

// Lee la variable de entorno de Vite
const GRAPHQL_API_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT;

// Asegúrate de que la URL exista antes de usarla
if (!GRAPHQL_API_URL) {
  console.error('Environment variable VITE_GRAPHQL_ENDPOINT is not defined.');
  // Puedes lanzar un error o proporcionar un valor por defecto seguro si es necesario
  // throw new Error('VITE_GRAPHQL_ENDPOINT is not defined');
}

// Cliente GraphQL para solicitudes públicas (sin token)
export const publicGraphQLClient = new GraphQLClient(GRAPHQL_API_URL);

// Cliente GraphQL para solicitudes autenticadas
export const getAuthenticatedGraphQLClient = (): GraphQLClient => {
  const accessToken = useAuthStore.getState().accessToken;

  return new GraphQLClient(GRAPHQL_API_URL, {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      // Puedes añadir otros encabezados aquí si es necesario
    },
  });
};