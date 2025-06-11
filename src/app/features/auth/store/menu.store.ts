// @features\auth\store\menu.store.ts
import { create } from "zustand";

// Define MainMenuCategory incluyendo todas las categorías posibles
export type MainMenuCategory =
  | "dashboard"
  | "users"
  | "create-user" // Añade esta
  | "owners" // Añade esta
  | "create-owner" // Añade esta
  | "papus"
  | "none"; // 'none' o un valor por defecto si no hay nada seleccionado

interface MenuState {
  selectedCategory: MainMenuCategory;
  setSelectedCategory: (category: MainMenuCategory) => void;
  // Puedes añadir más estados relacionados con el menú aquí si es necesario
}

export const useMenuStore = create<MenuState>((set) => ({
  selectedCategory: "none", // Estado inicial
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
