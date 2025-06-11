// @shared\hooks\auth\useRoleAccessChecker.ts
import { useAuthStore } from "@features/auth/store/auth.store";

interface UseRoleAccessCheckerReturn {
  isAdmin: boolean;
  userRole: string | null;
  isLoggedIn: boolean;
}

export const useRoleAccessChecker = (): UseRoleAccessCheckerReturn => {
  // Selecciona cada valor por separado para evitar problemas con shallow y persist
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  const isLoggedIn = !!accessToken;
  const userRole = user?.role?.name || null;
  const isAdmin = isLoggedIn && userRole?.toUpperCase() === "ADMIN";

  return {
    isAdmin,
    userRole,
    isLoggedIn,
  };
};
