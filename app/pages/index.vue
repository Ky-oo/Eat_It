<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { Restaurant } from "~/types/Restaurant";
import type { ApiResponse } from "~/types/Utils";

const { t } = useI18n();

useSeoMeta({
  title: t("homepage.pageTitle"),
  description: t("homepage.description"),
  ogTitle: "Eat It",
  ogDescription: t("homepage.ogDescription"),
  ogImage: "/logos/logo_entier.png",
  ogUrl: "https://kylian-patry.duckdns.org/eat-it/",
});

const restaurantsResponse = ref<Restaurant[] | null>(null);
const error = ref<any>(null);

onMounted(async () => {
  try {
    const response = await useAsyncData("homepage-restaurants", () =>
      $fetch<ApiResponse<Restaurant[]>>("/api/restaurants")
    );

    restaurantsResponse.value = response.data.value?.data ?? [];
  } catch (error) {
    alert(error);
  }
});

const restaurants = computed(() => restaurantsResponse.value || []);

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: t("common.errorLoadingRestaurants"),
  });
}
</script>

<template>
  <div class="min-h-screen py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
    <PageTitle />
    <RestaurantGrid :restaurants="restaurants" />
  </div>
</template>

<style scoped></style>
