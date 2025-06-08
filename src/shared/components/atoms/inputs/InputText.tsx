// src/shared/components/atoms/Inputs/InputText.tsx
import React from "react";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean; // Propiedad para indicar si hay un error
}

export const InputText: React.FC<InputTextProps> = ({
  error,
  className,
  ...props
}) => {
  return (
    <input
      className={`
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
        ${
          error
            ? "ring-red-500 focus:ring-red-500"
            : "ring-gray-300 focus:ring-indigo-600"
        }
        placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
        ${className || ""}
      `}
      {...props}
    />
  );
};
