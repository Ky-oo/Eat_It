export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth();

  // Vérifier si l'utilisateur est connecté
  if (!auth.isLogged) {
    return navigateTo("/login");
  }
});
