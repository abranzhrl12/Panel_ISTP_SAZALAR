import React, { useState } from "react";
import {
  Home,
  Search,
  BarChart3,
  CheckSquare,
  Target,
  Briefcase,
  Bell,
  Mail,
  Inbox,
  Calendar,
  ListTodo,
  FileText,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useSidebar } from "./useSidebar"; // 1. IMPORTAMOS NUESTRO HOOK

// Tipos y datos constantes (sin cambios)
interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  children?: MenuItem[];
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

// 2. SIMPLIFICAMOS LAS PROPS: Ya no necesitamos isCollapsed, onToggle, ni onClose.
interface SidebarProps {
  isMobile: boolean;
}

const menuItems: MenuItem[] = [
  // ... (sin cambios)
  { id: "dashboard", label: "Dashboard", icon: "Home", href: "/dashboard" },
  { id: "search", label: "Search", icon: "Search", href: "/search" },
  {
    id: "reporting",
    label: "Reporting",
    icon: "BarChart3",
    children: [
      {
        id: "check-ins",
        label: "Check-ins",
        icon: "CheckSquare",
        href: "/reporting/check-ins",
      },
      {
        id: "objectives",
        label: "Objectives",
        icon: "Target",
        href: "/reporting/objectives",
      },
      {
        id: "career-hub",
        label: "Career Hub",
        icon: "Briefcase",
        href: "/reporting/career",
      },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "Bell",
    href: "/notifications",
  },
  { id: "mail", label: "Mail", icon: "Mail", href: "/mail" },
  { id: "inbox", label: "Inbox", icon: "Inbox", href: "/inbox" },
  { id: "kanban", label: "Kanban", icon: "Calendar", href: "/kanban" },
  { id: "tasks", label: "Tasks", icon: "ListTodo", badge: 3 },
];
const bottomMenuItems: MenuItem[] = [
  { id: "support", label: "Support", icon: "HelpCircle", href: "/support" },
  { id: "settings", label: "Settings", icon: "Settings", href: "/settings" },
];
const user: User = {
  name: "Anna Taylor",
  email: "anna.t@email.com",
  avatar:
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
};
const iconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Search,
  BarChart3,
  CheckSquare,
  Target,
  Briefcase,
  Bell,
  Mail,
  Inbox,
  Calendar,
  ListTodo,
  FileText,
  HelpCircle,
  Settings,
  ExternalLink,
};

// ===== COMPONENTE REFACTORIZADO =====
const AppPrueba: React.FC<SidebarProps> = ({ isMobile }) => {
  // 3. CONSUMIMOS EL CONTEXTO A TRAVÉS DEL HOOK
  // Obtenemos el estado y las funciones directamente de aquí.
  const { isCollapsed, toggleSidebar, closeSidebar } = useSidebar();

  // El estado local para los items del menú se mantiene, ya que es propio del sidebar.
  const [expandedItems, setExpandedItems] = useState<string[]>(["reporting"]);
  const [activeItem, setActiveItem] = useState("inbox");

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed && !isMobile) return;
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId: string, hasChildren: boolean = false) => {
    if (hasChildren) {
      toggleExpanded(itemId);
    } else {
      setActiveItem(itemId);
      if (isMobile) {
        // 4. USAMOS LA FUNCIÓN DEL HOOK PARA CERRAR EN MÓVIL
        closeSidebar();
      }
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const Icon = iconMap[item.icon];
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        {/* El JSX no cambia, ya que sigue usando una variable `isCollapsed` */}
        <button
          onClick={() => handleItemClick(item.id, hasChildren)}
          className={`w-full flex items-center ${
            isCollapsed && !isMobile ? "justify-center px-0" : "gap-3 px-3"
          } py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group relative ${
            level > 0 ? "ml-6 pl-6" : ""
          } ${
            isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Icon size={20} className="flex-shrink-0" />
          {(!isCollapsed || isMobile) && (
            <span className="flex-1 text-left whitespace-nowrap overflow-hidden transition-all duration-300">
              {item.label}
              {item.badge && (
                <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </span>
          )}
          {(!isCollapsed || isMobile) && hasChildren && (
            <div className="transition-transform duration-200 flex-shrink-0">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          )}
          {isCollapsed && !isMobile && item.badge && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></div>
          )}
        </button>
        {hasChildren && (!isCollapsed || isMobile) && (
          <div
            className={`mt-1 space-y-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              isExpanded ? "max-h-screen" : "max-h-0"
            }`}
          >
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
          // 5. USAMOS LA FUNCIÓN DEL HOOK
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      {/* Todo el renderizado condicional sigue funcionando igual con `isCollapsed` del hook */}
      <div
        className={`fixed left-0 top-0 h-screen z-50 lg:relative lg:z-auto bg-white border-gray-200 border-r transition-all duration-300 ease-in-out ${
          isCollapsed && !isMobile ? "w-16" : "w-72"
        } ${
          isMobile
            ? isCollapsed
              ? "-translate-x-full"
              : "translate-x-0"
            : "translate-x-0"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-inherit flex-shrink-0">
          <div
            className={`flex items-center gap-3 ${
              isCollapsed && !isMobile ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <h1
              className={`font-bold text-lg text-gray-900 overflow-hidden whitespace-nowrap transition-all duration-300 ${
                isCollapsed && !isMobile
                  ? "max-w-0 opacity-0"
                  : "max-w-full opacity-100"
              }`}
            >
              Beyond UI
            </h1>
          </div>
        </div>

        {/* Navigation sections */}
        <div
          className="flex-1 p-4 space-y-2 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {menuItems.map((item) => renderMenuItem(item))}
        </div>
        <div className="p-4 space-y-2 border-t border-inherit flex-shrink-0">
          {bottomMenuItems.map((item) => renderMenuItem(item))}
        </div>

        {/* User Profile */}
        <div
          className={`p-4 border-t border-inherit flex-shrink-0 ${
            isCollapsed && !isMobile ? "px-2" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div
              className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
                isCollapsed && !isMobile
                  ? "max-w-0 opacity-0"
                  : "max-w-full opacity-100"
              }`}
            >
              <p className="text-sm font-medium truncate text-gray-900">
                {user.name}
              </p>
              <p className="text-xs truncate text-gray-500">{user.email}</p>
            </div>
            {(!isCollapsed || isMobile) && (
              <button className="p-1 rounded-md transition-colors duration-200 hover:bg-gray-100 text-gray-500 flex-shrink-0">
                <ExternalLink size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Collapse Toggle for Desktop */}
        {!isMobile && (
          <button
            // 6. USAMOS LA FUNCIÓN TOGGLE DEL HOOK
            onClick={toggleSidebar}
            className={`absolute -right-3 top-8 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 bg-white border-gray-200 text-gray-500 hover:bg-gray-50`}
          >
            <ChevronRight
              size={12}
              className={`transition-transform duration-300 ${
                isCollapsed ? "" : "rotate-180"
              }`}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default AppPrueba;
