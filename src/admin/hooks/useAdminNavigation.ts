// src/admin/navigation/hooks/useAdminNavigation.ts
import { useState, useEffect, useCallback } from 'react';
import type { AdminNavigationItem } from '../interfaces/navigation-item.interface';
import { fetchAdminNavigationItems } from '../services/navigation.service'; // <-- Importación corregida

interface UseAdminNavigationOptions {
  parentId?: string | null; // null para ítems de nivel superior
  isActive?: boolean; // Para filtrar por estado activo
  skip?: boolean; // Para omitir la ejecución de la query inicialmente
}

// Interfaz para el resultado que devuelve el hook (esto se mantiene igual)
interface UseAdminNavigationResult {
  adminNavigationItems: AdminNavigationItem[];
  loading: boolean;
  error: Error | null;
  refetch: (options?: UseAdminNavigationOptions) => Promise<void>; // Función para re-consultar
}

export function useAdminNavigation(options?: UseAdminNavigationOptions): UseAdminNavigationResult {
  const [adminNavigationItems, setAdminNavigationItems] = useState<AdminNavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNavItems = useCallback(async (currentOptions?: UseAdminNavigationOptions) => {
    // Si 'skip' está en true, no ejecutamos la query
    if (currentOptions?.skip) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null); // Resetea el error antes de cada intento de fetch

      // ¡Aquí está el cambio clave! Llama a tu nuevo servicio en lugar de publicGraphQLClient directamente.
      // El servicio ya se encarga de preparar variables, hacer la solicitud y validar con Zod.
      const data = await fetchAdminNavigationItems({
        parentId: currentOptions?.parentId,
        isActive: currentOptions?.isActive,
      });

      // El servicio ya te devuelve los datos procesados y ordenados.
      setAdminNavigationItems(data);

    } catch (err) {
      console.error('Error fetching admin navigation items in hook:', err);
      // El servicio ya relanza el error de validación, así que simplemente lo capturamos aquí.
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias del useCallback: ninguna, ya que los `options` se pasan como argumento

  // Este useEffect re-ejecuta `fetchNavItems` cuando cambian las opciones
  useEffect(() => {
    fetchNavItems(options);
  }, [fetchNavItems, options]); // Dependencias: la función memoizada y las opciones del hook

  // Función para re-consultar, permite recargar los datos desde fuera del hook
  const refetch = useCallback(async (refetchOptions?: UseAdminNavigationOptions) => {
    // Cuando se llama a refetch, pasamos las nuevas opciones (si las hay) o las opciones actuales
    // al fetchNavItems.
    await fetchNavItems(refetchOptions || options);
  }, [fetchNavItems, options]); // Dependencias: la función memoizada y las opciones actuales

  return { adminNavigationItems, loading, error, refetch };
}