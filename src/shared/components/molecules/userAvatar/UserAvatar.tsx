// src/shared/components/molecules/UserAvatar/UserAvatar.tsx
import React from "react";

interface UserAvatarProps {
  src?: string | null; // URL de la imagen del avatar, puede ser nulo o indefinido
  alt: string; // Texto alternativo para la imagen (ej. nombre del usuario)
  fallbackText?: string; // Texto a mostrar si no hay imagen (ej. iniciales)
  size?: "small" | "medium" | "large"; // Tamaño predefinido del avatar
  className?: string; // Clases adicionales de Tailwind para personalizar
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  fallbackText,
  size = "medium", // Valor por defecto
  className,
}) => {
  // Clases de tamaño base
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-12 h-12 text-base",
    large: "w-16 h-16 text-lg",
  };

  const currentSizeClass = sizeClasses[size];

  return (
    <div
      className={`
        flex items-center justify-center rounded-full overflow-hidden flex-shrink-0
        ${currentSizeClass}
        ${
          src
            ? ""
            : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
        }
        ${className || ""}
      `}
      aria-label={alt} // Accesibilidad
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover" // Asegura que la imagen cubra el espacio
          onError={(e) => {
            // Opcional: manejar errores de carga de imagen, por ejemplo, mostrando el fallback
            (e.target as HTMLImageElement).style.display = "none"; // Oculta la imagen rota
            // Aquí podrías querer mostrar el fallback dinámicamente si la carga falla
          }}
        />
      ) : (
        <span className="font-semibold uppercase select-none">
          {fallbackText || alt.charAt(0).toUpperCase()}{" "}
          {/* Muestra iniciales o la primera letra */}
        </span>
      )}
    </div>
  );
};
