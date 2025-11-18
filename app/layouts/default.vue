<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

const isSidebarVisible = ref(true);
</script>

<template>
  <SpeedInsights />
  <div class="bg-orange-50 min-h-screen">
    <Navbar />
    <div class="flex">
      <AdSidebar v-if="isSidebarVisible" @close="isSidebarVisible = false" />
      <main class="flex-1">
        <slot />
      </main>
    </div>
    <FloatingCart />
    <Footer />
  </div>
</template>

<style scoped></style>
