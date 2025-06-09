// src/admin/navigation/api/navigation.gql.ts
import { gql } from "graphql-request";

export const GET_ADMIN_NAVIGATION_ITEMS_QUERY = gql`
  query GetAdminNavigationItems($location: String, $parentId: ID, $isActive: Boolean) {
    getAdminNavigationItems(location: $location, parentId: $parentId, isActive: $isActive) {
      id
      label
      route # Asegúrate de que tu entidad se llame 'route', no 'url'
      icon
      order
      isActive
      requiredPermission # Espera string | null
      parentId
      children { # Este campo activa el @ResolveField del backend
        id
        label
        route
        icon
        order
        isActive
        requiredPermission
        parentId
        children { # Segundo nivel de anidación. Añade más si necesitas mayor profundidad.
          id
          label
          route
          icon
          order
          isActive
          requiredPermission
          parentId
          children { # Tercer nivel
            id
            label
            route
            icon
            order
            isActive
            requiredPermission
            parentId
          }
        }
      }
    }
  }
`;

// Puedes añadir otras mutaciones o queries aquí si las necesitas para el admin
export const CREATE_NAVIGATION_ITEM_MUTATION = gql`
  mutation CreateNavigationItem($input: CreateNavigationItemInput!) {
    createNavigationItem(createNavigationItemInput: $input) {
      id
      label
      route
      order
      isActive
      icon
      requiredPermission
      parentId
    }
  }
`;

export const UPDATE_NAVIGATION_ITEM_MUTATION = gql`
  mutation UpdateNavigationItem($input: UpdateNavigationItemInput!) {
    updateNavigationItem(updateNavigationItemInput: $input) {
      id
      label
      route
      order
      isActive
      icon
      requiredPermission
      parentId
    }
  }
`;

export const DELETE_NAVIGATION_ITEM_MUTATION = gql`
  mutation DeleteNavigationItem($id: ID!) {
    deleteNavigationItem(id: $id)
  }
`;