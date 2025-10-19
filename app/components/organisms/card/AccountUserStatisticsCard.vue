<script setup lang="ts">
import { useCart } from "~/stores/Cart";

const cart = useCart();
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Mes statistiques</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="text-center">
        <div class="text-3xl font-bold text-orange-600">27</div>
        <div class="text-sm text-gray-600">Commandes passées</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-orange-600">€342</div>
        <div class="text-sm text-gray-600">Total dépensé</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-orange-600">
          {{ cart.getTotalItems }}
        </div>
        <div class="text-sm text-gray-600">Articles dans le panier</div>
      </div>
    </div>
  </div>
</template>
