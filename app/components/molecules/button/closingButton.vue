<script setup lang="ts">
defineEmits<{
  close: [];
}>();
</script>

<template>
  <button
    @click="$emit('close')"
    class="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-700 focus:ring z-10 bg-white rounded-full p-1 shadow-sm"
    aria-label="Fermer les publicités"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
