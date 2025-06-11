// @features/dashboard/pages/UserSettingsPage.tsx
// Esta es la página de configuración de perfil o ajustes de usuario.
import React from "react";

export const UserSettingsPage: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-xl mx-auto mt-10 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Ajustes de Usuario
      </h1>
      <p className="text-lg text-gray-700 text-center leading-relaxed mb-10">
        Gestiona tu información personal, seguridad de la cuenta y preferencias
        de la aplicación desde aquí. Tu privacidad y control son nuestra
        prioridad.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Tarjeta de Información Personal */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-md border border-indigo-200">
          <h3 className="text-xl font-semibold text-indigo-800 mb-3">
            Información Personal
          </h3>
          <p className="text-base text-indigo-700">
            Actualiza tu nombre, correo electrónico y foto de perfil.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
            Editar Perfil
          </button>
        </div>
        {/* Tarjeta de Seguridad de Cuenta */}
        <div className="bg-emerald-50 p-6 rounded-lg shadow-md border border-emerald-200">
          <h3 className="text-xl font-semibold text-emerald-800 mb-3">
            Seguridad de Cuenta
          </h3>
          <p className="text-base text-emerald-700">
            Cambia tu contraseña, configura la autenticación de dos factores y
            revisa la actividad reciente.
          </p>
          <button className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors">
            Ajustes de Seguridad
          </button>
        </div>
        {/* Tarjeta de Preferencias de Notificación */}
        <div className="bg-rose-50 p-6 rounded-lg shadow-md border border-rose-200 col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold text-rose-800 mb-3">
            Preferencias de Notificación
          </h3>
          <p className="text-base text-rose-700">
            Controla qué tipo de alertas y actualizaciones recibes por correo
            electrónico o dentro de la aplicación.
          </p>
          <button className="mt-4 px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors">
            Configurar Notificaciones
          </button>
        </div>
      </div>
      <p className="mt-10 text-gray-600 text-sm text-center">
        Todos los cambios se guardan automáticamente. Tus datos están seguros
        con nosotros.
      </p>
    </div>
  );
};
