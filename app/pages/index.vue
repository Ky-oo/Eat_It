<script setup lang="ts">
import type { Restaurant } from "~/types/Restaurant";
import type { ApiResponse } from "~/types/Utils";

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
