// @features/auth/LoginPage.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "@features/auth/hooks/useLogin";
import { useAuthStore } from "@features/auth/store/auth.store";
import { localStorageService } from "@shared/services/storage/localStorage.service";
import { useRememberEmail } from "@app/hooks/useRememberEmail"; // Asegúrate de que esta ruta sea correcta
import {
  LoginCredentialsSchema,
  type LoginCredentials,
} from "@features/auth/schemas/login.schemas";
import { validateFormData, type FormErrors } from "@shared/utils"; // Asegúrate de que esta ruta sea correcta
import { LoginForm } from "./components/LoginForm/loginForm";

export const LoginPage = () => {
  const { mutate: performLogin, isPending, error } = useLogin();
  const { email, setEmail, rememberMe, setRememberMe, handleRememberEmail } =
    useRememberEmail(localStorageService);
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors<LoginCredentials>>(
    {}
  );
  const [generalLoginError, setGeneralLoginError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (error) {
      setGeneralLoginError(
        error.message || "Credenciales inválidas. Inténtalo de nuevo."
      );
    } else {
      setGeneralLoginError(null);
    }
  }, [error]);

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Cargando sesión...
        </h2>
      </div>
    );
  }

  if (accessToken) {
    return <Navigate to="/home" replace />;
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors({});
    setGeneralLoginError(null);
    const credentials: LoginCredentials = { email, password };
    const validationErrors = validateFormData(
      LoginCredentialsSchema,
      credentials
    );

    if (!validationErrors) {
      handleRememberEmail(email, rememberMe);
      performLogin(credentials);
    } else {
      setFormErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        {generalLoginError && (
          <p className="text-red-500 text-center mb-4">{generalLoginError}</p>
        )}
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          formErrors={formErrors}
          isPending={isPending}
          loginError={!!error}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
