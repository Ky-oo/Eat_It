import { useAuth } from "~/stores/Auth";

export default defineNuxtRouteMiddleware((to, next) => {
  if (import.meta.client) {
    const authStore = useAuth();

    if (!authStore.isLogged) {
      return navigateTo("/login");
    }

    const restrictedPage = ["backoffice", "owner"];
    const nextPage = to.path.slice(1);

    if (
      !restrictedPage.includes(nextPage) ||
      authStore.getUser?.roles.includes(nextPage)
    ) {
      next;
      return;
    } else {
      console.error(`Unauthorized / Try to access ${nextPage}`);
    }

    return navigateTo("/");
  }
});
