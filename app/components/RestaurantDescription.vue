<script setup lang="ts">
import type { Restaurant } from "~~/modules/restaurant/types";

defineProps<{
  restaurant: Restaurant | undefined;
}>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
    <div
      class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
    >
      <!-- Informations principales -->
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ restaurant?.cuisine }}
          </span>
          <div class="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
            <svg
              class="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="text-yellow-600 font-medium text-sm">{{
              restaurant?.rating
            }}</span>
          </div>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ restaurant?.name }}
        </h1>
        <p class="text-gray-600 text-lg mb-6 leading-relaxed">
          {{ restaurant?.description }}
        </p>

        <!-- Informations de livraison -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center p-4 bg-gray-50 rounded-xl">
            <svg
              class="w-8 h-8 text-orange-500 mr-3"
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
            <div>
              <p class="text-sm text-gray-500">Temps de livraison</p>
              <p class="font-semibold text-gray-900">
                {{ restaurant?.deliveryTime }}
              </p>
            </div>
          </div>

          <div class="flex items-center p-4 bg-gray-50 rounded-xl">
            <svg
              class="w-8 h-8 text-orange-500 mr-3"
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
            <div>
              <p class="text-sm text-gray-500">Distance</p>
              <p class="font-semibold text-gray-900">
                {{ restaurant?.distance }}Km
              </p>
            </div>
          </div>

          <div class="flex items-center p-4 bg-gray-50 rounded-xl">
            <svg
              class="w-8 h-8 text-orange-500 mr-3"
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
            <div>
              <p class="text-sm text-gray-500">Frais de livraison</p>
              <p class="font-semibold text-gray-900">
                {{ restaurant?.deliveryFee }}€
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
