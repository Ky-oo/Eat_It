import { defineStore } from "pinia";
import { useRouter } from "#app";
import type { User, UsersData, UserWithoutPassword } from "../types/User";
import type { ApiError, ApiResponse } from "../types/Utils";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: null as UserWithoutPassword | null,
    isLogged: false as boolean,
  }),
  getters: {
    getUser: (state): UserWithoutPassword | null => state.user,
    checkIfLogged: (state): boolean => state.isLogged,
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
        const router = useRouter();
        router.push("/");
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

    logout() {
      this.user = null;
      this.isLogged = false;
    },
  },
});
