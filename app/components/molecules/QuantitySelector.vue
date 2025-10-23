<template>
  <div class="flex items-center gap-2">
    <button
      @click="decrease"
      :disabled="quantity <= 0"
      class="w-6 h-6 rounded-full cursor-pointer bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <MinusIcon size="w-3 h-3" />
    </button>

    <span class="min-w-[24px] text-center text-sm font-medium">{{
      quantity
    }}</span>

    <button
      @click="increase"
      class="w-6 h-6 rounded-full cursor-pointer bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
    >
      <PlusIcon size="w-3 h-3" />
    </button>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from "~/components/atoms/icons/PlusIcon.vue";
import MinusIcon from "~/components/atoms/icons/MinusIcon.vue";

interface Props {
  quantity: number;
}

interface Emits {
  increase: [];
  decrease: [];
}

defineProps<Props>();

const increase = () => {
  emit("increase");
};

const decrease = () => {
  emit("decrease");
};

const emit = defineEmits<Emits>();
</script>
