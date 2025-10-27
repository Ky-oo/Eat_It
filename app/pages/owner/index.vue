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
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Gestion des restaurants
        </h1>
        <p class="text-gray-600">Gérez vos restaurants, menus et paramètres</p>
      </div>

      <loader v-if="loading" />

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

      <div
        v-else-if="restaurants.length === 0"
        class="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <OwnerNoRestaurantCard />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OwnerRestaurantCard
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
