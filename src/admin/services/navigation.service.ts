// src\admin\services\navigation.service.ts
import { publicGraphQLClient } from "../../shared/api/graphql-client";
import { GET_ADMIN_NAVIGATION_ITEMS_QUERY } from "../api/navigation.gql";
import { GetAdminNavigationItemsResponseSchema } from "../schemas/navigation.schemas";
import type { AdminNavigationItem } from "../interfaces/navigation-item.interface";

interface GetAdminNavigationItemsGraphQLResponse {
  getAdminNavigationItems: AdminNavigationItem[];
}

interface GetAdminNavigationItemsInput {
  location?: string;
  parentId?: string | null;
  isActive?: boolean;
}

export const fetchAdminNavigationItems = async (
  input?: GetAdminNavigationItemsInput
): Promise<AdminNavigationItem[]> => {
  const variables = {
    location: input?.location,
    parentId:
      typeof input?.parentId === "undefined" ? undefined : input.parentId,
    isActive: input?.isActive,
  };

  const data =
    await publicGraphQLClient.request<GetAdminNavigationItemsGraphQLResponse>(
      GET_ADMIN_NAVIGATION_ITEMS_QUERY,
      variables
    );

  // Validación Zod
  try {
    GetAdminNavigationItemsResponseSchema.parse(data);
  } catch (validationError) {
    console.error("Zod validation failed:", validationError);
    throw validationError; // Relanza el error para que el hook lo capture
  }

  return data.getAdminNavigationItems.sort((a, b) => a.order - b.order);
};
