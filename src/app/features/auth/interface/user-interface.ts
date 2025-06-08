// src/features/auth/interfaces/user.interface.ts
// Define la interfaz para el objeto de usuario, tal como se recibe del backend
// y se almacena en el store.

export interface User {
  id: string;
  email: string;
  isActive: boolean;
  avatarUrl: string | null;
  // Actualizado: El rol ahora es un objeto que incluye id, name, description y permissions.
  role: {
    id: string; // O number, según el tipo de ID de rol de tu backend
    name: string;
    description?: string; // <-- ¡AÑADIDO!
    permissions: Array<{
      // <-- ¡AÑADIDO! Array de permisos
      id: string; // O number
      name: string;
      description?: string;
    }>;
  };
}
