// @features/dashboard/pages/AnalyticsDashboardPage.tsx
// Esta es la página de vista general del dashboard de análisis.
import React from "react";

export const AnalyticsDashboardPage: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl mx-auto mt-12 transform transition-all duration-300 hover:scale-[1.005]">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center tracking-wide">
        Análisis de Proyectos
      </h1>
      <p className="text-lg text-gray-700 text-center leading-relaxed max-w-2xl mx-auto mb-10">
        Bienvenido a tu panel de análisis. Aquí encontrarás una visión profunda
        de tus proyectos activos, el progreso de las tareas y la eficiencia de
        tu equipo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Tarjeta de Proyectos Activos */}
        <div className="bg-indigo-100 p-6 rounded-xl shadow-md border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-2">
            Proyectos Activos
          </h3>
          <p className="text-4xl font-extrabold text-indigo-600">18</p>
          <p className="text-sm text-indigo-700 mt-2">En curso y gestionados</p>
        </div>
        {/* Tarjeta de Tareas Completadas */}
        <div className="bg-emerald-100 p-6 rounded-xl shadow-md border border-emerald-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-2">
            Tareas Completadas (Últimos 30 días)
          </h3>
          <p className="text-4xl font-extrabold text-emerald-600">452</p>
          <p className="text-sm text-emerald-700 mt-2">Un gran progreso</p>
        </div>
        {/* Tarjeta de Presupuesto Restante */}
        <div className="bg-rose-100 p-6 rounded-xl shadow-md border border-rose-200">
          <h3 className="text-xl font-bold text-rose-800 mb-2">
            Presupuesto Restante
          </h3>
          <p className="text-4xl font-extrabold text-rose-600">$12,500</p>
          <p className="text-sm text-rose-700 mt-2">
            Listo para nuevas inversiones
          </p>
        </div>
      </div>
      <p className="mt-12 text-gray-600 text-sm text-center">
        Los datos presentados son de muestra y se actualizarán con información
        en tiempo real de tus herramientas de gestión de proyectos.
      </p>
    </div>
  );
};
