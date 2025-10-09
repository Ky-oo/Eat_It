<script setup lang="ts">
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
          placeholder="Rechercher un restaurant, une cuisine..."
          class="w-full pl-12 pr-32 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
        />

        <button
          @click="emit('search', query)"
          class="absolute right-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Rechercher</span>
        </button>
      </div>
    </div>

    <PopularSearches
      @popularSearch="(popularSearch: string | null) => $emit('popularSearch', popularSearch)"
    />
  </div>
</template>
