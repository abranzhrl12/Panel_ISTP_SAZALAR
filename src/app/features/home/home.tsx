// @features/home/home.tsx
// Este componente ahora actúa como la página principal del dashboard overview.
// Ya no contiene su propio <Routes> anidado.
import React from "react";
// Si tu DashboardOverviewPage es solo un placeholder, puedes poner el contenido aquí directamente.
import { DashboardOverviewPage } from "@features/dashboard/pages/home/DashboardOverviewPage";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Contenido principal del Dashboard Overview */}
      <div className="flex-grow">
        {/* Renderiza el contenido de tu página de visión general del dashboard */}
        <DashboardOverviewPage />
      </div>
    </div>
  );
};
