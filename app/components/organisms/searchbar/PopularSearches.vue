<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits<{
  popularSearch: [popularSearch: string | null];
}>();

const selected = ref<string | null>(null);

const selectCategory = (category: string | null) => {
  if (category === selected.value) {
    selected.value = null;
    emit("popularSearch", null);
  }
  selected.value = category;
  emit("popularSearch", category);
};

const data = [
  {
    id: 1,
    name: "pizza",
    texteKey: "search.popular.pizza",
  },
  {
    id: 2,
    name: "burger",
    texteKey: "search.popular.burger",
  },
  {
    id: 3,
    name: "sushi",
    texteKey: "search.popular.sushi",
  },
  {
    id: 4,
    name: "mexicain",
    texteKey: "search.popular.mexican",
  },
  {
    id: 5,
    name: "indien",
    texteKey: "search.popular.indian",
  },
  {
    id: 6,
    name: "healthy",
    texteKey: "search.popular.healthy",
  },
];
</script>

<template>
  <div class="mt-4 flex flex-wrap gap-3">
    <span class="text-sm text-gray-500 font-medium py-2">{{
      t("search.popular.title")
    }}</span>

    <PopularSearchChips
      v-for="data in data"
      :key="data.id"
      :PopularSearchChips="data"
      :selected="selected"
      @selectedSearch="
        (selectedSearch) => {
          selectCategory(selectedSearch);
        }
      "
    />
  </div>
</template>

<style scoped></style>
