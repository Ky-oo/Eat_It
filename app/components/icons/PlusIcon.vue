<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: string;
  }>(),
  {
    size: "w-4 h-4",
  }
);
</script>

<template>
  <svg :class="size" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4v16m8-8H4"
    />
  </svg>
</template>
