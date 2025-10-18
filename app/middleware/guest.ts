import { useAuth } from "~/stores/Auth";

// Middleware pour les pages accessibles uniquement aux utilisateurs non connectés
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const auth = useAuth();

    if (auth.isLogged) {
      return navigateTo("/");
    }
  }
});
