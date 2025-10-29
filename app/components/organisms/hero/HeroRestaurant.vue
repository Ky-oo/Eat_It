<script setup lang="ts">
import type { Restaurant } from "~~/app/types/Restaurant";

defineProps<{
  restaurant: Restaurant | undefined;
}>();
</script>

<template>
  <div class="relative h-64 md:h-96 overflow-hidden">
    <NuxtImg
      :src="restaurant?.image"
      :alt="restaurant?.name"
      class="w-full h-full object-cover"
      format="webp"
      sizes="1200px"
      onerror="this.src='https://via.placeholder.com/1200x400/f3f4f6/9ca3af?text=Restaurant'"
    />

    <div
      class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
    ></div>

    <button
      @click="$router.back()"
      class="absolute cursor-pointer top-6 left-6 bg-white/90 backdrop-blur-sm hover:bg-gray-300 hover:scale-105 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped></style>
