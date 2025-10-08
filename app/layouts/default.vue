<template>
  <div class="mx-auto">
    <nav class="py-4 bg-orange-500 px-4">
      <NuxtLink to="/" class="font-bold px-4 text-lg">Eat It</NuxtLink>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
