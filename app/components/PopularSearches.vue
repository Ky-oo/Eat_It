<script setup lang="ts">
const emit = defineEmits<{
  popularSearch: [popularSearch: string | null];
}>();

const selected = ref<string | null>(null);

const selectCategory = (category: string) => {
  if (category === selected.value) {
    selected.value = null;
    emit("popularSearch", null);
  }
  selected.value = category;
  emit("popularSearch", category);
};
</script>

<template>
  <div class="mt-4 flex flex-wrap gap-3">
    <span class="text-sm text-gray-500 font-medium py-2"
      >Recherches populaires :</span
    >

    <button
      @click="selectCategory('pizza')"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
        selected === 'pizza'
          ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
          : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 border-transparent hover:border-orange-200',
      ]"
    >
      🍕 Pizza
    </button>

    <button
      @click="selectCategory('burger')"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
        selected === 'burger'
          ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
          : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 border-transparent hover:border-orange-200',
      ]"
    >
      🍔 Burger
    </button>

    <button
      @click="selectCategory('sushi')"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
        selected === 'sushi'
          ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
          : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 border-transparent hover:border-orange-200',
      ]"
    >
      🍣 Sushi
    </button>

    <button
      @click="selectCategory('mexicain')"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
        selected === 'mexicain'
          ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
          : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 border-transparent hover:border-orange-200',
      ]"
    >
      🌮 Mexicain
    </button>

    <button
      @click="selectCategory('indien')"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
        selected === 'indien'
          ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
          : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 border-transparent hover:border-orange-200',
      ]"
    >
      🍛 Indien
    </button>

    <button
      @click="selectCategory('healthy')"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border',
        selected === 'healthy'
          ? 'bg-orange-100 text-orange-600 border-orange-200 shadow-md'
          : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 border-transparent hover:border-orange-200',
      ]"
    >
      🥗 Healthy
    </button>
  </div>
</template>

<style scoped></style>
