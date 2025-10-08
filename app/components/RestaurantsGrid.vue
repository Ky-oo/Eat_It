<script setup lang="ts">
import type { Restaurant } from "~~/modules/restaurant/types";

const { data: restaurants } = await useAsyncData("restaurants", () =>
  $fetch<Restaurant[]>("/api/restaurants")
);
</script>

<template>
  <RestaurantSearchBar />

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <RestaurantCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>

  <NoRestaurants v-if="restaurants && restaurants.length === 0" />
</template>

<style scoped></style>
