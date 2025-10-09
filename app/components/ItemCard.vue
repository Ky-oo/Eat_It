<script setup lang="ts">
import type { MenuItem } from "~~/modules/restaurant/types";
import { useCart } from "~/stores/Cart";

const cart = useCart();

defineProps<{
  item: MenuItem | undefined;
}>();

defineEmits<{
  showDetails: [item: MenuItem];
}>();

const quantity = ref(1);
</script>

<template>
  <div
    class="flex items-center bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
  >
    <div class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mr-6">
      <img
        :src="item?.image"
        :alt="item?.name"
        class="w-full h-full object-cover"
        onerror="this.src='https://placehold.co/150x150/f3f4f6/9ca3af?text=Plat'"
      />
    </div>

    <div class="flex-1">
      <div class="flex item?s-start justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{ item?.name }}
          </h3>
          <p class="text-gray-600 mb-3 leading-relaxed">
            {{ item?.description }}
          </p>
        </div>
        <div class="text-right ml-4">
          <p class="text-2xl font-bold text-orange-600">
            {{ item?.price.toFixed(2) }}€
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center space-x-3">
          <button
            @click="if (quantity > 1) quantity--;"
            class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center font-bold"
          >
            <MinusIcon />
          </button>
          <span class="font-medium text-gray-900 w-8 text-center">
            {{ quantity }}
          </span>
          <button
            @click="quantity++"
            class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center font-bold"
          >
            <PlusIcon />
          </button>
        </div>

        <div class="flex space-x-3">
          <button
            @click="item && $emit('showDetails', item)"
            :disabled="!item"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Détails
          </button>
          <button
            @click="item && cart.addItem(item, quantity)"
            :disabled="!item"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
          >
            <svg
              class="w-4 h-4 mr-2"
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
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
