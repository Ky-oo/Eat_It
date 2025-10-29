<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="text-center mb-9 items-center flex flex-col">
    <NuxtImg
      src="/logos/logo_entier.webp"
      :alt="t('logo.alt', 'Eat It')"
      class="h-32 sm:h-55 w-auto mb-4"
      format="webp"
      sizes="300px"
    />

    <p class="text-lg sm:text-xl text-gray-600">
      {{ t("homepage.description") }}
    </p>
  </div>
</template>

<style scoped></style>
