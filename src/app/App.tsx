// @app/App.tsx
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes"; // Tu componente AppRoutes
import { QueryProvider } from "@shared/providers/QueryProvider";
import { useAuthStore } from "./features/auth/store/auth.store"; // Tu store de autenticación

export const App = () => {
  // Obtenemos el estado de _hasHydrated y su setter del store de Zustand
  const { _hasHydrated, setHasHydrated } = useAuthStore();

  // useEffect para detectar cuando el store de persistencia ha terminado de cargar
  useEffect(() => {
    // onFinishHydration es el callback que se ejecuta cuando el store ha terminado de rehidratarse.
    // Esto es fundamental para saber cuándo el 'accessToken' tiene su valor definitivo.
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      console.log("Zustand store ha terminado de hidratarse.");
      setHasHydrated(true); // Una vez hidratado, actualizamos la bandera
    });

    // La función de retorno de useEffect se encarga de limpiar la suscripción
    return () => unsub();
  }, [setHasHydrated]); // setHasHydrated es una dependencia para que useEffect reaccione si cambia

  // Si el store aún no se ha hidratado (_hasHydrated es false),
  // mostramos un mensaje de carga. Esto EVITA el parpadeo.
  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Cargando aplicación...</p> {/* O un spinner más elaborado */}
      </div>
    );
  }

  // Una vez que el store está completamente hidratado (_hasHydrated es true),
  // procedemos a renderizar el resto de la aplicación con sus rutas.
  // En este punto, 'accessToken' en el store ya tiene su valor final (del localStorage o null).
  return (
    <>
      <BrowserRouter>
        <QueryProvider>
          {/* Aquí AppRoutes y ProtectedRoute ya pueden confiar en que el estado de autenticación
              es el correcto y no el inicial por defecto. */}
          <AppRoutes />
        </QueryProvider>
      </BrowserRouter>
    </>
  );
};
