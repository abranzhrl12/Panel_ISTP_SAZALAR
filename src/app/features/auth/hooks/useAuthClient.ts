// src/features/auth/hooks/useAuthClient.ts

import { useMemo } from 'react';
import { GraphQLClient } from 'graphql-request';
import { useAuthStore } from '@features/auth/store/auth.store'; // Tu store de Zustand
import { createGraphQLClient } from '@shared/api/graphql-client'; // Tu función factoría del cliente GraphQL

export const useAuthClient = (): GraphQLClient => {
  const accessToken = useAuthStore((state) => state.accessToken);

  // Memoizamos el cliente para que solo se cree una nueva instancia
  // cuando el accessToken cambie.
  const authClient = useMemo(() => {
    return createGraphQLClient(accessToken || undefined);
  }, [accessToken]);

  return authClient;
};

