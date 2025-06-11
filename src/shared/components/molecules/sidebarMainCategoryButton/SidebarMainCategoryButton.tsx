// @shared/components/molecules
import React from "react";
import { NavLink } from "react-router-dom";
import {
  useMenuStore,
  type MainMenuCategory,
} from "@features/auth/store/menu.store"; // Importa el store y el tipo de categoría

interface SidebarMainCategoryButtonProps {
  text: string;
  category: MainMenuCategory; // La categoría que este botón representa
  to: string; // La ruta a la que navega
  // Eliminadas las props 'selectedCategory' y 'onClick' ya que el componente usa directamente el store
}

export const SidebarMainCategoryButton: React.FC<
  SidebarMainCategoryButtonProps
> = ({ text, category, to }) => {
  const { selectedCategory, setSelectedCategory } = useMenuStore();

  const handleClick = () => {
    setSelectedCategory(category);
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center w-full p-2 rounded-md text-white font-medium transition-colors duration-200
        ${
          isActive || selectedCategory === category
            ? "bg-indigo-700"
            : "hover:bg-gray-700"
        }`
      }
      onClick={handleClick}
    >
      {/* Icono (si tienes) */}
      <span className="mr-3">
        {/* Placeholder para el icono */}
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-2-2v10a1 1 0 01-1 1H9m2-2h4m-4 0h.01M7 10h.01"
          ></path>
        </svg>
      </span>
      {text}
    </NavLink>
  );
};
