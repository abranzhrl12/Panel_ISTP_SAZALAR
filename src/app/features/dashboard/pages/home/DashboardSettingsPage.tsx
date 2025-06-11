// @features/dashboard/pages/DashboardSettingsPage.tsx
import React from "react";

export const DashboardSettingsPage: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Configuración del Dashboard
      </h1>
      <p className="text-gray-700">
        Aquí podrás ajustar las preferencias y configuraciones relacionadas con
        tu panel de control.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Placeholder para opciones de configuración */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800">
            Ajustes de Notificaciones
          </h3>
          <p className="text-sm text-blue-600">Configura tus alertas.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-800">
            Personalizar Widgets
          </h3>
          <p className="text-sm text-green-600">Organiza tu vista.</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-800">
            Conexiones de Datos
          </h3>
          <p className="text-sm text-yellow-600">
            Gestiona fuentes de información.
          </p>
        </div>
      </div>
      <p className="mt-8 text-gray-600 text-sm">
        Esta sección contendrá diversas opciones para adaptar el dashboard a tus
        necesidades.
      </p>
    </div>
  );
};
