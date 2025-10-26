<script setup lang="ts">
import { useAuth } from "../../../stores/Auth";
const authStore = useAuth();
</script>

<template>
  <nav class="px-4 py-3 bg-orange-500 flex items-center justify-between">
    <NuxtLink to="/" class="inline-block">
      <img
        src="/logos/logo.png"
        alt="Eat It Logo"
        class="mx-auto h-12 w-auto bg-orange-50 px-6 py-3 rounded-2xl shadow-lg"
      />
    </NuxtLink>

    <div class="flex items-center space-x-4">
      <div v-if="!authStore.checkIfLogged" class="flex gap-2">
        <NuxtLink
          to="/login"
          class="bg-orange-50 text-orange-500 hover:text-orange-50 px-4 py-2 hover:border rounded-2xl font-medium hover:bg-orange-500 transition-colors duration-200 cursor-pointer"
        >
          Connexion
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="text-white px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
        >
          Inscription
        </NuxtLink>
      </div>
      <div v-else class="flex items-center space-x-3">
        <!-- Bouton Mon Compte -->
        <NuxtLink
          to="/account"
          class="flex items-center text-orange-500 bg-orange-50 px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-500 hover:text-orange-50 transition-colors duration-200 cursor-pointer"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Mon Compte
        </NuxtLink>

        <button
          @click="authStore.logout"
          class="flex items-center text-white px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="hidden sm:inline">Déconnexion</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
