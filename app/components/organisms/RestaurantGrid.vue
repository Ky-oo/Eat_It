<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";

interface Props {
  restaurants: Restaurant[];
}

const props = withDefaults(defineProps<Props>(), {
  restaurants: () => [],
});

const filteredRestaurants = ref();

function applySearchQuery(query: string): void {
  if (query !== undefined && query !== "" && query.length >= 2) {
    filteredRestaurants.value = props.restaurants?.filter(
      (restaurant: Restaurant) =>
        restaurant.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  } else {
    filteredRestaurants.value = props.restaurants;
  }
}

function applyPopularSearch(popularSearch: string | null): void {
  if (popularSearch === null) {
    filteredRestaurants.value = props.restaurants;
    return;
  }
  filteredRestaurants.value = props.restaurants?.filter(
    (restaurant: Restaurant) => {
      return (
        restaurant.cuisine.toLocaleLowerCase() ===
        popularSearch?.toLocaleLowerCase()
      );
    }
  );
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
      v-for="restaurant in filteredRestaurants ?? props.restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />

    <NoRestaurants
      v-if="
        filteredRestaurants !== undefined
          ? filteredRestaurants.length === 0
          : props.restaurants && props.restaurants.length === 0
      "
      class="flex flex-col items-center justify-center col-span-full"
    />
  </div>
</template>

<style scoped></style>
