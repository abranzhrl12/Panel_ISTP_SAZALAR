// @shared/components/layouts/DashboardLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../organisms"; // Asumo que tu Sidebar está en la misma carpeta o ruta relativa
import { SubMenuContainer } from "@shared/components/navigation/SubMenuContainer"; // Importa el SubMenuContainer

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-inter">
      {/* Primer menú (Sidebar principal - fija a la izquierda) */}
      <Sidebar />

      {/* Contenedor flexible para el segundo menú y el contenido principal */}
      <div className="flex flex-grow">
        {" "}
        {/* Este div agrupará el SubMenu y el Outlet */}
        {/* Segundo menú (Submenú contextual - al lado del primer sidebar) */}
        <SubMenuContainer />
        {/* Contenido principal de la página (donde se cargan las rutas) */}
        <main className="flex-grow p-6 overflow-auto bg-gray-50 dark:bg-gray-800">
          <Outlet />{" "}
          {/* Aquí se renderiza el contenido de las rutas anidadas (Dashboard, Users, etc.) */}
        </main>
      </div>
    </div>
  );
};
