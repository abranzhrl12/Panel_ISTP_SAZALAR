// @shared\components\navigation\SubMenuContainer.tsx
import React from "react";
import { useMenuStore } from "../../../app/features/auth/store/menu.store"; // Importa el store de menú
import { DashboardSubMenu } from "@features/dashboard/components/DashboardSubMenu"; // Importa tu submenú de Dashboard
import { UsersSubMenu } from "@features/user-management/users/components/userSubMenu/UsersSubMenu"; // Importa tu submenú de Usuarios
import { PapuperosSubMenu } from "@features/user-management/users/components/userSubMenu/PapuperosSubMenu";

// Aquí importarías otros submenús si los tuvieras:
// import { CampaignsSubMenu } from '@features/campaigns/components/CampaignsSubMenu';

export const SubMenuContainer: React.FC = () => {
  const selectedCategory = useMenuStore((state) => state.selectedCategory);

  return (
    <div className="w-64 bg-white shadow-lg p-4 h-full border-r border-gray-200">
      {selectedCategory === "dashboard" && (
        <DashboardSubMenu selectedCategory={null} />
      )}
      {selectedCategory === "users" && <UsersSubMenu />}
      {selectedCategory === "papus" && <PapuperosSubMenu />}
      {/* Añade más condiciones para otros submenús */}
      {/* {selectedCategory === 'campaigns' && <CampaignsSubMenu />} */}

      {/* Si no hay categoría seleccionada o es null, puedes mostrar un mensaje o nada */}
      {selectedCategory === null && (
        <p className="text-gray-500">
          Selecciona una categoría del menú principal.
        </p>
      )}
    </div>
  );
};
