<script setup lang="ts">
import { useHead } from "#imports";
import type { Restaurant } from "~/types/Restaurant";
import type { ApiResponse } from "~/types/Utils";

useHead({
  title: "Eat It",
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
      content: "https://kylian-patry.duckdns.org/eat-it/",
    },
  ],
});

const { data: restaurantsResponse, error } = await useAsyncData(
  "homepage-restaurants",
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
  <div class="min-h-screen py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
    <PageTitle />
    <RestaurantGrid :restaurants="restaurants" />
  </div>
</template>

<style scoped></style>
