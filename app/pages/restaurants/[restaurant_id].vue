<script setup lang="ts">
import type { Restaurant } from "~~/modules/restaurant/types";

// Récupération du paramètre d'URL
const route = useRoute();
const restaurantId = route.params.restaurant_id;

// Récupération des données du restaurant
const { data: restaurant, error } = await useAsyncData(
  `restaurant-${restaurantId}`,
  () => $fetch<Restaurant>(`/api/restaurants/${restaurantId}`)
);

// Gestion d'erreur 404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Restaurant non trouvé",
  });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section du Restaurant -->
    <div class="relative h-96 overflow-hidden">
      <!-- Image de fond -->
      <img
        :src="
          restaurant?.image ||
          'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/48a49653c8716457eb0b2f7eb3c7d74c/Derivates/5f24139ace17917d2acf45266604bc0aa0a43a08.jpg'
        "
        :alt="restaurant?.name"
        class="w-full h-full object-cover"
        onerror="this.src='https://via.placeholder.com/1200x400/f3f4f6/9ca3af?text=Restaurant'"
      />

      <!-- Overlay gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      ></div>

      <!-- Bouton retour -->
      <button
        @click="$router.back()"
        class="absolute top-6 left-6 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>

    <!-- Informations du Restaurant -->
    <div class="relative -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Carte principale du restaurant -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div
          class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
        >
          <!-- Informations principales -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <span
                class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ restaurant?.cuisine }}
              </span>
              <div
                class="flex items-center bg-yellow-50 px-3 py-1 rounded-full"
              >
                <svg
                  class="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="text-yellow-600 font-medium text-sm">{{
                  restaurant?.rating
                }}</span>
              </div>
            </div>

            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              {{ restaurant?.name }}
            </h1>
            <p class="text-gray-600 text-lg mb-6 leading-relaxed">
              {{ restaurant?.description }}
            </p>

            <!-- Informations de livraison -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                <svg
                  class="w-8 h-8 text-orange-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Temps de livraison</p>
                  <p class="font-semibold text-gray-900">
                    {{ restaurant?.deliveryTime }}
                  </p>
                </div>
              </div>

              <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                <svg
                  class="w-8 h-8 text-orange-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Distance</p>
                  <p class="font-semibold text-gray-900">
                    {{ restaurant?.distance }}m
                  </p>
                </div>
              </div>

              <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                <svg
                  class="w-8 h-8 text-orange-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Frais de livraison</p>
                  <p class="font-semibold text-gray-900">
                    {{ restaurant?.deliveryFee }}€
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Section -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Notre Menu</h2>
          <div class="flex items-center text-gray-500">
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
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>{{ restaurant?.menu?.length }} plats disponibles</span>
          </div>
        </div>

        <!-- Liste des plats -->
        <div class="grid gap-6">
          <div
            v-for="item in restaurant?.menu"
            :key="item.id"
            class="flex items-center bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
          >
            <!-- Image du plat -->
            <div
              class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mr-6"
            >
              <img
                :src="
                  item.image ||
                  'https://via.placeholder.com/150x150/f3f4f6/9ca3af?text=Plat'
                "
                :alt="item.name"
                class="w-full h-full object-cover"
                onerror="this.src='https://via.placeholder.com/150x150/f3f4f6/9ca3af?text=Plat'"
              />
            </div>

            <!-- Informations du plat -->
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">
                    {{ item.name }}
                  </h3>
                  <p class="text-gray-600 mb-3 leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>
                <div class="text-right ml-4">
                  <p class="text-2xl font-bold text-orange-600">
                    {{ item.price.toFixed(2) }}€
                  </p>
                </div>
              </div>

              <!-- Bouton ajouter au panier -->
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center space-x-3">
                  <!-- Contrôles de quantité -->
                  <button
                    class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span class="font-medium text-gray-900 w-8 text-center"
                    >1</span
                  >
                  <button
                    class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>

                <button
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
      </div>

      <!-- Panier flottant (optionnel) -->
      <div
        class="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl cursor-pointer transition-all duration-200 hover:scale-105"
      >
        <div class="relative">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <!-- Badge de notification -->
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
            >0</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animations personnalisées si nécessaire */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
