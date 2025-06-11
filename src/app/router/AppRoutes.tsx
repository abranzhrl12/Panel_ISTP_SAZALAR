// @app/router/AppRoutes.tsx
import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate, Outlet } from "react-router-dom";

import { LoginPage } from "../features/auth/LoginPage";
import { Home } from "../features/home/home"; // Mantén la importación de Home si lo usarás como sub-ruta
import { ProtectedRoute } from "./ProtectedRoute";

import { useAuthStore } from "@features/auth/store/auth.store";
import { useInactivityDetector } from "@shared/hooks/inactivity/useInactivityDetector";
import { UserCreationPage } from "../features/user-management/users/pages/UserCreatePage";
import { UserListPage } from "../features/user-management/users/pages/UserListPage";
import { useRoleAccessChecker } from "../../shared/hooks/auth/useRoleAccessChecker";

import { DashboardLayout } from "@shared/components/layouts/DashboardLayout";
import {
  DashboardReportsPage,
  DashboardSettingsPage,
} from "@features/dashboard";
import { PrivacySecuritySettingsPage } from "@features/dashboard/pages/papuperos/PrivacySecuritySettingsPage";
import { AnalyticsDashboardPage } from "@features/dashboard/pages/papuperos/AnalyticsDashboardPage";

const AdminRouteGuard: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAdmin, isLoggedIn } = useRoleAccessChecker();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log(
        "AdminRouteGuard: User not logged in, redirecting to /login."
      );
      navigate("/login", { replace: true });
    } else if (!isAdmin) {
      console.warn(
        "AdminRouteGuard: Access denied, user is not an administrator. Redirecting to /home/dashboard."
      );
      navigate("/home/dashboard", { replace: true }); // Redirect to /home/dashboard if not admin
    }
  }, [isAdmin, isLoggedIn, navigate]);

  return isAdmin ? <>{children || <Outlet />}</> : null;
};

export const AppRoutes: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  console.log(
    "AppRoutes: Current accessToken:",
    accessToken ? "Existing" : "Null"
  );

  useInactivityDetector(!!accessToken);

  useEffect(() => {
    console.log(
      "AppRoutes useEffect: accessToken changed to:",
      accessToken ? "Existing" : "Null"
    );

    if (!accessToken && window.location.pathname !== "/login") {
      console.log(
        "AppRoutes useEffect: No accessToken, redirecting to /login."
      );
    }
  }, [accessToken]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              {/* DashboardLayout renders here and will use <Outlet /> for its children */}
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default route for /home now redirects to /home/dashboard */}
          <Route index element={<Navigate to="/home/dashboard" replace />} />
          <Route path="reports" element={<DashboardReportsPage />} />
          <Route path="settings" element={<DashboardSettingsPage />} />

          {/* Route for the "Home" or "Dashboard Overview" page */}
          <Route path="dashboard" element={<Home />} />

          {/* User management routes */}
          {/* AdminRouteGuard is applied to the "users" sub-routes */}
          <Route path="users/*" element={<AdminRouteGuard />}>
            {/* These routes render inside AdminRouteGuard's <Outlet /> */}
            <Route path="create" element={<UserCreationPage />} />
            <Route index element={<UserListPage />} />
            {/* Fallback for /home/users/* */}
            <Route
              path="*"
              element={<Navigate to="/home/dashboard" replace />}
            />
          </Route>

          {/* NEW STRUCTURE: Routes for the "Papuperos" page and its sub-pages */}
          <Route path="papuperos/*">
            {/* Main route for /home/papuperos (you can use HomePage or create a PapuperosOverviewPage) */}
            <Route index element={<Home />} />{" "}
            {/* Using Home as the main Papuperos page */}
            <Route path="analitycs" element={<AnalyticsDashboardPage />} />
            <Route path="privacity" element={<PrivacySecuritySettingsPage />} />
            <Route path="usersetting" element={<DashboardSettingsPage />} />
            {/* Fallback for any undefined sub-route within /home/papuperos/* */}
            <Route
              path="*"
              element={<Navigate to="/home/papuperos" replace />}
            />
          </Route>
          {/* Handler for routes not found within /home/* */}
          <Route path="*" element={<Navigate to="/home/dashboard" replace />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </>
  );
};
