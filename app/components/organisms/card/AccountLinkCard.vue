<script setup lang="ts">
import { useCart } from "~/stores/Cart";

const router = useRouter();
const cart = useCart();
</script>
<template>
  <div class="lg:col-span-1">
    <div class="bg-white rounded-xl shadow-lg p-6">
      <nav class="space-y-2">
        <a
          href="#profile"
          class="block px-4 py-2 text-gray-900 bg-orange-50 rounded-lg font-medium"
        >
          Informations personnelles
        </a>
        <button
          @click="router.push('/orders')"
          class="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Mes commandes
        </button>
        <button
          @click="router.push('/cart')"
          class="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Mon panier ({{ cart.getTotalItems }})
        </button>
      </nav>
    </div>
  </div>
</template>
