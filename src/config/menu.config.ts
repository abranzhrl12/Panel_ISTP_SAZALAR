// @config/menu.config.ts

import type { IconType } from "react-icons"; // Si usas react-icons
// Si usas react-icons
import {
  FaTachometerAlt,
  FaUsers,
  FaPlus,
  FaAddressBook,
} from "react-icons/fa"; // Ejemplos de iconos

// Define una interfaz para un ítem de menú
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: IconType; // Tipo para los iconos (ej. de react-icons)
  roles?: string[]; // Roles permitidos para ver este ítem (ej. 'ADMIN', 'USER')
  children?: MenuItem[]; // Para submenús
  isSubmenu?: boolean; // Para identificar si es un ítem de submenú
  category?: string; // Para usar con SidebarMainCategoryButton si es necesario
}

// Define la configuración de tu menú principal
export const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/home/dashboard",
    icon: FaTachometerAlt,
    roles: ["ADMIN", "USER"], // Visible para Admin y User
    category: "dashboard", // Para SidebarMainCategoryButton
  },
  {
    id: "users",
    label: "Usuarios",
    path: "/home/users",
    icon: FaUsers,
    roles: ["ADMIN"], // Visible solo para Admin
    category: "users", // Para SidebarMainCategoryButton
    children: [
      // Submenú de Usuarios
      {
        id: "view-users",
        label: "Ver Usuarios",
        path: "/home/users",
        isSubmenu: true, // Marca como submenú
        roles: ["ADMIN"],
      },
      {
        id: "create-user",
        label: "Crear Usuario",
        path: "/home/users/create",
        isSubmenu: true,
        roles: ["ADMIN"],
      },
    ],
  },
  {
    id: "owners", // Nuevo elemento de menú para Owners
    label: "Propietarios",
    path: "/home/owners", // Asume una ruta para la lista de propietarios
    icon: FaAddressBook, // Un ícono para propietarios
    roles: ["ADMIN"], // O los roles que deban verlo
    category: "owners", // Para SidebarMainCategoryButton
    children: [
      {
        id: "view-owners",
        label: "Ver Propietarios",
        path: "/home/owners",
        isSubmenu: true,
        roles: ["ADMIN"],
      },
      {
        id: "create-owner",
        label: "Crear Propietario",
        path: "/home/owners/create",
        isSubmenu: true,
        roles: ["ADMIN"],
      },
    ],
  },
  {
    id: "papus",
    label: "Papus",
    path: "/home/papuperos",
    icon: FaPlus, // Solo un ejemplo
    roles: ["ADMIN", "EDITOR"], // Ejemplo de otro rol
    category: "papus",
  },
  // ...otros ítems de menú
];
