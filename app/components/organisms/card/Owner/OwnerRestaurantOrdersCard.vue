<script setup lang="ts">
import type { Order } from "~/types/Order";
import type { Restaurant } from "~/types/Restaurant";
import type { ApiResponse } from "~/types/Utils";
import { useI18n } from "vue-i18n";

const props = defineProps<{ restaurant: Restaurant | undefined }>();
const { t } = useI18n();
const { data, pending, error } = await useAsyncData<ApiResponse<Order[]>>(
  () => $fetch(`/api/orders/restaurant/${props.restaurant?.id}`),
  { watch: [() => props.restaurant?.id], immediate: !!props.restaurant?.id }
);

const orders = computed(() => data.value?.data);
const loading = computed(() => pending.value);
if (error.value) alert(error.value);
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
