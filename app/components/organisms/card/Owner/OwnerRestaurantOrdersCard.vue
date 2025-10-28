<script setup lang="ts">
import type { Order } from "~/types/Order";
import type { Restaurant } from "~/types/Restaurant";
import type { ApiResponse } from "~/types/Utils";
import { useI18n } from "vue-i18n";

const props = defineProps<{ restaurant: Restaurant | undefined }>();
const { t } = useI18n();
const orders = ref<Order[] | undefined>();
const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  try {
    const OrderResponse = await $fetch<ApiResponse<Order[]>>(
      `/api/orders/restaurant/${props.restaurant?.id}`
    );

    orders.value = OrderResponse.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <loader v-if="loading" />
    <div v-else-if="orders?.length === 0">
      {{ t("orders.none") }}
    </div>
    <div v-else>
      <div>
        <h2 class="text-xl font-semibold text-gray-900">
          {{ t("orders.title") }}
        </h2>
        <p class="text-gray-600 text-sm mt-1">
          {{ orders?.length }} {{ t("orders.count") }}
        </p>
      </div>

      <OwnerOrderListCard
        v-for="order in orders ?? []"
        :key="order.id"
        :order="order"
      />
    </div>
  </div>
</template>

<style scoped></style>
