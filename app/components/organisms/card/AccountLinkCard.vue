<script setup lang="ts">
import { useCart } from "~/stores/Cart";
import { useI18n } from "vue-i18n";

const cart = useCart();
const { t } = useI18n();
</script>
<template>
  <div class="lg:col-span-1">
    <div class="bg-white rounded-xl shadow-lg p-6">
      <nav class="space-y-2">
        <a
          href="#profile"
          class="block px-4 py-2 text-gray-900 bg-orange-50 rounded-lg font-medium"
        >
          {{ t("account.profile") }}
        </a>
        <button
          @click="navigateTo('/orders')"
          class="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {{ t("account.orders") }}
        </button>
        <button
          @click="navigateTo('/cart')"
          class="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {{ t("account.cart") }} ({{ cart.getTotalItems }})
        </button>
      </nav>
    </div>
  </div>
</template>
