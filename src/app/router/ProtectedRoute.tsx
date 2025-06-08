// src/app/router/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@features/auth/store/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Obtenemos el estado de autenticación de tu store de Zustand
  const { accessToken } = useAuthStore(); // Usamos 'accessToken' para determinar si el usuario está autenticado

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  // Si el usuario está autenticado (existe un accessToken), renderiza los componentes hijos
  return <>{children}</>;
};
