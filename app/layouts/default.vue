<script setup lang="ts"></script>

<template>
  <div class="bg-orange-50">
    <Navbar />
    <main>
      <slot />
    </main>

    <FloatingCart />
    <Footer />
  </div>
</template>

<style scoped></style>
