<script setup lang="ts">
import FloatingCart from "~/components/FloatingCart.vue";
</script>

<template>
  <div class="bg-orange-50">
    <nav class="px-4 py-3 bg-orange-500 flex items-center justify-between">
      <NuxtLink to="/" class="px-4">
        <img src="/logos/logo_white.png" alt="Logo Eat It" class="h-7 w-auto" />
      </NuxtLink>

      <div class="flex items-center space-x-4">
        <button
          class="bg-white text-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
        >
          Connexion
        </button>
        <button
          class="text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
        >
          Inscription
        </button>
      </div>
    </nav>
    <main>
      <slot />
    </main>

    <FloatingCart />
  </div>
</template>

<style scoped></style>
