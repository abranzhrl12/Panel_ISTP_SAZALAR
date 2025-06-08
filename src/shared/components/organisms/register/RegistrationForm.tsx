// src/features/auth/components/organisms/Register/RegistrationForm.tsx
// Este es un ORGANISMO: Combina moléculas y átomos para formar una sección compleja de la interfaz.
import React from "react";

// Importa MOLECULA: FormField, que combina un átomo InputText y un átomo FormErrorText.
import { FormField } from "@shared/components/molecules";
// Importa ATOMO: ButtonBasic, un componente UI fundamental.
import { ButtonBasic } from "@shared/components/atoms";

// Importa tipos necesarios para la validación y las credenciales.
import type { FormErrors } from "@shared/utils/FormErrors";
import type { RegisterCredentials } from "@features/auth/services/register.schemas";

interface RegistrationFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  // Si usas confirmPassword en el esquema y en tu UI, descomenta esto:
  // confirmPassword: string;
  // setConfirmPassword: (confirmPassword: string) => void;
  formErrors: FormErrors<RegisterCredentials>;
  isPending: boolean; // Indica si la petición está en curso (ej. registrando)
  registerError: boolean; // Indica si hubo un error en el registro (ej. credenciales inválidas, servidor)
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // Función para manejar el envío del formulario
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  // confirmPassword, // Descomentar si se usa
  // setConfirmPassword, // Descomentar si se usa
  formErrors,
  isPending,
  registerError,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Campo de Email - Usa la MOLECULA FormField */}
      <FormField
        id="register-email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        error={formErrors.email}
      />

      {/* Campo de Contraseña - Usa la MOLECULA FormField */}
      <FormField
        id="register-password"
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        error={formErrors.password}
      />

      {/* Campo de Confirmar Contraseña (Descomentar si se usa) - Usa la MOLECULA FormField */}
      {/*
      <FormField
        id="register-confirm-password"
        label="Confirmar Contraseña"
        type="password"
        autoComplete="new-password"
        required
        value={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        error={formErrors.confirmPassword}
      />
      */}

      {/* Mensaje de error general del registro (si registerError es true) */}
      {registerError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>
            Error: No se pudo completar el registro. Por favor, inténtalo de
            nuevo.
          </p>
        </div>
      )}

      {/* Botón de Registrarse - Usa el ATOMO ButtonBasic */}
      <div>
        <ButtonBasic
          type="submit"
          disabled={isPending} // Deshabilita el botón mientras la petición está en curso
          text={isPending ? "Registrando..." : "Registrarse"} // Cambia el texto durante la carga
          className="w-full" // Ocupa todo el ancho disponible
        />
      </div>
    </form>
  );
};
