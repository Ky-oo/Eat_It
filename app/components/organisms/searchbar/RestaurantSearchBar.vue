<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const query = ref("");

const emit = defineEmits<{
  search: [query: string];
  popularSearch: [popularSearch: any];
}>();

watch(query, () => {
  emit("search", query.value);
});
</script>

<template>
  <div class="w-full max-w-4xl mx-auto mb-8">
    <div class="relative">
      <div class="relative flex items-center">
        <div class="absolute left-4 z-10">
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          v-model="query"
          type="text"
          :placeholder="t('search.placeholder')"
          class="w-full pl-12 pr-20 sm:pr-32 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
        />

        <button
          @click="emit('search', query)"
          class="absolute right-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
        >
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span class="hidden sm:inline">{{ t("search.button") }}</span>
        </button>
      </div>
    </div>

    <PopularSearches
      @popularSearch="(popularSearch: string | null) => $emit('popularSearch', popularSearch)"
    />
  </div>
</template>
