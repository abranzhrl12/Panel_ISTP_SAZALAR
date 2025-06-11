// @shared\services\storage\localStorage.service.ts
import type { IStorage } from "@shared/services/storage/storage.interface";

export const localStorageService: IStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(
        `Error al obtener de localStorage con clave "${key}":`,
        error
      );
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(
        `Error al guardar en localStorage con clave "${key}":`,
        error
      );
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error al eliminar de localStorage con clave "${key}":`,
        error
      );
    }
  },
};
