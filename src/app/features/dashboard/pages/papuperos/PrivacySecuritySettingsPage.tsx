// @features/dashboard/pages/PrivacySecuritySettingsPage.tsx
// Esta es la página de configuración de privacidad y seguridad del dashboard.
import React from "react";

export const PrivacySecuritySettingsPage: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl rounded-2xl mx-auto mt-12 max-w-3xl transform transition-all duration-300 hover:scale-[1.005]">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center tracking-wide">
        Privacidad y Seguridad
      </h1>
      <p className="text-lg text-gray-700 text-center leading-relaxed max-w-2xl mx-auto mb-10">
        Gestiona la seguridad de tu cuenta, controla tus datos y revisa la
        actividad para mantener tu información protegida.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Tarjeta de Seguridad de la Cuenta */}
        <div className="bg-blue-100 p-6 rounded-xl shadow-md border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-3">
            Seguridad de la Cuenta
          </h3>
          <p className="text-base text-blue-700 mb-4">
            Cambia tu contraseña, activa la autenticación de dos factores (2FA)
            y revisa los dispositivos conectados.
          </p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            Gestionar Seguridad
          </button>
        </div>
        {/* Tarjeta de Control de Datos y Privacidad */}
        <div className="bg-green-100 p-6 rounded-xl shadow-md border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-3">
            Control de Datos y Privacidad
          </h3>
          <p className="text-base text-green-700 mb-4">
            Revisa y gestiona tus permisos de datos, preferencias de publicidad
            y el uso compartido de información.
          </p>
          <button className="w-full px-4 py-2 bg-green-600 text-white text-base font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md">
            Ajustes de Privacidad
          </button>
        </div>
        {/* Tarjeta de Registro de Actividad y Sesiones */}
        <div className="bg-yellow-100 p-6 rounded-xl shadow-md border border-yellow-200 col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold text-yellow-800 mb-3">
            Registro de Actividad y Sesiones
          </h3>
          <p className="text-base text-yellow-700 mb-4">
            Consulta el historial de actividad de tu cuenta y gestiona las
            sesiones activas, cerrando aquellas que no reconozcas.
          </p>
          <button className="w-full px-4 py-2 bg-yellow-600 text-white text-base font-medium rounded-lg hover:bg-yellow-700 transition-colors shadow-md">
            Ver Actividad
          </button>
        </div>
      </div>
      <p className="mt-10 text-gray-600 text-sm text-center">
        Tu seguridad es nuestra máxima prioridad. Te recomendamos revisar estos
        ajustes periódicamente.
      </p>
    </div>
  );
};
