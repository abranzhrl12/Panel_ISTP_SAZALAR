// @features/user-management/users/pages/UserCreatePage.tsx
// Esta página permite a los usuarios con rol de administrador crear nuevas cuentas de usuario.

import React, { useState } from "react";
import { useCreateUser } from "@features/user-management/users/hooks/useCreateUser"; // Importa el hook para crear usuarios
import {
  type CreateUserInput,
  CreateUserInputSchema,
} from "@features/user-management/users/schemas/createUser.schema"; // Importa el tipo de entrada y esquema
import { validateFormData, type FormErrors } from "@shared/utils"; // Utilidad de validación
import { ButtonBasic } from "@shared/components/atoms"; // Ruta explícita para ButtonBasic
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
// import { UserAvatar } from "@shared/components/molecules"; // Importa UserAvatar
import { FormField } from "@shared/components/molecules"; // Importa FormField

export const UserCreationPage: React.FC = () => {
  const {
    mutate: createUserMutation,
    isPending,
    isSuccess,
    error,
  } = useCreateUser();

  const navigate = useNavigate(); // Hook para la navegación

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Actualizado: Usaremos roleId como number para el estado, inicializado a un ID por defecto para 'user'.
  // Asegúrate de que estos IDs de rol (ej. 1 para user, 2 para editor, 3 para admin) coincidan con tu backend.
  const [roleId, setRoleId] = useState<number>(1); // 1 = user, 2 = editor, 3 = admin (ejemplo, ajusta a tu backend)
  const [formErrors, setFormErrors] = useState<FormErrors<CreateUserInput>>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormErrors({}); // Limpiar errores previos

    // Actualizado: Crea el objeto newUser con roleId
    const newUser: CreateUserInput = {
      email,
      password,
      roleId, // <-- Pasa roleId aquí
      isActive: true, // Asumiendo que siempre es activo al crear por admin
    };

    // Validar los datos del formulario con el esquema de Zod
    const validationErrors = validateFormData(CreateUserInputSchema, newUser);

    if (validationErrors) {
      setFormErrors(validationErrors);
      return;
    }

    // Si la validación es exitosa, llamar a la mutación para crear el usuario
    createUserMutation(newUser);
  };

  // Función para manejar el clic en el botón "Volver a Home"
  const handleGoBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Crear Nuevo Usuario
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Usando FormField para el email */}
        <FormField
          id="email"
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={formErrors.email}
        />

        {/* Usando FormField para la contraseña */}
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={formErrors.password}
        />

        <div>
          <label
            htmlFor="roleId" // Actualizado a roleId
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            id="roleId" // Actualizado a roleId
            value={roleId}
            onChange={(e) => setRoleId(parseInt(e.target.value))} // Convertir a número entero
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {/* Asegúrate de que los valores de las opciones coincidan con los IDs de rol de tu backend */}
            <option value={1}>Usuario</option>
            <option value={2}>Editor</option>
            <option value={3}>Administrador</option>
          </select>
          {formErrors.roleId && ( // Usar formErrors.roleId para validar el rol
            <p className="mt-1 text-sm text-red-600">{formErrors.roleId}</p>
          )}
        </div>

        {/* Botón de Creación de Usuario */}
        <ButtonBasic
          type="submit"
          disabled={isPending}
          text={isPending ? "Creando..." : "Crear Usuario"}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        />
      </form>

      {isSuccess && (
        <p className="mt-4 text-center text-green-600">
          Usuario creado exitosamente!
        </p>
      )}
      {error && (
        <p className="mt-4 text-center text-red-600">Error: {error.message}</p>
      )}

      {/* Nuevo botón para retroceder al home */}
      <div className="mt-6">
        {" "}
        {/* Agrega un poco de margen superior */}
        <ButtonBasic
          onClick={handleGoBackToHome}
          text="Volver a Home"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        />
      </div>
    </div>
  );
};
