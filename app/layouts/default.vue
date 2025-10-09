<script setup lang="ts">
import FloatingCart from "~/components/FloatingCart.vue";
</script>

<template>
  <div class="bg-gray-50">
    <nav class="px-4 bg-orange-500">
      <NuxtLink to="/" class="px-4">
        <img src="/logos/logo_white.png" alt="Logo Eat It" class="h-7 w-auto" />
      </NuxtLink>
    </nav>
    <main>
      <slot />
    </main>

    <FloatingCart />
  </div>
</template>

<style scoped></style>
