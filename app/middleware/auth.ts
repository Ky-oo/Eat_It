export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth();

  // Vérifier si l'utilisateur est connecté
  if (!auth.isLogged) {
    console.log("Accès refusé - redirection vers /login pour:", to.path);
    return navigateTo("/login");
  }
});
