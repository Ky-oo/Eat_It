<script setup lang="ts">
import type { PopularSearchChips } from "../types/PopularSearchChips";

const props = defineProps<{
  PopularSearchChips: PopularSearchChips;
  selected: string | null;
}>();

const emit = defineEmits<{
  selectedSearch: [selectedSearch: string | null];
}>();
</script>

<template>
  <button
    @click="
      emit(
        'selectedSearch',
        props.selected === props.PopularSearchChips.name
          ? null
          : props.PopularSearchChips.name
      )
    "
    :class="[
      'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
      props.selected === props.PopularSearchChips.name
        ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
        : 'bg-gray-50 border-gray-300 hover:bg-orange-100 hover:text-orange-600 text-gray-600 hover:border-orange-200',
    ]"
  >
    {{ props.PopularSearchChips.texte }}
  </button>
</template>

<style scoped></style>
