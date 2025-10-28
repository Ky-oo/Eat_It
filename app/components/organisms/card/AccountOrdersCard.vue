<script setup lang="ts">
import type { Order } from "~/types/Order";
import type { ApiResponse } from "~/types/Utils";
import { useAuth } from "~/stores/Auth";
import { useI18n } from "vue-i18n";

const orders = ref<Order[]>([]);
const ordersLoading = ref(false);
const ordersError = ref<string | null>(null);
const authStore = useAuth();
const { t } = useI18n();

onMounted(async () => {
  await loadOrders();
});

const loadOrders = async () => {
  try {
    ordersLoading.value = true;
    ordersError.value = null;

    const response = await $fetch<ApiResponse<Order[]>>(
      `/api/orders/${authStore.getUser?.id}`
    );

    if (response && response.data) {
      orders.value = response.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  } catch (error: any) {
    console.error(t("orders.loadError"), error);
    ordersError.value = error.message || t("orders.loadErrorFallback");
  } finally {
    ordersLoading.value = false;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Livrée":
      return "bg-green-100 text-green-800";
    case "En cours":
      return "bg-blue-100 text-blue-800";
    case "Annulée":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t("account.orders") }}
      </h2>
      <button
        v-if="!ordersLoading"
        @click="loadOrders"
        class="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        {{ t("common.refresh") }}
      </button>
    </div>

    <Loader v-if="ordersLoading" />

    <div v-else-if="ordersError" class="text-center py-8">
      <div class="text-red-400 mb-4">
        <svg
          class="mx-auto h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">
        {{ t("common.errorLoading") }}
      </h3>
      <p class="text-gray-500 mb-4">{{ ordersError }}</p>
      <button
        @click="loadOrders"
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        {{ t("common.retry") }}
      </button>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-medium text-gray-900">
              {{ t("orders.orderNumber") }}{{ order.id }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ new Date(order.date).toLocaleDateString("fr-FR") }}
              <span v-if="order.restaurant"> - {{ order.restaurant }} </span>
            </p>
          </div>
          <div class="text-right">
            <div class="text-lg font-semibold text-gray-900">
              {{ order.total.toFixed(2) }}€
            </div>
            <span
              :class="[
                'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(order.status),
              ]"
            >
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="border-t pt-3" v-if="Array.isArray(order.items)">
          <h4 class="text-sm font-medium text-gray-700 mb-2">
            {{ t("orders.orderedItems") }}
          </h4>
          <ul class="space-y-1">
            <li
              v-for="item in order.items"
              :key="item.name"
              class="flex justify-between text-sm text-gray-600"
            >
              <span>{{ item.quantity }}x {{ item.name }}</span>
              <span>{{ item.price.toFixed(2) }}€</span>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="orders.length === 0" class="text-center py-8">
        <div class="text-gray-400 mb-4">
          <svg
            class="mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">
          {{ t("orders.none") }}
        </h3>
        <p class="text-gray-500">{{ t("orders.noOrdersSubtitle") }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
