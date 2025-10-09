<script setup lang="ts">
import type { MenuItem } from "~~/modules/restaurant/types";
import { useCart } from "~/stores/Cart";

const cart = useCart();

const emit = defineEmits<{
  close: [];
}>();

const quantity = ref(1);

const closeModal = () => {
  quantity.value = 1;
  emit("close");
};

const addToCart = () => {
  if (props.item) {
    cart.addItem(props.item, quantity.value);
    closeModal();
  }
};

const props = defineProps<{
  item: MenuItem | null;
  isVisible: boolean;
}>();

// Rendre impossible le scroll quand la modal est ouvrte
watch(
  () => props.isVisible,
  (newValue) => {
    if (typeof document !== "undefined") {
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }
);

// Fermer la modal avec la touche Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.isVisible) {
      closeModal();
    }
  };
  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  });
});
</script>

<template>
  <Transition name="modal-overlay">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-opacity-60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <Transition name="modal-content">
        <div
          v-if="isVisible && item"
          class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="relative">
            <div class="h-64 w-full overflow-hidden rounded-t-2xl">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
                onerror="this.src='https://placehold.co/600x400/f3f4f6/9ca3af?text=Plat'"
              />
            </div>

            <button
              @click="closeModal"
              class="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 shadow-lg"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="p-8">
            <div class="flex items-start justify-between mb-6">
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ item.name }}
                </h2>
                <p class="text-gray-600 text-lg leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
              <div class="ml-6">
                <div class="text-3xl font-bold text-orange-600">
                  {{ item.price.toFixed(2) }}€
                </div>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Informations nutritionnelles
              </h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Calories estimées :</span>
                  <span class="font-medium">~350 kcal</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Temps de préparation :</span>
                  <span class="font-medium">15-20 min</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Allergènes :</span>
                  <span class="font-medium">Gluten, Œufs</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Épices :</span>
                  <span class="font-medium">🌶️ Doux</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-8">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
              >
                <div class="flex items-center space-x-6">
                  <span
                    class="text-lg font-medium text-gray-900 whitespace-nowrap"
                    >Quantité :</span
                  >
                  <div class="flex items-center space-x-4">
                    <button
                      @click="
                        if (quantity > 1) {
                          quantity--;
                        }
                      "
                      class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center font-bold text-xl"
                    >
                      <MinusIcon size="w-6 h-6" />
                    </button>
                    <span
                      class="font-bold text-2xl text-gray-900 w-16 text-center"
                    >
                      {{ quantity }}
                    </span>
                    <button
                      @click="quantity++"
                      class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center font-bold text-xl"
                    >
                      <PlusIcon size="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div class="flex items-center space-x-6">
                  <div class="text-right">
                    <div class="text-sm text-gray-600">Total</div>
                    <div class="text-3xl font-bold text-orange-600">
                      {{ (item.price * quantity).toFixed(2) }}€
                    </div>
                  </div>
                  <button
                    @click="addToCart"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-medium transition-colors duration-200 flex items-center text-lg whitespace-nowrap"
                  >
                    <svg
                      class="w-5 h-5 mr-3"
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
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Animations pour l'overlay */
.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}

/* Animations pour le contenu */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}
</style>
