<script setup lang="ts">
import PopularSearchChips from "./PopularSearchChips.vue";

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
    texte: "🍕 Pizza",
  },
  {
    id: 2,
    name: "burger",
    texte: "🍔 Burger",
  },
  {
    id: 3,
    name: "sushi",
    texte: "🍣 Sushi",
  },
  {
    id: 4,
    name: "mexicain",
    texte: "🌮 Mexicain",
  },
  {
    id: 5,
    name: "indien",
    texte: "🍛 Indien",
  },
  {
    id: 6,
    name: "healthy",
    texte: "🥗 Healthy",
  },
];
</script>

<template>
  <div class="mt-4 flex flex-wrap gap-3">
    <span class="text-sm text-gray-500 font-medium py-2"
      >Recherches populaires :</span
    >

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
