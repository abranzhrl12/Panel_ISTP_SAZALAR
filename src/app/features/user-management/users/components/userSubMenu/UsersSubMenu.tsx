// @features/user-management/users/components/userSubMenu/UsersSubMenu.tsx
import React from "react";
import { NavLink } from "react-router-dom";

export const UsersSubMenu: React.FC = () => {
  return (
    <nav className="flex flex-col mb-4">
      <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">
        Gestión de Usuarios
      </h3>
      <ul className="space-y-4">
        {" "}
        {/* Añadimos espacio vertical entre los ítems */}
        <li>
          <NavLink
            to="/home/users"
            end // <--- ¡CORRECCIÓN CLAVE! Esto asegura que solo sea activo cuando la URL es EXACTAMENTE /home/users
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            Ver Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/users/create"
            end // <--- ¡CORRECCIÓN CLAVE! Añadimos 'end' aquí también
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            Crear Usuario
          </NavLink>
        </li>
        {/* Agrega más opciones si tienes (ej. "Editar Usuario", "Roles").
            Recuerda aplicar la prop 'end' a los NavLink si quieres que se desactiven
            cuando la URL no coincide exactamente, especialmente si navegas a rutas "superiores"
            que no son sub-rutas directas.
        */}
      </ul>
    </nav>
  );
};
