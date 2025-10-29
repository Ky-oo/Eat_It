<script setup lang="ts">
import { useAuth } from "../../../stores/Auth";
import { useI18n } from "vue-i18n";
const authStore = useAuth();
const { t, locale, setLocale } = useI18n();

const isDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const changeLocale = (newLocale: "en" | "fr") => {
  setLocale(newLocale);
  isDropdownOpen.value = false;
};
</script>

<template>
  <nav
    @click="isDropdownOpen = false; isMobileMenuOpen = false"
    class="px-4 py-3 bg-orange-500 flex items-center justify-between relative"
  >
    <NuxtLink to="/" class="inline-block">
      <NuxtImg
        src="/logos/logo.webp"
        alt="Eat It Logo"
        class="mx-auto h-12 w-auto bg-orange-50 px-6 py-3 rounded-2xl shadow-lg"
        format="webp"
        sizes="50px"
      />
    </NuxtLink>

    <div class="flex items-center space-x-4">
      <div class="relative ml-4">
        <button
          @click.stop="toggleDropdown"
          class="text-white hover:text-orange-200 cursor-pointer transition-colors text-xl"
        >
          {{ locale === "fr" ? "🇫🇷" : "🇬🇧" }}
        </button>
        <div
          v-if="isDropdownOpen"
          class="absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          <button
            @click.stop="changeLocale('fr')"
            class="flex items-center cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            🇫🇷
          </button>
          <button
            @click.stop="changeLocale('en')"
            class="flex items-center cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            🇬🇧
          </button>
        </div>
      </div>

      <!-- Desktop Menu -->
      <div v-if="!authStore.checkIfLogged" class="hidden md:flex gap-2">
        <NuxtLink
          to="/login"
          class="bg-orange-50 text-orange-500 hover:text-orange-50 px-4 py-2 hover:border rounded-2xl font-medium hover:bg-orange-500 transition-colors duration-200 cursor-pointer"
        >
          {{ t("navbar.login") }}
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="text-white px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
        >
          {{ t("navbar.register") }}
        </NuxtLink>
      </div>
      <div v-else class="hidden md:flex items-center space-x-3">
        <NuxtLink
          v-if="authStore.user?.roles.includes('backoffice')"
          to="/backoffice"
          class="flex items-center bg-orange-50 text-orange-500 px-4 py-2 rounded-2xl font-medium border border-orange-300 hover:bg-orange-500 hover:text-orange-50 transition-colors duration-200 cursor-pointer shadow"
        >
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
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          {{ t("backoffice.backoffice") || "Backoffice" }}
        </NuxtLink>
        <NuxtLink
          v-if="authStore.user?.roles.includes('owner')"
          to="/owner"
          class="flex items-center bg-orange-50 text-orange-500 px-4 py-2 rounded-2xl font-medium border border-orange-300 hover:bg-orange-500 hover:text-orange-50 transition-colors duration-200 cursor-pointer shadow"
        >
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
              d="M8 17v-6a4 4 0 018 0v6M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
            />
          </svg>
          {{ t("owner.title") }}
        </NuxtLink>
        <NuxtLink
          to="/account"
          class="flex items-center text-orange-500 bg-orange-50 px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-500 hover:text-orange-50 transition-colors duration-200 cursor-pointer"
        >
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {{ t("navbar.account") }}
        </NuxtLink>
        <button
          @click="authStore.logout"
          class="flex items-center text-white px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
        >
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="hidden sm:inline">{{ t("navbar.logout") }}</span>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click.stop="toggleMobileMenu"
        class="md:hidden text-white hover:text-orange-200 cursor-pointer transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="absolute top-full left-0 right-0 bg-orange-500 shadow-lg md:hidden z-40"
    >
      <div v-if="!authStore.checkIfLogged" class="flex flex-col space-y-2 p-4">
        <NuxtLink
          to="/login"
          @click="isMobileMenuOpen = false"
          class="bg-orange-50 text-orange-500 hover:text-orange-50 px-4 py-2 hover:border rounded-2xl font-medium hover:bg-orange-500 transition-colors duration-200 cursor-pointer text-center"
        >
          {{ t("navbar.login") }}
        </NuxtLink>
        <NuxtLink
          to="/register"
          @click="isMobileMenuOpen = false"
          class="text-white px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer text-center"
        >
          {{ t("navbar.register") }}
        </NuxtLink>
      </div>
      <div v-else class="flex flex-col space-y-2 p-4">
        <NuxtLink
          v-if="authStore.user?.roles.includes('backoffice')"
          to="/backoffice"
          @click="isMobileMenuOpen = false"
          class="flex items-center justify-center bg-orange-50 text-orange-500 px-4 py-2 rounded-2xl font-medium border border-orange-300 hover:bg-orange-500 hover:text-orange-50 transition-colors duration-200 cursor-pointer"
        >
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
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          {{ t("backoffice.backoffice") || "Backoffice" }}
        </NuxtLink>
        <NuxtLink
          v-if="authStore.user?.roles.includes('owner')"
          to="/owner"
          @click="isMobileMenuOpen = false"
          class="flex items-center justify-center bg-orange-50 text-orange-500 px-4 py-2 rounded-2xl font-medium border border-orange-300 hover:bg-orange-500 hover:text-orange-50 transition-colors duration-200 cursor-pointer"
        >
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
              d="M8 17v-6a4 4 0 018 0v6M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
            />
          </svg>
          {{ t("owner.title") }}
        </NuxtLink>
        <NuxtLink
          to="/account"
          @click="isMobileMenuOpen = false"
          class="flex items-center justify-center text-orange-500 bg-orange-50 px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-500 hover:text-orange-50 transition-colors duration-200 cursor-pointer"
        >
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {{ t("navbar.account") }}
        </NuxtLink>
        <button
          @click="authStore.logout; isMobileMenuOpen = false"
          class="flex items-center justify-center text-white px-4 py-2 rounded-2xl font-medium border-orange-50 border hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
        >
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {{ t("navbar.logout") }}
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
