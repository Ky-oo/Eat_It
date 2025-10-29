<script setup lang="ts">
import type { MenuItem } from "~/types/Restaurant";
import { useCart } from "~/stores/Cart";
import { useAuth } from "~/stores/Auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const cart = useCart();
const authStore = useAuth();

const props = defineProps<{
  item: MenuItem | undefined;
}>();

defineEmits<{
  showDetails: [item: MenuItem];
}>();

const quantity = ref(1);

const handleAddToCart = () => {
  if (!props.item) return;

  if (!authStore.isLogged) {
    navigateTo("/login");
    return;
  }

  cart.addItem(props.item, quantity.value);

  quantity.value = 1;
};
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center bg-gray-50 rounded-xl p-4 sm:p-6 hover:bg-gray-100 transition-colors duration-200"
  >
    <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
      <NuxtImg
        :src="item?.image"
        :alt="item?.name"
        class="w-full h-full object-cover"
        format="webp"
        sizes="100px"
        onerror="this.src='https://placehold.co/150x150/f3f4f6/9ca3af?text=Plat'"
      />
    </div>

    <div class="flex-1">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{ item?.name }}
          </h3>
          <p class="text-gray-600 mb-3 leading-relaxed">
            {{ item?.description }}
          </p>
        </div>
        <div class="text-left sm:text-right sm:ml-4 mt-2 sm:mt-0">
          <p class="text-2xl font-bold text-orange-600">
            {{ item?.price.toFixed(2) }}€
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-4 sm:space-y-0">
        <QuantitySelector
          v-if="authStore.isLogged"
          :quantity="quantity"
          @increase="quantity++"
          @decrease="
            if (quantity > 1) {
              quantity--;
            }
          "
        />

        <div class="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            @click="item && $emit('showDetails', item)"
            :disabled="!item"
            class="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
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
            {{ t("common.details") }}
          </button>
          <button
            @click="handleAddToCart"
            :disabled="!item"
            class="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
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
            {{
              authStore.isLogged ? t("cart.addToCart") : t("cart.loginToOrder")
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
