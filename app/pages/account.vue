<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Mon Compte - Eat It",
  description:
    "Découvrez les meilleurs restaurants loin de chez vous et faites-vous livrer le plus rapidement possible (on fait comme on peut) avec Eat It.",
  ogTitle: "Eat It - Mon Compte",
  ogDescription:
    "Parcourez notre catalogue de restaurants et commandez vos plats préférés en ligne.",
  ogImage: "/logos/logo_entier.png",
  ogUrl: "https://kylian-patry.duckdns.org/eat-it/account",
});

import { useAuth } from "~/stores/Auth";
import { useCart } from "~/stores/Cart";

const authStore = useAuth();
const cart = useCart();

const activeTab = ref("profile");

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const handleLogout = () => {
  cart.clearCart();
  authStore.logout();
  navigateTo("/");
};

const goToCart = () => {
  navigateTo("/cart");
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <nav class="space-y-2">
            <button
              @click="setActiveTab('profile')"
              :class="[
                'block w-full text-left px-4 py-2 cursor-pointer rounded-lg font-medium transition-colors',
                activeTab === 'profile'
                  ? 'text-gray-900 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
              ]"
            >
              Informations personnelles
            </button>
            <button
              @click="setActiveTab('orders')"
              :class="[
                'block w-full text-left px-4 cursor-pointer py-2 rounded-lg font-medium transition-colors',
                activeTab === 'orders'
                  ? 'text-gray-900 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
              ]"
            >
              Mes commandes
            </button>
            <button
              @click="goToCart"
              class="block w-full cursor-pointer text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Mon panier ({{ cart.getTotalItems }})
            </button>
          </nav>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div v-if="activeTab === 'profile'">
          <AccountUserDetailsCard />
          <AccountUserStatisticsCard />
        </div>

        <div v-else-if="activeTab === 'orders'" class="space-y-6">
          <AccountOrdersCard />
        </div>
      </div>
    </div>
  </div>
</template>
