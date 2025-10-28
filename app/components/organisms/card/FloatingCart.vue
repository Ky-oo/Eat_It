<script setup lang="ts">
import { useCart } from "~/stores/Cart";
import { useI18n } from "vue-i18n";

const cart = useCart();
const { t } = useI18n();
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-8 scale-75"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-8 scale-75"
  >
    <div
      v-if="cart.getItems.length > 0"
      class="fixed bottom-6 right-6 z-50 group"
    >
      <div
        @click="navigateTo('/cart')"
        class="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl cursor-pointer transition-all duration-200 hover:scale-105 relative"
      >
        <svg
          class="w-6 h-6 group-hover:animate-pulse"
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

        <span
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce"
        >
          {{ cart.getTotalItems }}
        </span>
      </div>

      <div
        class="absolute bottom-full right-0 mb-4 bg-white rounded-xl shadow-2xl border border-gray-100 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
      >
        <div class="p-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900">{{ t("cart.title") }}</h3>
            <span class="text-sm text-gray-500"
              >{{ cart.getTotalItems }}
              {{
                cart.getTotalItems > 1 ? t("cart.itemsPlural") : t("cart.item")
              }}</span
            >
          </div>
        </div>

        <div class="p-4 max-h-60 overflow-y-auto">
          <div
            v-for="(cartItem, index) in cart.getItems.slice(0, 3)"
            :key="`${cartItem.item.id}-${index}`"
            class="flex items-center justify-between py-2"
            :class="{
              'border-b border-gray-100':
                index < Math.min(cart.getItems.length, 3) - 1,
            }"
          >
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="font-medium text-gray-900 text-sm">
                  {{ cartItem.item.name }}
                </p>
                <span
                  class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                >
                  x{{ cartItem.quantity }}
                </span>
              </div>
              <p class="text-orange-600 font-semibold text-sm">
                {{ (cartItem.item.price * cartItem.quantity).toFixed(2) }}€
              </p>
            </div>
          </div>

          <div
            v-if="cart.getItems.length > 3"
            class="text-center py-2 text-sm text-gray-500"
          >
            ... et {{ cart.getItems.length - 3 }} autre{{
              cart.getItems.length - 3 > 1 ? "s" : ""
            }}
            article{{ cart.getItems.length - 3 > 1 ? "s" : "" }}
          </div>
        </div>

        <div class="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <div class="flex items-center justify-between mb-3">
            <span class="font-semibold text-gray-900"
              >{{ t("cart.summary") }}:</span
            >
            <span class="font-bold text-orange-600 text-lg">
              {{ cart.getTotalPrice.toFixed(2) }}€
            </span>
          </div>
          <button
            @click="navigateTo('/cart')"
            class="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {{ t("cart.viewCart") }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
