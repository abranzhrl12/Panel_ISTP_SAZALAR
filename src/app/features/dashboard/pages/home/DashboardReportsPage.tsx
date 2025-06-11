// @features/dashboard/pages/DashboardOverviewPage.tsx
// Esta es la página de vista general por defecto del dashboard.
import React from "react";

export const DashboardReportsPage: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Vista General del Dashboard
      </h1>
      <p className="text-gray-700">
        ¡Bienvenido a tu panel principal! Aquí podrás ver un resumen de tus
        métricas clave, notificaciones importantes y accesos rápidos a las
        funciones más utilizadas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Placeholder para tarjetas de métricas */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800">
            Usuarios Activos
          </h3>
          <p className="text-2xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-800">
            Ventas del Mes
          </h3>
          <p className="text-2xl font-bold text-green-600">$56,789</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-800">
            Alertas Pendientes
          </h3>
          <p className="text-2xl font-bold text-yellow-600">7</p>
        </div>
      </div>
      <p className="mt-8 text-gray-600 text-sm">
        Esta sección se actualizará con datos en tiempo real y componentes
        interactivos.
      </p>
    </div>
  );
};
