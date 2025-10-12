<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";

const route = useRoute();

const restaurantId = route.params.restaurant_id;

const { data: restaurant, error } = await useAsyncData(
  `restaurant-${restaurantId}`,
  () => $fetch<Restaurant>(`/api/restaurants/${restaurantId}`)
);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Restaurant non trouvé",
  });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 mb-5">
    <HeroRestaurant :restaurant="restaurant" />

    <div class="relative -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RestaurantDescription :restaurant="restaurant" />
      <RestaurantMenu :restaurant="restaurant" />
    </div>
  </div>
</template>

<style scoped>
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
