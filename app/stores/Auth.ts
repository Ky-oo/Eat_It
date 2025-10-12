import { defineStore } from "pinia";
import type { User, UsersData } from "../types/User";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: null as Omit<User, "password"> | null,
    isLogged: false as boolean,
  }),
  getters: {
    getUser: (state): Omit<User, "password"> | null => state.user,
    isLogged: (state): boolean => state.isLogged,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const usersData = await $fetch<UsersData>("/api/users");

        const user = usersData?.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) {
          throw new Error("Email ou mot de passe incorrect.");
        }

        this.isLogged = true;
        const { password: userPassword, ...userWithoutPassword } = user;
        this.user = userWithoutPassword;

        return { success: true, user: this.user };
      } catch (error: any) {
        console.error("Erreur lors de la connexion:", error);
        throw new Error(error.message || "Erreur de connexion");
      }
    },

    logout() {
      this.user = null;
      this.isLogged = false;
    },
  },
});
