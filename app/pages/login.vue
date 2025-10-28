<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

definePageMeta({
  middleware: "guest",
  ssr: false,
});

useSeoMeta({
  title: t("login.pageTitle"),
  description: t("homepage.description"),
  ogTitle: "Eat It - Login",
  ogDescription: t("homepage.ogDescription"),
  ogImage: "/logos/logo_entier.webp",
  ogUrl: "https://kylian-patry.duckdns.org/eat-it/login",
});

import { useAuth } from "~~/app/stores/Auth";

const authStore = useAuth();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);

function handleLogin() {
  isLoading.value = true;
  try {
    authStore.login(email.value, password.value);
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <NuxtImg
            src="/logos/logo_white.webp"
            alt="Eat It Logo"
            class="mx-auto h-16 w-auto bg-orange-500 px-6 py-3 rounded-2xl shadow-lg"
            format="webp"
            sizes="100px"
          />
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          {{ t("login.signIn") }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ t("login.or") }}
          <NuxtLink
            to="/register"
            class="font-medium text-orange-600 hover:text-orange-500 transition-colors"
          >
            {{ t("login.createNewAccount") }}
          </NuxtLink>
        </p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t("login.email") }}
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="email"
                autocomplete="username"
                type="email"
                required
                :placeholder="t('login.emailPlaceholder')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-gray-400"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t("login.password") }}
            </label>
            <div class="relative">
              <input
                id="password"
                autocomplete="current-password"
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-gray-400"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                for="remember-me"
                class="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                {{ t("login.rememberMe") }}
              </label>
            </div>

            <div class="text-sm">
              <a
                class="font-medium cursor-pointer text-orange-600 hover:text-orange-500 transition-colors"
              >
                {{ t("login.forgotPassword") }}
              </a>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex cursor-pointer justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isLoading ? t("login.signingIn") : t("login.signInButton") }}
          </button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">{{
              t("login.orContinueWith")
            }}</span>
          </div>
        </div>

        <GoogleLoginButton />
      </div>

      <div class="text-center text-sm text-gray-600">
        {{ t("login.agreeTo") }}
        <a href="#" class="text-orange-600 hover:text-orange-500 font-medium">
          {{ t("login.termsOfUse") }}
        </a>
        {{ t("login.and") }}
        <a href="#" class="text-orange-600 hover:text-orange-500 font-medium">
          {{ t("login.privacyPolicy") }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Focus amélioré pour l'accessibilité */
input:focus {
  outline: none;
}

/* Style pour le checkbox */
input[type="checkbox"]:checked {
  background-color: #ea580c;
  border-color: #ea580c;
}
</style>
