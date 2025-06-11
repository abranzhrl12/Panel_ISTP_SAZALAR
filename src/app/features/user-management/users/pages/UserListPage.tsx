// @features\user-management\users\pages\UserListPage.tsx
import React from "react";
import { ButtonBasic } from "@shared/components/atoms";
import { useNavigate } from "react-router-dom";
import { useFetchUsers } from "@features/user-management/users/hooks/useFetchUsers"; // Importa el hook para obtener usuarios
// Importa la interfaz User, asegurándote de que la ruta sea correcta.
// La ruta que has estado usando es: "@features/auth/interface/user-interface".
// La ruta más consistente con tus otros archivos sería: "../../auth/interfaces/user.interface"
import { type User } from "@features/auth/interface/user-interface"; // Ruta corregida para consistencia

export const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error } = useFetchUsers(); // Obtiene datos, estado de carga y error

  const handleGoBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Lista de Usuarios
      </h2>

      {isLoading && (
        <div className="text-center text-blue-500 mb-4">
          Cargando usuarios...
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mb-4">
          <p>
            Error al cargar usuarios: {error?.message || "Error desconocido"}.
            Asegúrate de estar logeado y de que tu token sea válido.
          </p>
        </div>
      )}

      {!isLoading && !isError && (!users || users.length === 0) && (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md mb-4">
          <p>No se encontraron usuarios.</p>
        </div>
      )}

      {users && users.length > 0 && (
        <div className="overflow-x-auto mb-6 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rol
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                >
                  Activo
                </th>
                {/* Agrega más encabezados si necesitas mostrar otros campos */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user: User) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.role.name}{" "}
                    {/* <-- CORRECCIÓN: Accede a user.role.name */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.isActive ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Sí
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        No
                      </span>
                    )}
                  </td>
                  {/* Agrega más celdas con datos de usuario aquí */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <ButtonBasic
          onClick={handleGoBackToHome}
          text="Volver a Home"
          className="w-full sm:w-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        />
      </div>
    </div>
  );
};
