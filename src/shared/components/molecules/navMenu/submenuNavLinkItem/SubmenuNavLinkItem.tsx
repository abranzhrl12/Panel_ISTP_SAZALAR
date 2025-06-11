// @shared/components/molecules
// Esta es una MOLÉCULA COMPARTIDA: Combina el átomo NavLink de React Router con estilos genéricos para ítems de submenú.
import React from "react";
import { NavLink } from "react-router-dom"; // El átomo NavLink

interface SubmenuNavLinkItemProps {
  to: string; // La ruta a la que navega el enlace
  text: string; // El texto visible del enlace
  end?: boolean; // Opcional: Prop para NavLink que indica si la ruta debe coincidir exactamente
}

export const SubmenuNavLinkItem: React.FC<SubmenuNavLinkItemProps> = ({
  to,
  text,
  end = false, // Por defecto, no requiere coincidencia exacta a menos que se especifique
}) => {
  return (
    <li>
      <NavLink
        to={to}
        end={end} // Usa la prop 'end' para un control preciso de la activación
        className={({ isActive }) =>
          `block py-2 px-4 rounded-md transition-colors duration-200 ${
            isActive
              ? "bg-blue-600 text-white" // Estilo cuando está activo
              : "hover:bg-gray-200 text-gray-800" // Estilo cuando no está activo o al pasar el ratón
          }`
        }
      >
        {text}
      </NavLink>
    </li>
  );
};
