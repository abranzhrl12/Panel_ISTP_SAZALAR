// @features\auth\components.tsx
import React from "react";
// Importa FormField desde su ruta explícita (asumiendo que está en FormFieldLogin/FormField.tsx)
import { FormField } from "@shared/components/molecules";
import { RememberMeCheckbox } from "@shared/components/molecules";
import { ButtonBasic } from "@shared/components/atoms"; // Ruta explícita
import type { FormErrors } from "@shared/utils"; // Usa 'type'
import type { LoginCredentials } from "@features/auth/schemas/login.schemas";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (checked: boolean) => void;
  formErrors: FormErrors<LoginCredentials>;
  isPending: boolean;
  loginError: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  formErrors,
  isPending,
  loginError,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Campo de Email */}
      <FormField
        id="email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        } // Tipo explícito
        error={formErrors.email}
      />

      {/* Campo de Contraseña */}
      <FormField
        id="password"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        } // Tipo explícito
        error={formErrors.password}
      />

      {/* Checkbox "Recordar email" */}
      <div className="flex items-center justify-between">
        <RememberMeCheckbox
          checked={rememberMe}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRememberMe(e.target.checked)
          } // Tipo explícito
          label="Recordar email"
        />
      </div>

      {/* Mensaje de error general del login (ej. credenciales incorrectas) */}
      {loginError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>Error: Credenciales incorrectas o problema con el servidor.</p>
        </div>
      )}

      {/* Botón de Iniciar Sesión */}
      <div>
        <ButtonBasic
          type="submit"
          disabled={isPending}
          text={isPending ? "Ingresando..." : "Iniciar Sesión"}
          className="w-full"
        />
      </div>
    </form>
  );
};
