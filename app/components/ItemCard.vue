<script setup lang="ts">
import type { MenuItem } from "~~/modules/restaurant/types";
import { useCart } from "~/stores/Cart";
const cart = useCart();
defineProps<{
  item: MenuItem | undefined;
}>();

const quantity = ref(1);
</script>

<template>
  <div
    class="flex item?s-center bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
  >
    <div class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mr-6">
      <img
        :src="'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/48a49653c8716457eb0b2f7eb3c7d74c/Derivates/5f24139ace17917d2acf45266604bc0aa0a43a08.jpg'"
        :alt="item?.name"
        class="w-full h-full object-cover"
        onerror="this.src='https://via.placeholder.com/150x150/f3f4f6/9ca3af?text=Plat'"
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

      <div class="flex item?s-center justify-between mt-4">
        <div class="flex item?s-center space-x-3">
          <button
            @click="if (quantity > 1) quantity--;"
            class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex item?s-center justify-center font-bold"
          >
            -
          </button>
          <span class="font-medium text-gray-900 w-8 text-center">
            {{ quantity }}
          </span>
          <button
            @click="quantity++"
            class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex item?s-center justify-center font-bold"
          >
            +
          </button>
        </div>

        <button
          @click="item && cart.addItem(item, quantity)"
          :disabled="!item"
          class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex item?s-center"
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
</template>

<style scoped></style>
