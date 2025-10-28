import { defineStore } from "pinia";
import type { User, UsersData, UserWithoutPassword } from "../types/User";
import type { ApiError, ApiResponse, GoogleAuthResponse } from "../types/Utils";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: null as UserWithoutPassword | null,
    isLogged: false as boolean,
    tokens: null as { access_token?: string; refresh_token?: string } | null,
  }),
  getters: {
    getUser: (state): UserWithoutPassword | null => state.user,
    checkIfLogged: (state): boolean => state.isLogged,
    getTokens: (state) => state.tokens,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await $fetch<ApiResponse<User[]>>("/api/users");
        const user = response.data.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) {
          throw new Error("Email ou mot de passe incorrect.");
        }

        this.isLogged = true;
        const { password: userPassword, ...userWithoutPassword } = user;
        this.user = userWithoutPassword;

        this.redirectAfterLogin();
      } catch (error: unknown) {
        const apiError: ApiError = {
          message:
            error instanceof Error ? error.message : "Erreur de connexion",
          status: 401,
        };
        console.error("Erreur lors de la connexion:", apiError);
        throw new Error(apiError.message);
      }
    },

    redirectAfterLogin() {
      if (!this.isLogged) {
        navigateTo("/login");
        return;
      }

      const roles = this.user?.roles;

      if (roles?.includes("backoffice")) {
        navigateTo("/backoffice");
        return;
      }

      if (roles?.includes("owner")) {
        navigateTo("/owner");
        return;
      }

      navigateTo("/");
    },

    async googleLogin(googleResponse: GoogleAuthResponse) {
      try {
        this.tokens = {
          access_token: googleResponse.access_token,
          refresh_token: googleResponse.refresh_token,
        };

        const response = await $fetch<ApiResponse<User>>(
          `/api/users/google-auth/${googleResponse.user.sub}`
        );
        const googleUser = response.data;

        if (!googleUser) {
          throw new Error("Compte inconnu. Merci de créer un compte");
        }
        const { password: userPassword, ...userWithoutPassword } = googleUser;
        this.user = userWithoutPassword;
        this.user.picture = googleResponse.user.picture;
        this.isLogged = true;

        this.redirectAfterLogin();
      } catch (error: unknown) {
        const apiError: ApiError = {
          message:
            error instanceof Error
              ? error.message
              : "Erreur de connexion Google",
          status: 401,
        };
        console.error("Erreur lors de la connexion Google:", apiError);
        throw new Error(apiError.message);
      }
    },

    logout() {
      this.user = null;
      this.isLogged = false;
      this.tokens = null;
      navigateTo("/");
    },
  },
});
