<script setup lang="ts">
import type { Restaurant } from "~~/modules/restaurant/types";
import { useCart } from "~/stores/Cart";

const route = useRoute();
const cart = useCart();

const restaurantId = route.params.restaurant_id;

const { data: restaurant, error } = await useAsyncData(
  `restaurant-${restaurantId}`,
  () => $fetch<Restaurant>(`/api/restaurants/${restaurantId}`)
);

// Erreur 404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Restaurant non trouvé",
  });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <HeroRestaurant :restaurant="restaurant" />

    <div class="relative -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RestaurantDescription :restaurant="restaurant" />
      <RestaurantMenu :restaurant="restaurant" />
    </div>
  </div>
</template>

<style scoped>
/* Animations personnalisées si nécessaire */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
