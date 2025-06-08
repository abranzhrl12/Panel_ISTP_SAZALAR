// src/shared/components/molecules/themetoogle/ThemeToogle.tsx
import React from "react";
import { useTheme } from "@providers/ThemeProvider"; // Asumo que esta ruta es correcta

export const ThemeToogle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Se han eliminado las variables `enabled` y `setEnabled` ya que no se estaban utilizando,
  // corrigiendo los warnings TS6133.

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          theme === "dark"
            ? "bg-gray-700 text-yellow-300 focus:ring-yellow-500"
            : "bg-indigo-500 text-white focus:ring-indigo-700"
        }
        transition-all duration-300 flex items-center justify-center
      `}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        // Icono para tema oscuro (sol/luz)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h1m-16 0H3m15.325-7.775l-.707-.707M6.707 19.325l-.707-.707m10.61-4.95l.707-.707M7.389 6.707l-.707-.707"
          />
        </svg>
      ) : (
        // Icono para tema claro (luna/noche)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};
