// @features/user-management/users/components/userSubMenu/PapuperosSubMenu.tsx
import React from "react";
import { NavLink } from "react-router-dom";

export const PapuperosSubMenu: React.FC = () => {
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
            to="/home/papuperos/analitycs"
            end // <--- ¡CORRECCIÓN CLAVE! Esto asegura que solo sea activo cuando la URL es EXACTAMENTE /home/users
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            OverviewXD
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/papuperos/privacity"
            end // <--- ¡CORRECCIÓN CLAVE! Añadimos 'end' aquí también
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            Rerports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/papuperos/usersetting"
            end // <--- ¡CORRECCIÓN CLAVE! Añadimos 'end' aquí también
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-800"
              }`
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
