// @features\auth\components.tsx
// Este es un COMPONENTE/ORGANISMO: Agrupa las moléculas de ítems de submenú para la gestión de usuarios.
import React from "react";
// ¡CORRECCIÓN! Importamos la molécula desde su nueva ubicación compartida.
import { SubmenuNavLinkItem } from "@shared/components/molecules";

export const UsersSubMenu: React.FC = () => {
  return (
    <nav className="flex flex-col mb-4">
      <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">
        Gestión de Usuarios
      </h3>
      <ul className="space-y-4">
        {" "}
        {/* Usando la molécula SubmenuNavLinkItem para cada enlace del submenú */}
        <SubmenuNavLinkItem to="/home/users" text="Ver Usuarios" end={true} />
        <SubmenuNavLinkItem
          to="/home/users/create"
          text="Crear Usuario"
          end={true}
        />
        {/* Agrega más SubmenuNavLinkItem aquí si tienes (ej. "Editar Usuario", "Roles") */}
      </ul>
    </nav>
  );
};
