// @shared\hooks\inactivity\useInactivityDetector.ts
// Este hook detecta la inactividad del usuario y dispara el cierre de sesión.

import { useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "@features/auth/store/auth.store";

const INACTIVITY_TIMEOUT = 99999 * 1000;

export const useInactivityDetector = (enabled: boolean = true) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Referencia mutable para el temporizador de inactividad
  const accessToken = useAuthStore((state) => state.accessToken);
  const setLastActivityTimestamp = useAuthStore(
    (state) => state.setLastActivityTimestamp
  );

  const performLogoutDueToInactivity = useCallback(() => {
    if (useAuthStore.getState().accessToken) {
      console.log("Inactividad detectada, cerrando sesión...");
      useAuthStore.getState().logout("inactivity"); // Llama a la acción de logout del store con la razón
      // La navegación a /login se manejará en AppRoutes o donde se observe el cambio de accessToken
    }
  }, []); // Dependencias: ninguna, ya que usa getState()

  const startInactivityTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(
      performLogoutDueToInactivity,
      INACTIVITY_TIMEOUT
    );
  }, [performLogoutDueToInactivity]); // Dependencias: `performLogoutDueToInactivity`

  // Función memoizada para manejar los eventos de actividad del usuario (mouse, teclado, etc.).
  const handleUserActivity = useCallback(() => {
    if (useAuthStore.getState().accessToken) {
      setLastActivityTimestamp(Date.now()); // Actualiza el timestamp de la última actividad en el store
      startInactivityTimer(); // Reinicia el temporizador de inactividad
    }
  }, [setLastActivityTimestamp, startInactivityTimer]); // Dependencias: `setLastActivityTimestamp`, `startInactivityTimer`

  useEffect(() => {
    if (!enabled || !accessToken) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      return;
    }

    startInactivityTimer();

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    // Función de limpieza del `useEffect`: se ejecuta al desmontar el componente o cuando cambian las dependencias.
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Limpia el temporizador pendiente
      }
      // Remueve los listeners de eventos para evitar fugas de memoria
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [enabled, accessToken, startInactivityTimer, handleUserActivity]); // Dependencias: accessToken, las funciones memoizadas, y 'enabled'

  // El hook no devuelve nada de UI, solo maneja la lógica interna.
};
