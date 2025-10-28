<script setup lang="ts">
import { useCart } from "~/stores/Cart";
import { useI18n } from "vue-i18n";

const cart = useCart();
const { t } = useI18n();
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">
      {{ t("account.statistics") }}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="text-center">
        <div class="text-3xl font-bold text-orange-600">27</div>
        <div class="text-sm text-gray-600">{{ t("account.ordersCount") }}</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-orange-600">€342</div>
        <div class="text-sm text-gray-600">{{ t("account.totalSpent") }}</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-orange-600">
          {{ cart.getTotalItems }}
        </div>
        <div class="text-sm text-gray-600">{{ t("account.cartItems") }}</div>
      </div>
    </div>
  </div>
</template>
