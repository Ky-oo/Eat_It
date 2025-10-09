<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-orange-600">Eat It</span>
          </NuxtLink>

          <div class="flex items-center space-x-4">
            <button
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Connexion
            </button>
            <button
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Inscription
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold text-orange-400 mb-4">Eat It</h3>
            <p class="text-gray-300">
              Votre application de livraison de nourriture préférée.
            </p>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Navigation</h4>
            <ul class="space-y-2 text-gray-300">
              <li>
                <NuxtLink to="/" class="hover:text-orange-400 transition-colors"
                  >Accueil</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/restaurants"
                  class="hover:text-orange-400 transition-colors"
                  >Restaurants</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/cart"
                  class="hover:text-orange-400 transition-colors"
                  >Panier</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-300">
              <li>
                <a href="#" class="hover:text-orange-400 transition-colors"
                  >Aide</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-orange-400 transition-colors"
                  >Contact</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-orange-400 transition-colors"
                  >CGU</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Suivez-nous</h4>
            <ul class="space-y-2 text-gray-300">
              <li>
                <a href="#" class="hover:text-orange-400 transition-colors"
                  >Facebook</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-orange-400 transition-colors"
                  >Twitter</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-orange-400 transition-colors"
                  >Instagram</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2025 Eat It. Tous droits réservés.</p>
        </div>
      </div>
    </footer>

    <!-- Floating Cart -->
    <FloatingCart />
  </div>
</template>

<script setup lang="ts">
// Template de page principale avec header, main content, footer et panier flottant
</script>
