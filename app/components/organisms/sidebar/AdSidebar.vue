<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();

const pubContent = ref([
  {
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop&crop=center",
    alt: "Delicious pizza advertisement",
    title: "Delicious Pizza Deals!",
  },
  {
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop&crop=center",
    alt: "Fresh sushi advertisement",
    title: "Fresh Sushi Offers!",
  },
  {
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop&crop=center",
    alt: "Burger and fries advertisement",
    title: "Burger & Fries Special!",
  },
]);
</script>

<template>
  <aside
    class="hidden md:block w-64 bg-gray-100 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto"
  >
    <ClosingButton @close="emit('close')" />
    <Pub :pub-content="pubContent" />
  </aside>
</template>
