<script setup lang="ts"></script>

<template>
  <nav class="px-4 py-3 bg-orange-500 flex items-center justify-between">
    <NuxtLink to="/" class="px-4">
      <img src="/logos/logo_white.png" alt="Logo Eat It" class="h-7 w-auto" />
    </NuxtLink>

    <div class="flex items-center space-x-4">
      <NuxtLink
        to="/login"
        class="bg-orange-50 text-orange-500 hover:text-orange-700 px-4 py-2 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200 cursor-pointer"
      >
        Connexion
      </NuxtLink>
      <NuxtLink
        to="/register"
        class="text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
      >
        Inscription
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped></style>
