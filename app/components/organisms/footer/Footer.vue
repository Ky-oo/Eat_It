<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer class="bg-gray-900 text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="flex flex-col items-center text-center">
          <NuxtImg
            src="/logos/logo_texte.webp"
            alt="Logo Eat It"
            class="h-40 w-auto"
            format="webp"
            sizes="200px"
          />
          <h3 class="text-xl font-bold text-orange-400 mb-4"></h3>
          <p class="text-gray-300">
            {{ t("footer.slogan") }}
          </p>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ t("footer.navigation") }}</h4>
          <ul class="space-y-2 text-gray-300">
            <li>
              <NuxtLink
                to="/"
                class="hover:text-orange-400 transition-colors"
                >{{ t("navbar.home") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="hover:text-orange-400 transition-colors"
                >{{ t("navbar.restaurants") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="hover:text-orange-400 transition-colors"
                >{{ t("navbar.cart") }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ t("footer.support") }}</h4>
          <ul class="space-y-2 text-gray-300">
            <li>
              <a href="#" class="hover:text-orange-400 transition-colors">{{
                t("footer.help")
              }}</a>
            </li>
            <li>
              <a href="#" class="hover:text-orange-400 transition-colors">{{
                t("footer.contact")
              }}</a>
            </li>
            <li>
              <a href="#" class="hover:text-orange-400 transition-colors">{{
                t("footer.cgu")
              }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ t("footer.followUs") }}</h4>
          <ul class="space-y-2 text-gray-300">
            <li>
              <a
                href="https://www.facebook.com/CFPPA"
                target="_blank"
                class="hover:text-orange-400 transition-colors"
                >{{ t("footer.facebook") }}</a
              >
            </li>
            <li>
              <a
                href="https://x.com/FFLose"
                target="_blank"
                class="hover:text-orange-400 transition-colors"
                >{{ t("footer.twitter") }}</a
              >
            </li>
            <li>
              <a
                href="https://www.instagram.com/tonton_etchebest_"
                target="_blank"
                class="hover:text-orange-400 transition-colors"
                >{{ t("footer.instagram") }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>{{ t("footer.copyright") }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
