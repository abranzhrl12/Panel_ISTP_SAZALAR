// @app/hooks/useFilteredMenuItems.ts
import { useMemo } from "react";
import { useAuthStore } from "@features/auth/store/auth.store"; // Asume que tu store tiene el rol del usuario
import { type MenuItem, MAIN_MENU_ITEMS } from "../../config/menu.config"; // Importa tu configuración de menú

export const useFilteredMenuItems = (): MenuItem[] => {
  const userRoleName = useAuthStore((state) => state.user?.role?.name);

  const filterItems = (items: MenuItem[]): MenuItem[] => {
    return items.filter((item) => {
      // Si el ítem no tiene roles definidos, es visible para todos (o aplica tu lógica por defecto)
      if (!item.roles) {
        return true;
      }
      // Si el usuario tiene un rol que está incluido en los roles permitidos del ítem
      if (userRoleName && item.roles.includes(userRoleName)) {
        // Si tiene hijos, filtra también los hijos
        if (item.children) {
          item.children = filterItems(item.children);
        }
        return true;
      }
      return false;
    });
  };

  const filteredMenu = useMemo(() => {
    return filterItems(MAIN_MENU_ITEMS);
  }, [userRoleName]); // Recalcula si el rol del usuario cambia

  return filteredMenu;
};
