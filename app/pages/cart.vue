<script setup lang="ts">
import { useCart } from "~/stores/Cart";

definePageMeta({
  middleware: "auth",
});

const cart = useCart();
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mon Panier</h1>
        <button
          @click="$router.back()"
          class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour
        </button>
      </div>

      <div v-if="cart.getItems.length === 0" class="text-center py-12">
        <svg
          class="w-24 h-24 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 class="text-2xl font-semibold text-gray-500 mb-2">
          Votre panier est vide
        </h2>
        <p class="text-gray-400 mb-6">
          Ajoutez des plats délicieux à votre panier !
        </p>
        <NuxtLink
          to="/"
          class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Voir les restaurants
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-xl font-semibold text-gray-900">
                Articles ({{ cart.getItems.length }})
              </h2>
            </div>

            <div class="divide-y divide-gray-100">
              <div
                v-for="(cartItem, index) in cart.getItems"
                :key="`${cartItem.item.id}-${index}`"
                class="p-6 flex items-center space-x-4"
              >
                <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    :src="
                      cartItem.item.image ||
                      'https://via.placeholder.com/150x150/f3f4f6/9ca3af?text=Plat'
                    "
                    :alt="cartItem.item.name"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="font-semibold text-gray-900">
                      {{ cartItem.item.name }}
                    </h3>
                    <span
                      class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-nowrap"
                    >
                      Quantité: {{ cartItem.quantity }}
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mt-1">
                    {{ cartItem.item.description }}
                  </p>
                  <div class="flex items-center justify-between mt-2">
                    <p class="text-gray-500 text-sm">
                      {{ cartItem.item.price.toFixed(2) }}€ ×
                      {{ cartItem.quantity }}
                    </p>
                    <p class="text-orange-600 font-bold text-lg">
                      {{
                        (cartItem.item.price * cartItem.quantity).toFixed(2)
                      }}€
                    </p>
                  </div>
                </div>

                <div class="flex items-center space-x-2">
                  <button
                    @click="cart.removeOneItem(cartItem.item.id)"
                    class="bg-orange-100 hover:bg-orange-200 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
                  >
                    <MinusIcon />
                  </button>

                  <span class="w-8 text-center font-semibold">
                    {{ cartItem.quantity }}
                  </span>

                  <button
                    @click="cart.addItem(cartItem.item, 1)"
                    class="bg-orange-100 hover:bg-orange-200 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
                  >
                    <PlusIcon />
                  </button>
                </div>

                <button
                  @click="cart.removeItem(cartItem.item.id)"
                  class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Supprimer complètement"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Résumé</h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Sous-total ({{ cart.getTotalItems }} articles)</span>
                <span>{{ cart.getTotalPrice.toFixed(2) }}€</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Frais de livraison</span>
                <span>3.50€</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div
                  class="flex justify-between text-lg font-bold text-gray-900"
                >
                  <span>Total</span>
                  <span>{{ (cart.getTotalPrice + 3.5).toFixed(2) }}€</span>
                </div>
              </div>
            </div>

            <button
              class="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 mb-3"
            >
              Passer la commande
            </button>

            <button
              @click="navigateTo('/')"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
