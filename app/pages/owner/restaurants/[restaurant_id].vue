<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import type { Restaurant } from "~/types/Restaurant";
import type { ApiResponse } from "~/types/Utils";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const route = useRoute();
const restaurantId = route.params.restaurant_id;

const activeTab = ref<"settings" | "menu" | "orders">("settings");

const restaurantResponse = ref<ApiResponse<Restaurant> | null>(null);
const error = ref<any>(null);

onMounted(async () => {
  try {
    const { data } = await useAsyncData(
      `owner-restaurant-${restaurantId}`,
      () => $fetch<ApiResponse<Restaurant>>(`/api/restaurants/${restaurantId}`),
      {
        server: true,
      }
    );
    restaurantResponse.value = data.value ?? null;
  } catch (err) {
    error.value = err;
  }
});

const restaurant = computed(() => restaurantResponse.value?.data);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("restaurant.notFound"),
  });
}

const setActiveTab = (tab: "settings" | "menu" | "orders") => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <button
          @click="$router.push('/owner')"
          class="flex items-center text-gray-600 cursor-pointer hover:text-gray-900 mb-4 transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {{ t("owner.backToRestaurants") }}
        </button>

        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              {{ restaurant?.name }}
            </h1>
            <p class="text-gray-600">{{ restaurant?.cuisine }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg mb-6">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button
              @click="setActiveTab('settings')"
              :class="[
                'flex-1 py-4 px-6 text-center cursor-pointer font-medium transition-colors',
                activeTab === 'settings'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900 hover:border-gray-300',
              ]"
            >
              <div class="flex items-center justify-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {{ t("owner.settingsTab") }}
              </div>
            </button>

            <button
              @click="setActiveTab('menu')"
              :class="[
                'flex-1 py-4 px-6 text-center cursor-pointer font-medium transition-colors',
                activeTab === 'menu'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900 hover:border-gray-300',
              ]"
            >
              <div class="flex items-center justify-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {{ t("owner.menuTab") }}
              </div>
            </button>

            <button
              @click="setActiveTab('orders')"
              :class="[
                'flex-1 py-4 px-6 text-center cursor-pointer font-medium transition-colors',
                activeTab === 'orders'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900 hover:border-gray-300',
              ]"
            >
              <div class="flex items-center justify-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
                {{ t("owner.ordersTab") }}
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div>
        <OwnerRestaurantSettingsCard
          v-if="activeTab === 'settings'"
          :restaurant="restaurant"
        />
        <OwnerRestaurantMenuCard
          v-else-if="activeTab === 'menu'"
          :restaurant="restaurant"
        />

        <OwnerRestaurantOrdersCard
          v-else-if="activeTab === 'orders'"
          :restaurant="restaurant"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
