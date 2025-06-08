// src/features/auth/LoginPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@features/auth/hooks/useLogin";
import { useAuthStore } from "@features/auth/store/auth.store";

// Importa el servicio de localStorage
import { localStorageService } from "@shared/services/storage/localStorage.service"; // Nueva importación

// Importa useRememberEmail y pásale el servicio
import { useRememberEmail } from "@app/hooks/useRememberEmail"; // Asegúrate de la ruta a tu hook compartido

// Importa LoginCredentialsSchema y LoginCredentials desde login.schemas.ts
import {
  LoginCredentialsSchema,
  type LoginCredentials,
} from "@features/auth/services/login.schemas"; // RUTA CORREGIDA

// Importación según tu instrucción: @shared/utils
import { validateFormData, type FormErrors } from "@shared/utils/FormErrors"; // Ruta explícita

// Importación según tu instrucción: @shared/components/organisms
import { LoginForm } from "@shared/components/organisms"; // Ruta explícita

export const LoginPage = () => {
  const { mutate: performLogin, isPending, error } = useLogin();
  // Pasa localStorageService al hook useRememberEmail
  const { email, setEmail, rememberMe, setRememberMe, handleRememberEmail } =
    useRememberEmail(localStorageService); // <-- INYECCIÓN DE DEPENDENCIA

  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors<LoginCredentials>>(
    {}
  );

  // Lógica para redirigir si el usuario ya está logeado
  useEffect(() => {
    if (accessToken) {
      navigate("/home", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors({}); // Limpia errores anteriores al intentar un nuevo envío

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
        {/* Renderiza el LoginForm y pásale todas las props necesarias */}
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
        {/* Eliminado: Enlace para ir a la página de registro */}
        {/* <p className="mt-6 text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Registrarse
          </Link>
        </p> */}
      </div>
    </div>
  );
};
