// @shared/components/template/useSidebar.tsx
import { createContext, useState, useContext, type ReactNode } from "react";

// 1. Definimos el tipo de datos que nuestro contexto manejará.
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

// 2. Creamos el Contexto. Lo inicializamos como indefinido.
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// 3. Creamos el componente "Provider". Este componente envolverá nuestra aplicación
//    y proveerá el estado y las funciones a todos sus hijos.
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const openSidebar = () => setIsCollapsed(false);
  const closeSidebar = () => setIsCollapsed(true);

  // El objeto 'value' contiene todo lo que los componentes hijos podrán usar.
  const value = {
    isCollapsed,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

// 4. Creamos el Hook personalizado "useSidebar".
//    Este es el que usaremos en nuestros componentes para acceder al estado.
export const useSidebar = () => {
  const context = useContext(SidebarContext);

  // Buena práctica: si el hook se usa fuera del provider, lanzamos un error.
  if (context === undefined) {
    throw new Error("useSidebar debe ser usado dentro de un SidebarProvider");
  }

  return context;
};
