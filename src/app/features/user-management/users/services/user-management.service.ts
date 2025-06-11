// @features/user-management/users/services/user-management.service.ts
// Este servicio maneja las operaciones CRUD para la gestión de usuarios (por administradores).

import { requestWithAuth } from "@shared/api/graphql-client"; // Importa la función para peticiones autenticadas
import { ClientError } from "graphql-request"; // Importa ClientError para manejo de errores de GraphQL
import { z } from "zod"; // Importa Zod para manejar ZodError

// Importa la query para obtener usuarios y sus tipos
import {
  GetUsersResponseSchema,
  type GetUsersResponse,
} from "@features/user-management/users/schemas/user-management.schemas";

// NUEVAS IMPORTACIONES para la creación de usuarios
import {
  CreateUserInputSchema,
  CreatedUserResponseSchema,
  type CreateUserInput,
  type CreatedUserResponse,
} from "@features/user-management/users/schemas/createUser.schema"; // Importa los esquemas de creación de usuario

// Importa las QUERIES y MUTACIONES GraphQL
import {
  GET_ALL_USERS_QUERY,
  CREATE_USER_MUTATION, // Importa la mutación de creación de usuario
} from "@features/user-management/users/pages/user-management.gql"; // Asume que este archivo contiene ambas

// ====================================================================
// Función de Servicio para Crear Usuario (por Administrador)
// ====================================================================
/**
 * Crea un nuevo usuario en el sistema.
 * Valida la entrada y la respuesta con esquemas Zod.
 * Requiere el permiso `users.create` en el backend.
 *
 * @param input Los datos del nuevo usuario (email, password, roleId, isActive).
 * @returns Una Promesa que resuelve con el objeto User creado.
 */
export const createUser = async (
  input: CreateUserInput
): Promise<CreatedUserResponse> => {
  try {
    // 1. Valida los datos de entrada con el esquema Zod.
    CreateUserInputSchema.parse(input);

    // 2. Prepara las variables para la mutación GraphQL.
    // El nombre de la variable de operación ($createUserInput) debe coincidir con la mutación.
    const variables = { createUserInput: input };

    // 3. Envía la petición GraphQL al servidor utilizando requestWithAuth.
    const response = await requestWithAuth(CREATE_USER_MUTATION, variables);

    // --- LÍNEAS DE DIAGNÓSTICO CLAVE ---
    console.log(
      "Respuesta RAW de GraphQL (createUser):",
      JSON.stringify(response, null, 2)
    );

    // 4. Valida la respuesta completa del servidor con CreatedUserResponseSchema.
    const validatedResponse = CreatedUserResponseSchema.parse(response);

    console.log(
      "Datos de usuario creado validados:",
      validatedResponse.createUser
    );
    return validatedResponse.createUser; // Retorna el objeto User creado
  } catch (error) {
    console.error("Error en el servicio createUser:", error);

    if (error instanceof z.ZodError) {
      console.error(
        "Detalles del Error de Validación Zod (createUser):",
        JSON.stringify(error.issues, null, 2)
      );
      throw new Error(
        `Fallo de validación de datos de creación de usuario: ${JSON.stringify(
          error.issues
        )}`
      );
    } else if (error instanceof ClientError) {
      console.error("Error de Cliente GraphQL (createUser):", error.message);
      console.error(
        "Respuesta de Error de Cliente GraphQL (createUser):",
        JSON.stringify(error.response, null, 2)
      );
      if (error.response?.errors && error.response.errors.length > 0) {
        throw new Error(
          `Error de GraphQL al crear usuario: ${error.response.errors[0].message}`
        );
      }
      throw new Error(
        `Error de red o del servidor al crear usuario: ${
          error.message
        } (Estado: ${error.response?.status || "desconocido"})`
      );
    } else {
      throw new Error(
        `Ocurrió un error inesperado al crear usuario: ${
          (error as Error).message
        }`
      );
    }
  }
};

// ====================================================================
// Función de Servicio para Obtener Todos los Usuarios
// ====================================================================
/**
 * Obtiene una lista de todos los usuarios del sistema.
 * Valida la respuesta con esquemas Zod.
 * Requiere el permiso `users.read_all` en el backend.
 *
 * @returns Una Promesa que resuelve con un array de objetos User.
 */
export const getAllUsers = async (): Promise<GetUsersResponse> => {
  console.log("Intentando obtener todos los usuarios...");
  try {
    const response = await requestWithAuth(GET_ALL_USERS_QUERY);

    // LÍNEAS DE DIAGNÓSTICO CLAVE
    console.log(
      "Tipo de respuesta RAW de GraphQL (getAllUsers):",
      typeof response
    );
    console.log(
      "Respuesta RAW de GraphQL (getAllUsers):",
      JSON.stringify(response, null, 2)
    );

    if (typeof response === "string") {
      const truncatedResponse = response.substring(0, 500);
      console.error(
        "¡ERROR INESPERADO! La respuesta RAW de GraphQL es una cadena de texto. Contenido recibido:",
        truncatedResponse
      );
      throw new Error(
        `Respuesta de la API inesperada para /users: Recibido texto, se esperaba JSON. Contenido: ${truncatedResponse}...`
      );
    }

    const validatedResponse = GetUsersResponseSchema.parse(response);

    console.log("Datos de usuarios validados:", validatedResponse.users);
    return validatedResponse.users;
  } catch (error) {
    console.error("Error en el servicio getAllUsers:", error);

    if (error instanceof z.ZodError) {
      console.error(
        "Detalles del Error de Validación Zod:",
        JSON.stringify(error.issues, null, 2)
      );
      throw new Error(
        `Fallo de validación de datos de usuarios: ${JSON.stringify(
          error.issues
        )}`
      );
    } else if (error instanceof ClientError) {
      console.error("Error de Cliente GraphQL (getAllUsers):", error.message);
      console.error(
        "Respuesta de Error de Cliente GraphQL:",
        JSON.stringify(error.response, null, 2)
      );
      if (error.response?.errors && error.response.errors.length > 0) {
        throw new Error(
          `Error de GraphQL: ${error.response.errors[0].message}`
        );
      }
      throw new Error(
        `Error de red o del servidor al obtener usuarios: ${
          error.message
        } (Estado: ${error.response?.status || "desconocido"})`
      );
    } else {
      throw new Error(
        `Ocurrió un error inesperado al obtener usuarios: ${
          (error as Error).message
        }`
      );
    }
  }
};
