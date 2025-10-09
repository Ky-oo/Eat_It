<script setup lang="ts">
import type { Restaurant } from "~~/modules/restaurant/types";

defineProps<{
  restaurant: Restaurant | undefined;
}>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl p-8">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Notre Menu</h2>
      <div class="flex items-center text-gray-500">
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
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span>{{ restaurant?.menu?.length }} plats disponibles</span>
      </div>
    </div>

    <div class="grid gap-6">
      <ItemCard v-for="item in restaurant?.menu" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style scoped></style>
