// @features/dashboard/components/DashboardSubMenu.tsx
// Este componente contiene los ítems del submenú para la categoría "Dashboard".
import React from "react";
// Importamos la molécula desde su nueva ubicación compartida.
import { SubmenuNavLinkItem } from "@shared/components/molecules";

// Define los tipos de categorías que puede recibir.
// Asegúrate de que MainMenuCategory esté definido en tu stores/menu.store.ts
type MainMenuCategory =
  | "dashboard"
  | "users"
  | "papuperos"
  | "adgroups"
  | "audiences"
  | "reports"
  | "settings"
  | null;

interface DashboardSubMenuProps {
  // Renombramos la interfaz de props
  selectedCategory: MainMenuCategory;
}

export const DashboardSubMenu: React.FC<DashboardSubMenuProps> = (
  {
    // selectedCategory,
  }
) => {
  return (
    <nav className="mb-4">
      <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">
        Dashboard
      </h3>
      <ul className="space-y-2">
        {" "}
        {/* Agregamos un `ul` para agrupar los botones y aplicar espaciado */}
        {/* Usando la molécula SubmenuNavLinkItem para cada enlace del submenú */}
        <SubmenuNavLinkItem to="/home/dashboard" text="Overview" end={true} />
        <SubmenuNavLinkItem to="/home/reports" text="Reportes" />
        <SubmenuNavLinkItem to="/home/settings" text="Configuración" />
        {/* Puedes seguir añadiendo más enlaces de submenú aquí */}
      </ul>
    </nav>
  );
};
