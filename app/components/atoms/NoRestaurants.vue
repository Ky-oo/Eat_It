<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="text-center py-12">
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
      {{ t("owner.noRestaurant.title") }}
    </h3>
    <p class="text-gray-400">
      {{ t("owner.noRestaurant.subtitle") }}
    </p>
  </div>
</template>

<style scoped></style>
