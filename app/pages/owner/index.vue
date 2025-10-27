<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import { useAuth } from "~/stores/Auth";
import type { ApiResponse } from "~/types/Utils";
import type { Restaurant } from "~/types/Restaurant";
import { isArray } from "util";

const authStore = useAuth();
const restaurants = ref<Restaurant[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  await loadRestaurants();
});

const loadRestaurants = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await $fetch<ApiResponse<Restaurant>>(
      `/api/restaurants/owner/${authStore.user?.id}`
    );

    restaurants.value = Array.isArray(response.data)
      ? response.data
      : [response.data];
    console.log(restaurants.value);
  } catch (err: any) {
    console.error("Erreur lors du chargement des restaurants:", err);
    error.value = err.message || "Impossible de charger les restaurants";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Gestion des restaurants
        </h1>
        <p class="text-gray-600">Gérez vos restaurants, menus et paramètres</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="loadRestaurants"
          class="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Réessayer
        </button>
      </div>

      <!-- No Restaurants -->
      <div
        v-else-if="restaurants.length === 0"
        class="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <svg
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          Aucun restaurant
        </h3>
        <p class="text-gray-600">
          Vous n'avez pas encore de restaurant associé à votre compte.
        </p>
      </div>

      <!-- Restaurants Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :to="`/owner/restaurants/${restaurant.id}`"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="restaurant.image"
              :alt="restaurant.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>
            <div class="absolute bottom-4 left-4 right-4">
              <h3 class="text-xl font-bold text-white mb-1">
                {{ restaurant.name }}
              </h3>
              <p class="text-white/90 text-sm">
                {{ restaurant.cuisine }}
              </p>
            </div>
          </div>

          <div class="p-6">
            <p class="text-gray-600 mb-4 line-clamp-2">
              {{ restaurant.description }}
            </p>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center text-yellow-500">
                <svg
                  class="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="font-medium">{{ restaurant.rating }}</span>
              </div>

              <div class="flex items-center text-gray-600">
                <svg
                  class="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>{{ restaurant.menu?.length || 0 }} plats</span>
              </div>
            </div>

            <button
              class="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Gérer ce restaurant
            </button>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
