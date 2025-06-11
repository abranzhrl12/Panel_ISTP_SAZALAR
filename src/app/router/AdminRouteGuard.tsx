// @app/router/AdminRouteGuard.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@shared/hooks/auth/useAuth"; // Asegúrate de que esta ruta sea correcta y useAuth se exporte correctamente

interface AdminRouteGuardProps {
  children?: React.ReactNode;
}

// Asegúrate de que este componente se exporte como 'export const'
export const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({
  children,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Si aún está cargando la autenticación, muestra un mensaje de carga.
  if (isLoading) {
    return <div>Cargando autenticación...</div>;
  }

  // Si no está autenticado, redirige al login.
  if (!isAuthenticated) {
    console.warn("Acceso denegado: Usuario no autenticado.");
    return <Navigate to="/login" replace />;
  }

  // Corregido: Acceso a user.role.id y comparación.
  // Asegúrate de que el ID del rol de administrador en tu backend sea "1" (como string).
  // Si el rol es un objeto { id: "1", name: "admin" } y necesitas comprobar por nombre,
  // entonces la lógica sería: user.role?.name !== "admin" (o .toUpperCase() === "ADMIN").
  if (!user || user.role?.id !== "1") {
    console.warn(
      "Acceso denegado: Usuario no es administrador o no tiene el rol correcto."
    );
    return <Navigate to="/home" replace />;
  }

  // Si es administrador, renderiza las rutas hijas.
  return children ? <>{children}</> : <Outlet />;
};
