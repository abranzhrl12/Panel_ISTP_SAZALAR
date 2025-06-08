// // src/shared/hooks/modals/useLogoutModal.ts
// // Este hook gestiona la visualización de un modal de notificación de cierre de sesión.

// import { useEffect, useState, useCallback } from "react";
// import { useAuthStore } from "@features/auth/store/auth.store"; // Importa tu store de autenticación
// import { shallow } from "zustand/shallow"; // Importa shallow para comparación

// interface UseLogoutModalReturn {
//   isModalOpen: boolean;
//   modalTitle: string;
//   modalMessage: string;
//   handleCloseModal: () => void;
// }

// /**
//  * Hook para gestionar la visualización de un modal de cierre de sesión.
//  * Detecta la razón del logout desde el store de autenticación.
//  */
// export const useLogoutModal = (): UseLogoutModalReturn => {
//   const { logoutReason, setLogoutReason } = useAuthStore(
//     (state) => ({
//       logoutReason: state.logoutReason,
//       setLogoutReason: state.setLogoutReason,
//     }),
//     shallow // Usar shallow para optimizar re-renderizados si se desestructuran varias propiedades
//   );
//   const accessToken = useAuthStore((state) => state.accessToken); // Obtener accessToken por separado

//   const [isModalOpen, setIsModalOpen] = useState(false); // Estado local para controlar la visibilidad del modal
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalMessage, setModalMessage] = useState("");

//   // Función memoizada para cerrar el modal de notificación
//   const handleCloseModal = useCallback(() => {
//     setIsModalOpen(false);
//     // IMPORTANTE: Limpia la razón de logout del store cuando el usuario cierra el modal.
//     // Esto asegura que el modal no se vuelva a mostrar si el usuario permanece en /login
//     // y la razón de logout aún está establecida.
//     setLogoutReason(null);
//   }, [setLogoutReason]); // Dependencia: setLogoutReason

//   // `useEffect`: Maneja la visualización del modal basado en `logoutReason` y `accessToken`.
//   useEffect(() => {
//     if (logoutReason === "inactivity" && !accessToken) {
//       setIsModalOpen(true);
//       setModalTitle("Sesión Cerrada");
//       setModalMessage("Tu sesión ha sido cerrada debido a inactividad.");
//     } else if (logoutReason === "manual" && !accessToken) {
//       setIsModalOpen(true);
//       setModalTitle("Sesión Finalizada");
//       setModalMessage("Has cerrado sesión exitosamente.");
//     } else {
//       setIsModalOpen(false); // Asegura que el modal esté cerrado si no hay una razón de logout activa
//       // No limpiar setLogoutReason aquí, handleCloseModal lo hace cuando el usuario interactúa
//     }
//   }, [logoutReason, accessToken]); // Observa cambios en `logoutReason` y `accessToken`.

//   // El hook devuelve el estado y las funciones para el modal.
//   return { isModalOpen, modalTitle, modalMessage, handleCloseModal };
// };
