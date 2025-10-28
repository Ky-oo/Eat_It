<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";
import type { ApiResponse } from "~~/app/types/Utils";
definePageMeta({
  ssr: true,
});

useHead({
  title: "Eat It - Restaurants",
  meta: [
    {
      name: "description",
      content:
        "Découvrez les meilleurs restaurants loin de chez vous et faites-vous livrer le plus rapidement possible (on fait comme on peut) avec Eat It.",
    },
    {
      name: "keywords",
      content:
        "livraison, restaurant, pizza, burger, sushi, eat it, commande, food, repas",
    },
    {
      property: "og:title",
      content: "Eat It",
    },
    {
      property: "og:description",
      content:
        "Parcourez notre catalogue de restaurants et commandez vos plats préférés en ligne.",
    },
    {
      property: "og:image",
      content: "/logos/logo_entier.png",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://kylian-patry.duckdns.org/eat-it/restaurants",
    },
  ],
});

const { data: restaurantsResponse, error } = await useAsyncData(
  "all-restaurants",
  () => $fetch<ApiResponse<Restaurant[]>>("/api/restaurants")
);

const restaurants = computed(() => restaurantsResponse.value?.data || []);

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: "Erreur lors du chargement des restaurants",
  });
}
</script>

<template>
  <div class="min-h-screen py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Tous nos restaurants
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl">
        Découvrez notre sélection de restaurants partenaires et commandez vos
        plats préférés en livraison rapide.
      </p>
    </div>

    <div
      v-if="restaurants && restaurants.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>

    <div v-else class="text-center py-12">
      <NoRestaurants />
    </div>
  </div>
</template>

<style scoped></style>
