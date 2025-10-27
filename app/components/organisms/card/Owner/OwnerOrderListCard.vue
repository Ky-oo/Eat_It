<script setup lang="ts">
import type { Order } from "~/types/Order";

defineProps<{ order: Order }>();
</script>

<template>
  <div
    class="flex mt-6 space-y-4 items-center bg-gray-50 rounded-lg p-4 shadow-sm"
  >
    <img
      :src="order.user?.picture || '/default-profile.png'"
      alt="Photo de profil"
      class="w-14 h-14 rounded-full object-cover mr-4"
    />

    <div class="flex-1">
      <div class="font-semibold text-gray-800">
        {{
          order.user?.firstname + " " + order.user?.lastname ||
          "Utilisateur anonyme"
        }}
      </div>
      <div class="text-gray-500 text-sm">
        {{ new Date().toLocaleString("fr-FR") }}
      </div>
      <div class="text-gray-700 mt-1">
        Montant :
        <span class="font-bold">{{ order.total.toFixed(2) }} €</span>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <div
        v-for="item in order.items"
        :key="'item-' + item.id"
        class="bg-gray-100 p-4 rounded-lg ml-16 mt-2"
      >
        <div>
          <span class="font-medium text-gray-800">{{ item.name }}</span>
          <span class="text-gray-500 ml-2">x{{ item.quantity }}</span>
        </div>
        <div class="text-right">
          <span class="text-gray-600">{{ item.price.toFixed(2) }} €</span>
          <span class="ml-2 font-semibold text-green-600">
            Total: {{ (item.quantity * item.price).toFixed(2) }} €
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
