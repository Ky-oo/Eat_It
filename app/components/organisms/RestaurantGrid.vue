<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";
import type { ApiResponse } from "~~/app/types/Utils";

const { data: restaurantsResponse } = await useAsyncData("restaurants", () =>
  $fetch<ApiResponse<Restaurant[]>>("/api/restaurants")
);

const restaurants = computed(() => restaurantsResponse.value?.data || []);
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
    return;
  }
  filteredRestaurants.value = restaurants.value?.filter((restaurant) => {
    return (
      restaurant.cuisine.toLocaleLowerCase() ===
      popularSearch?.toLocaleLowerCase()
    );
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

    <NoRestaurants
      v-if="
        filteredRestaurants !== undefined
          ? filteredRestaurants.length === 0
          : restaurants && restaurants.length === 0
      "
      class="flex flex-col items-center justify-center col-span-full"
    />
  </div>
</template>

<style scoped></style>
