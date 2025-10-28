<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";
import type { ApiResponse } from "~~/app/types/Utils";

const route = useRoute();
const restaurantId = route.params.restaurant_id;

const { data: restaurantResponse, error } = await useAsyncData(
  `restaurant-${restaurantId}`,
  () => $fetch<ApiResponse<Restaurant>>(`/api/restaurants/${restaurantId}`),
  {
    server: true,
  }
);

const restaurant = computed(() => restaurantResponse.value?.data || undefined);

useHead({
  title: `Eat It - ${restaurant.value?.name}`,
  meta: [
    {
      name: "description",
      content: restaurant.value?.description,
    },
    {
      name: "keywords",
      content:
        "livraison, restaurant, eat it, commande, food, repas, " +
        restaurant.value?.cuisine,
    },
    {
      property: "og:title",
      content: `Eat It - ${restaurant.value?.name}`,
    },
    {
      property: "og:description",
      content: restaurant.value?.description,
    },
    {
      property: "og:image",
      content: restaurant.value?.image,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: `https://kylian-patry.duckdns.org/eat-it/restaurants/${restaurant.value?.id}`,
    },
  ],
});

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
