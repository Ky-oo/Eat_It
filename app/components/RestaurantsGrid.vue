<script setup lang="ts">
import type { Restaurant } from "~~/modules/restaurant/types";

const { data: restaurants } = await useAsyncData("restaurants", () =>
  $fetch<Restaurant[]>("/api/restaurants")
);
const filteredRestaurants = ref();

function applySearchQuery(query: string): void {
  if (query !== undefined && query !== "" && query.length >= 2) {
    filteredRestaurants.value = restaurants.value?.filter((restaurant) =>
      restaurant.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  } else {
    filteredRestaurants.value = restaurants.value;
  }
}

function applyPopularSearch(popularSearch: string | null): void {
  if (popularSearch === null) {
    filteredRestaurants.value = restaurants.value;
  }
  filteredRestaurants.value = restaurants.value?.filter((restaurant) => {
    restaurant.cuisine === popularSearch;
  });
}
</script>

<template>
  <RestaurantSearchBar
    @search="applySearchQuery"
    @popularSearch="applyPopularSearch"
  />

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <RestaurantCard
      v-for="restaurant in filteredRestaurants ?? restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>

  <NoRestaurants v-if="restaurants && restaurants.length === 0" />
</template>

<style scoped></style>
