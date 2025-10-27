<script setup lang="ts">
import type { Restaurant } from "~/types/Restaurant";
const props = defineProps<{ restaurant: Restaurant }>();
</script>

<template>
  <NuxtLink
    :to="`/owner/restaurants/${restaurant.id}`"
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="restaurant.image"
        :alt="restaurant.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
      ></div>
      <div class="absolute bottom-4 left-4 right-4">
        <h3 class="text-xl font-bold text-white mb-1">
          {{ restaurant.name }}
        </h3>
        <p class="text-white/90 text-sm">
          {{ restaurant.cuisine }}
        </p>
      </div>
    </div>

    <div class="p-6">
      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ restaurant.description }}
      </p>

      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center text-yellow-500">
          <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="font-medium">{{ restaurant.rating }}</span>
        </div>

        <div class="flex items-center text-gray-600">
          <svg
            class="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>{{ restaurant.menu?.length || 0 }} plats</span>
        </div>
      </div>

      <button
        class="mt-4 w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white py-2 rounded-lg font-medium transition-colors"
      >
        Gérer ce restaurant
      </button>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
