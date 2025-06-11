// @features/user-management/users/components/UserListItem/UserListItem.tsx
import React from "react";
import { type User } from "@features/auth/interface/user-interface";
import { ButtonBasic } from "@shared/components/atoms/buttons"; // Asegúrate de la ruta correcta

interface UserListItemProps {
  user: User;
  onEdit?: (userId: string) => void; // Opcional: para manejar la edición de un usuario
  onDelete?: (userId: string) => void; // Opcional: para manejar la eliminación de un usuario
}

export const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <span className="font-medium">{user.id}</span>
      </td>
      <td className="py-3 px-6 text-left">{user.email}</td>
      <td className="py-3 px-6 text-left">
        {user.role?.name || "N/A"}{" "}
        {/* Muestra el nombre del rol, con fallback */}
      </td>
      <td className="py-3 px-6 text-center">
        {user.isActive ? (
          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
            Activo
          </span>
        ) : (
          <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
            Inactivo
          </span>
        )}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center space-x-2">
          {onEdit && (
            <ButtonBasic
              onClick={() => onEdit(user.id)}
              text="Editar"
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            />
          )}
          {onDelete && (
            <ButtonBasic
              onClick={() => onDelete(user.id)}
              text="Eliminar"
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            />
          )}
        </div>
      </td>
    </tr>
  );
};
