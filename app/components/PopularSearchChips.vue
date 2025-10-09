<script setup lang="ts">
interface DataProp {
  id: number;
  name: string;
  texte: string;
}

const props = defineProps<{ data: DataProp; selected: string | null }>();
const emit = defineEmits<{
  selectedSearch: [selectedSearch: string | null];
}>();
console.log(props.selected);
</script>

<template>
  <button
    @click="
      emit(
        'selectedSearch',
        props.selected === props.data.name ? null : props.data.name
      )
    "
    :class="[
      'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
      props.selected === props.data.name
        ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
        : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 border-transparent hover:border-orange-200',
    ]"
  >
    {{ data.texte }}
  </button>
</template>

<style scoped></style>
