// // src/features/dashboard/components/HomeSubMenu.tsx
// import React from "react";
// import { ButtonBasic } from "@shared/components/atoms"; // Asegúrate de la ruta correcta

// // Define los tipos de categorías que puede recibir.
// // Asegúrate de que MainMenuCategory esté definido en tu stores/menu.store.ts
// type MainMenuCategory =
//   | "dashboard"
//   | "users"
//   | "campaigns"
//   | "adgroups"
//   | "audiences"
//   | null;

// interface HomeSubMenuProps {
//   selectedCategory: MainMenuCategory;
//   handleCategoryClick: (category: MainMenuCategory) => void;
// }

// export const HomeSubMenu: React.FC<HomeSubMenuProps> = ({
//   selectedCategory,
//   handleCategoryClick,
// }) => {
//   return (
//     <li>
//       <ButtonBasic
//         text="Dashboard" // Asegúrate de que el texto sea "Dashboard"
//         onClick={() => handleCategoryClick("dashboard")}
//         className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
//           selectedCategory === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
//         }`}
//       />
//     </li>
//   );
// };
