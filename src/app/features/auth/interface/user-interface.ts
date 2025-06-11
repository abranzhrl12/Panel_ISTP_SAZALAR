// @features\auth\interface\user-interface.ts

// Define la interfaz para el objeto de usuario, tal como se recibe del backend
// y se almacena en el store.
export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  isActive: boolean;
  avatarUrl?: string | null; // Añadido para consistencia con LoginResponseSchema
  role: {
    id: string; // O number, según el tipo de ID de rol de tu backend
    name: string;
  };
}
