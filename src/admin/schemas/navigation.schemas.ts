// src/admin/navigation/schemas/navigation.schemas.ts
import { z } from "zod";
import { type AdminNavigationItem } from "../interfaces/navigation-item.interface"; // <- RUTA CORREGIDA

// 1. Definimos el esquema base para AdminNavigationItem sin la propiedad 'children'.
// Los tipos de Zod deben coincidir con la interfaz AdminNavigationItem.
const BaseAdminNavigationItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  route: z.string(), // Coincide con la entidad y la interfaz
  icon: z.string().nullable().optional(),
  order: z.number(),
  isActive: z.boolean(),
  requiredPermission: z.string().nullable().optional(), // Coincide con la entidad (string | null | undefined)
  parentId: z.string().nullable().optional(),
});

// 2. Definimos el esquema recursivo final utilizando z.lazy() y .extend().
export const AdminNavigationItemSchema: z.ZodSchema<AdminNavigationItem> = BaseAdminNavigationItemSchema.extend({
  children: z.lazy(() => z.array(AdminNavigationItemSchema)).nullable().optional(),
});

// Esquema para la respuesta completa de la Query GraphQL de ítems de navegación
export const GetAdminNavigationItemsResponseSchema = z.object({
  // Asumimos que navigationItems es un array de AdminNavigationItem.
  // Tu `navigation.resolver.ts` devuelve `Promise<NavigationItem[]>`.
  // Si el backend puede devolver 'null' dentro del array (cosa que no parece por el resolver),
  // entonces usarías z.array(AdminNavigationItemSchema.nullable()).
  navigationItems: z.array(AdminNavigationItemSchema),
});

// Tipo inferido para la respuesta completa
export type GetAdminNavigationItemsResponse = z.infer<typeof GetAdminNavigationItemsResponseSchema>;