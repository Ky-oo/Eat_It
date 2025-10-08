<script setup lang="ts">
import FloatingCart from "~/components/FloatingCart.vue";
</script>

<template>
  <div class="bg-gray-50">
    <nav class="p-4 bg-orange-500">
      <NuxtLink to="/" class="font-bold px-4 text-lg text-white"
        >Eat It</NuxtLink
      >
    </nav>
    <main>
      <slot />
    </main>

    <FloatingCart />
  </div>
</template>

<style scoped></style>
