<script setup lang="ts">
import type { Restaurant } from "~~/modules/restaurant/types";

const { data: restaurants } = await useAsyncData("restaurants", () =>
  $fetch<Restaurant[]>("/api/restaurants")
);
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Eat It</h1>
        <p class="text-xl text-gray-600">
          Découvrez les meilleurs restaurants près de chez vous
        </p>
      </div>

      <!-- Restaurant Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer flex flex-col h-full"
        >
          <!-- Restaurant Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="restaurant.image"
              :alt="restaurant.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onerror="this.src='https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Restaurant'"
            />
            <!-- Cuisine Badge -->
            <div class="absolute top-3 left-3">
              <span
                class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ restaurant.cuisine }}
              </span>
            </div>
            <!-- Rating Badge -->
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
                <span class="text-sm font-medium text-gray-800">{{
                  restaurant.rating
                }}</span>
              </div>
            </div>
          </div>

          <!-- Restaurant Info -->
          <div class="p-6 flex flex-col flex-grow">
            <h3
              class="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200"
            >
              {{ restaurant.name }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ restaurant.description }}
            </p>

            <!-- Delivery Info -->
            <div
              class="flex items-center justify-between text-sm text-gray-500 mb-4"
            >
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
                <span>{{ restaurant.deliveryTime }}</span>
              </div>
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
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{{ restaurant.deliveryFee }}€</span>
              </div>
            </div>

            <!-- Spacer to push button to bottom -->
            <div class="flex-grow"></div>

            <!-- Action Button -->
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
      </div>

      <!-- Empty State -->
      <div
        v-if="!restaurants || restaurants.length === 0"
        class="text-center py-12"
      >
        <svg
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 class="text-xl font-medium text-gray-500 mb-2">
          Aucun restaurant disponible
        </h3>
        <p class="text-gray-400">
          Revenez plus tard pour découvrir nos restaurants partenaires.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
