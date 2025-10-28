<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";
import type { ApiResponse } from "~~/app/types/Utils";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const route = useRoute();
const restaurantId = route.params.restaurant_id;

import { onMounted, ref } from "vue";

const restaurantResponse = ref<ApiResponse<Restaurant> | null>(null);
const error = ref<any>(null);

onMounted(async () => {
  try {
    restaurantResponse.value = await $fetch<ApiResponse<Restaurant>>(
      `/api/restaurants/${restaurantId}`
    );
  } catch (err) {
    error.value = err;
  }
});

const restaurant = computed(() => restaurantResponse.value?.data || undefined);

useSeoMeta({
  title: restaurant.value
    ? `Eat It - ${restaurant.value.name}`
    : "Eat It - Restaurant",
  description: restaurant.value
    ? restaurant.value.description
    : "Découvrez les meilleurs restaurants loin de chez vous et faites-vous livrer le plus rapidement possible (on fait comme on peut) avec Eat It.",
  ogTitle: restaurant.value
    ? `Eat It - ${restaurant.value.name}`
    : "Eat It - Restaurant",
  ogDescription: restaurant.value
    ? restaurant.value.description
    : "Parcourez notre catalogue de restaurants et commandez vos plats préférés en ligne.",
  ogImage: restaurant.value
    ? restaurant.value.image
    : "/logos/logo_entier.webp",
  ogUrl: `https://kylian-patry.duckdns.org/eat-it/restaurants/${restaurantId}`,
});

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("restaurant.notFound"),
  });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 mb-5">
    <HeroRestaurant :restaurant="restaurant" />

    <div class="relative -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LazyRestaurantDescription :restaurant="restaurant" />
      <LazyRestaurantMenu :restaurant="restaurant" />
    </div>
  </div>
</template>

<style scoped>
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
