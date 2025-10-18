<script setup lang="ts">
// Configuration de la page - nécessite l'authentification, rendu côté client
definePageMeta({
  middleware: "auth",
  ssr: false, // Rendu côté client avec middleware d'authentification
});

// Imports des stores et composables
import { useAuth } from "~/stores/Auth";
import { useCart } from "~/stores/Cart";

// Utilisation des stores et composables (useRouter auto-importé par Nuxt 3)
const authStore = useAuth();
const cart = useCart();
const router = useRouter();

// État local du composant
const isEditing = ref(false);
const isLoading = ref(false);

// Données utilisateur simulées (en réalité, elles viendraient du store auth)
const user = ref({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+33 6 12 34 56 78",
  address: "123 Rue de la Paix, 75001 Paris",
});

// Fonctions de gestion
const handleSave = async () => {
  isLoading.value = true;
  try {
    // Simulation de sauvegarde API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Ici on mettrait à jour le store auth avec les nouvelles données
    // authStore.updateUser(user.value);

    isEditing.value = false;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = () => {
  // Vider le panier lors de la déconnexion
  cart.clearCart();

  // Déconnecter l'utilisateur
  authStore.logout();

  // Rediriger vers l'accueil
  router.push("/");
};

const goToOrders = () => {
  router.push("/orders");
};

const goToCart = () => {
  router.push("/cart");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête de page -->
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
        <!-- Menu de navigation -->
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
                @click="goToOrders"
                class="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Mes commandes
              </button>
              <button
                @click="goToCart"
                class="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Mon panier ({{ cart.getTotalItems }})
              </button>
            </nav>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900">
                Informations personnelles
              </h2>
              <button
                v-if="!isEditing"
                @click="isEditing = true"
                class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Modifier
              </button>
            </div>

            <form @submit.prevent="handleSave" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    v-model="user.firstName"
                    :disabled="!isEditing"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    v-model="user.lastName"
                    :disabled="!isEditing"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  v-model="user.email"
                  :disabled="!isEditing"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  v-model="user.phone"
                  :disabled="!isEditing"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <textarea
                  v-model="user.address"
                  :disabled="!isEditing"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div v-if="isEditing" class="flex space-x-4">
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {{ isLoading ? "Sauvegarde..." : "Sauvegarder" }}
                </button>
                <button
                  type="button"
                  @click="isEditing = false"
                  class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>

          <!-- Statistiques de l'utilisateur -->
          <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Mes statistiques
            </h3>
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
        </div>
      </div>
    </div>
  </div>
</template>
