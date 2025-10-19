<script setup lang="ts">
definePageMeta({
  //middleware: "auth",
  ssr: false,
});

import { useAuth } from "~/stores/Auth";
import { useCart } from "~/stores/Cart";

const authStore = useAuth();
const cart = useCart();
const router = useRouter();

const isEditing = ref(false);
const isLoading = ref(false);

const handleLogout = () => {
  cart.clearCart();
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mon Compte</h1>
        <button
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Se déconnecter
        </button>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <AccountLinkCard />

        <div class="lg:col-span-2">
          <AccountUserDetailsCard />
          <AccountUserStatisticsCard />
        </div>
      </div>
    </div>
  </div>
</template>
