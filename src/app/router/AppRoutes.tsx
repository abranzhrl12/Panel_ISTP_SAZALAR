import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";
import { Home } from "../features/home/home";
import { ProtectedRoute } from "./ProtectedRoute";
import { useInactivityDetector } from "@shared/hooks/inactivity/useInactivityDetector";
export const AppRoutes: React.FC = () => {
  useInactivityDetector(false);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/home/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<Home />} />
                <>
                </>
                ) : (
                <Route
                  path="users/*"
                  element={<Navigate to="/home" replace />}
                />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </>
  );
};
