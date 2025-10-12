<script setup lang="ts"></script>

<template>
  <nav class="px-4 py-3 bg-orange-500 flex items-center justify-between">
    <NuxtLink to="/" class="inline-block">
      <img
        src="/logos/logo.png"
        alt="Eat It Logo"
        class="mx-auto h-12 w-auto bg-orange-50 px-6 py-3 rounded-2xl shadow-lg"
      />
    </NuxtLink>

    <div class="flex items-center space-x-4">
      <NuxtLink
        to="/login"
        class="bg-orange-50 text-orange-500 hover:text-orange-50 px-4 py-2 hover:border rounded-2xl font-medium hover:bg-orange-500 transition-colors duration-200 cursor-pointer"
      >
        Connexion
      </NuxtLink>
      <NuxtLink
        to="/register"
        class="text-white px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
      >
        Inscription
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped></style>
