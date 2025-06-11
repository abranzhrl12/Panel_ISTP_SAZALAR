// @shared/components/molecules
import React from "react";
import { useTheme } from "@providers/ThemeProvider"; // Asumo que esta ruta es correcta
import { ButtonBasic } from "@shared/components/atoms"; // Asegúrate de que esta ruta sea correcta para tu ButtonBasic

export const ThemeToogle: React.FC = () => {
  // Obtiene el tema actual y la función setTheme del hook useTheme
  // Asumo que useTheme provee setTheme para establecer el tema directamente
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col">
      {" "}
      {/* Contenedor vertical para los botones */}
      {/* Botón para activar el Tema Claro */}
      <ButtonBasic
        onClick={() => setTheme("light")} // Establece el tema a 'light'
        className={`
          flex items-center justify-center p-2  w-12 h-12 
          ${
            theme === "light"
              ? "bg-indigo-600 text-white shadow-lg" // Activo: color primario
              : "bg-white text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" // Inactivo
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          transition-all duration-300
        `}
        aria-label="Activar tema claro"
        text={"L"} // Como ButtonBasic tiene una prop `text`, para iconos puedes pasar `children` o usar la prop `text` si solo es texto.
        // Aquí usaremos `children` para los SVGs.
      >
        {/* Icono de Sol para el tema claro */}
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
      </ButtonBasic>
      {/* Botón para activar el Tema Oscuro */}
      <ButtonBasic
        onClick={() => setTheme("dark")} // Establece el tema a 'dark'
        className={`
          flex items-center justify-center p-2 rounded-full w-12 h-12 // Tamaño fijo para el botón
          ${
            theme === "dark"
              ? "bg-gray-800 text-yellow-300 shadow-lg" // Activo: color oscuro con icono amarillo
              : "bg-white text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" // Inactivo
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          transition-all duration-300
        `}
        aria-label="Activar tema oscuro"
        text={"N"}
      >
        {/* Icono de Luna para el tema oscuro */}
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
      </ButtonBasic>
    </div>
  );
};
