// @shared/components/organisms/Sidebar/Sidebar.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@features/auth/store/auth.store";
import { useTheme } from "@providers/ThemeProvider";

// Importa las MOLÉCULAS y ÁTOMOS necesarios
import { UserDisplay } from "@shared/components/molecules";
import { SidebarMainCategoryButton } from "@shared/components/molecules";
import { BrandLogo } from "@shared/components/molecules";
import { ThemeToogle } from "@shared/components/molecules/themetoogle/ThemeToogle";
import { useMenuStore } from "@features/auth/store/menu.store"; // Import useMenuStore and MainMenuCategory

export const Sidebar: React.FC = () => {
  useMenuStore();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { theme } = useTheme();

  // State to control the visibility of the user dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Ref for the dropdown container to detect clicks outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // User data for UserDisplay
  const currentUserName = user?.email || "Invitado";
  const currentUserAvatarUrl = user?.avatarUrl || null;
  const currentUserInitials = currentUserName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Function to handle logout
  const handleLogout = () => {
    logout("manual");
    navigate("/login", { replace: true });
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <aside
      className={`w-20 flex flex-col p-4 border-r
        ${
          theme === "dark"
            ? "bg-gray-950 text-gray-100 border-gray-700"
            : "bg-white text-gray-800 border-gray-200"
        }
        transition-colors duration-300 ease-in-out`}
    >
      <BrandLogo />
      {/* Main navigation section */}
      <nav className="flex-grow">
        <ul>
          <li>
            <SidebarMainCategoryButton
              text=""
              category="dashboard"
              to="/home/dashboard"
            />
          </li>
          <li className="mt-2">
            <SidebarMainCategoryButton
              text=""
              category="users"
              to="/home/users"
            />
          </li>
          <li className="mt-2">
            <SidebarMainCategoryButton
              text=""
              category="papus"
              to="/home/papuperos"
            />
          </li>
        </ul>
      </nav>
      {/* Theme Toggle remains above the UserDisplay */}
      <div className="flex justify-center ">
        {" "}
        {/* Changed mt-4 to mb-4 to create space */}
        <ThemeToogle />
      </div>

      {/* This div pushes content to the very bottom and contains the user dropdown */}
      <div
        className="mt-auto  relative flex flex-col items-center"
        ref={dropdownRef}
      >
        {/* The dropdown menu, positioned absolutely above the avatar */}
        {isDropdownOpen && (
          <div
            className={`absolute bottom-full ml-40 w-48 rounded-md shadow-lg py-1 z-10
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
              }`}
          >
            {/* User Info inside dropdown */}
            <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-600 mb-1">
              <p className="font-bold">{currentUserName.split("@")[0]}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                @{currentUserName.split("@")[1]?.split(".")[0] || "usuario"}
              </p>
            </div>

            {/* Dropdown Options with Icons */}

            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full text-left px-4 py-2 text-sm
                ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Cerrar Sesión
            </button>
            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>

            <button
              onClick={() => {
                console.log("Go to Appearance: Device theme");
                setIsDropdownOpen(false);
              }}
              className={`flex items-center w-full text-left px-4 py-2 text-sm
                ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h1M3 12H2m15.364 6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
              Aspecto: Tema del dispositivo
            </button>
          </div>
        )}

        {/* User Display and its name, acting as the dropdown trigger */}
        <div
          className="cursor-pointer flex flex-col items-center w-full"
          onClick={toggleDropdown}
        >
          <UserDisplay
            // userName={currentUserName.split("@")[0]} // Show only the part before @
            userName={""}
            avatarUrl={currentUserAvatarUrl}
            initials={currentUserInitials}
          />
          {/* <p className="mt-2 text-sm font-semibold">{currentUserName}</p>{" "} */}
          {/* Show full email */}
        </div>
      </div>
    </aside>
  );
};
