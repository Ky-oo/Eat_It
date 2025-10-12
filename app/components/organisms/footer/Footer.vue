<script setup lang="ts"></script>

<template>
  <footer class="bg-gray-900 text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="flex flex-col items-center text-center">
          <img
            src="/logos/logo_texte.png"
            alt="Logo Eat It"
            class="h-40 w-auto"
          />
          <h3 class="text-xl font-bold text-orange-400 mb-4"></h3>
          <p class="text-gray-300">
            Votre application de livraison <br />
            préférée.
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

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 Eat It. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
