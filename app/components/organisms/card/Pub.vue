<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
defineProps<{
  pubContent: Array<{
    img: string;
    alt: string;
    title: string;
  }>;
}>();
</script>

<template>
  <div
    v-for="pub in pubContent"
    :key="pub.title"
    class="bg-white border border-gray-300 rounded-lg p-4 text-center shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
  >
    <NuxtImg
      :src="pub.img"
      :alt="pub.alt"
      class="w-full h-32 object-cover rounded mb-2"
      format="webp"
      sizes="256px"
    />
    <p class="text-xs text-gray-600">{{ t("sponsoredContent") }}</p>
    <p class="text-sm font-medium text-gray-800">{{ pub.title }}</p>
  </div>
</template>

<style scoped></style>
