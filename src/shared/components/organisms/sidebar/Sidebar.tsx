// src/shared/components/organisms/Sidebar/Sidebar.tsx
import { useTheme } from "@providers/ThemeProvider";
import { ButtonBasic } from "@shared/components/atoms";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@features/auth/store/auth.store";
import { BrandLogo } from "@shared/components/molecules";
import { DashboardSection } from "@shared/components/molecules";
import { NavList } from "@shared/components/molecules";
import { ThemeToogle } from "@shared/components/molecules";
import { UserAvatar } from "@shared/components/molecules";
// import  './_sidebar.css';
export const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  // Función para manejar el cierre de sesión del usuario
  const handleLogout = () => {
    logout("manual");
    navigate("/login", { replace: true });
  };

  const { theme } = useTheme();

  // Datos para la lista de navegación
  const navItems = [{ href: "#", text: "Home" }];

  // Datos de usuario para el avatar y el mensaje de bienvenida
  const currentUserName = user?.email || "Invitado";
  const currentUserAvatarUrl = user?.avatarUrl || null;
  const currentUserInitials = currentUserName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isAdmin = user?.role?.name === "ADMIN";

  const handleCreateUserClick = () => {
    navigate("/home/users/create");
  };

  const handleViewUsersClick = () => {
    navigate("/home/users"); // Ruta a la página de lista de usuarios
  };

  return (
    <div
      className={`sidebar md:sidebar2
         p-6 shadow-xl
       border-r border-gray-200 dark:border-gray-700
        transition-colors duration-300 ease-in-out
        ${
          theme === "dark"
            ? "bg-gray-950 text-gray-100"
            : "bg-white text-gray-800"
        }
         sm:   
      `}
    >
      {/* Sección del Logo de la Marca (Molécula) */}
      <BrandLogo />

      {/* Sección de Avatar del usuario (ahora usa datos del store) */}
      {/* <div className="flex flex-col items-center mb-8 mt-4">
        <UserAvatar
          src={currentUserAvatarUrl}
          alt={currentUserName}
          fallbackText={currentUserInitials}
          size="large"
        />
      </div> */}
      <div className="p-2">
        {/* Sección Principal de Navegación */}
        <nav className="flex flex-col flex-grow space-y-4 justify-center items-center">
          <DashboardSection
            welcomeMessage={`¡Bienvenido, ${currentUserName.split("@")[0]}!`}
          />

          <NavList items={navItems} />

          {/* Botón para Crear Usuario - Solo visible si el usuario es administrador */}
          {isAdmin && (
            <>
              {" "}
              {/* Usamos un fragmento para agrupar los botones de administración */}
              <li className="w-full">
                <ButtonBasic
                  onClick={handleCreateUserClick}
                  text="Crear Usuario"
                  className={`
                  w-full block p-3 rounded-md text-lg font-medium text-center
                  ${
                    theme === "dark"
                      ? "text-indigo-300 hover:bg-indigo-700"
                      : "text-indigo-600 hover:bg-indigo-100"
                  }
                  transition-colors duration-200
                `}
                />
              </li>
              {/* NUEVO: Botón para Ver Usuarios - Solo visible si el usuario es administrador */}
              <li className="w-full">
                <ButtonBasic
                  onClick={handleViewUsersClick}
                  text="Ver Usuarios"
                  className={`
                  w-full block p-3 rounded-md text-lg font-medium text-center mt-2
                  ${
                    theme === "dark"
                      ? "text-blue-300 hover:bg-blue-700" // Diferente color para distinguirlo
                      : "text-blue-600 hover:bg-blue-100"
                  }
                  transition-colors duration-200
                `}
                />
              </li>
            </>
          )}
        </nav>
      </div>
      {/* Botón de Cerrar Sesión y sección de Alternador de Tema */}
      <div className="mt-auto pt-6">
        <div className="mt-4 flex justify-center">
          <ThemeToogle />
        </div>
        <ButtonBasic
          onClick={handleLogout}
          text="Cerrar Sesión"
          className="w-full"
        />
      </div>
      <div className="flex items-center align-center bg-blue-600 mt-4">
       <UserAvatar className="m-auto mt-8"
          src={currentUserAvatarUrl}
          alt={currentUserName}
          fallbackText={currentUserInitials}
          size="large"
        />
      </div>
    </div>
  );
};
