<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";
import { useAuth } from "#imports";

const authStore = useAuth();
defineProps<{
  restaurant: Restaurant;
}>();
</script>

<template>
  <NuxtLink
    :to="authStore.isLogged ? `/restaurants/${restaurant.id}` : '/login'"
  >
    <div
      class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer flex flex-col h-full"
    >
      <div class="relative h-48 overflow-hidden">
        <img
          :src="restaurant.image"
          :alt="restaurant.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onerror="this.src='https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Restaurant'"
        />
        <div class="absolute top-3 left-3">
          <span
            class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ restaurant.cuisine }}
          </span>
        </div>
        <div class="absolute top-3 right-3">
          <div
            class="bg-white/90 backdrop-blur-sm flex items-center px-2 py-1 rounded-full"
          >
            <svg
              class="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="text-sm font-medium text-gray-800">
              {{ restaurant.rating }}
            </span>
          </div>
        </div>
      </div>

      <div class="p-6 flex flex-col flex-grow">
        <h3
          class="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200"
        >
          {{ restaurant.name }}
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          {{ restaurant.description }}
        </p>

        <div class="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-4">
          <div class="flex items-center">
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="flex-nowrap">{{ restaurant.deliveryTime }}</span>
          </div>

          <div class="flex items-center justify-center">
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{{ restaurant.distance }}Km</span>
          </div>

          <div class="flex items-center justify-end">
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{{ restaurant.deliveryFee }}€</span>
          </div>
        </div>

        <div class="flex-grow"></div>

        <button
          class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center mt-auto"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Commander
        </button>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
