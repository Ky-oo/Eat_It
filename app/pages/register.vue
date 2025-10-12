<script setup lang="ts">
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptTerms = ref(false);
const isLoading = ref(false);

const handleRegister = () => {
  isLoading.value = true;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password.value)) {
    isLoading.value = false;
    alert(
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre."
    );
    return;
  }

  setTimeout(() => {
    isLoading.value = false;
    console.log("Register attempt:", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
  }, 1000);
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <img
            src="/logos/logo_white.png"
            alt="Eat It Logo"
            class="mx-auto h-16 w-auto bg-orange-500 px-6 py-3 rounded-2xl shadow-lg"
          />
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Créer votre compte
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Ou
          <NuxtLink
            to="/login"
            class="font-medium text-orange-600 hover:text-orange-500 transition-colors"
          >
            connectez-vous à votre compte existant
          </NuxtLink>
        </p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Prénom
              </label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                required
                placeholder="Jean"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-gray-400"
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom
              </label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                required
                placeholder="Dupont"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Adresse email
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="votre@email.com"
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
              Mot de passe
            </label>
            <div class="relative">
              <input
                id="password"
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
            <p class="mt-1 text-xs text-gray-500">
              Minimum 8 caractères avec au moins une majuscule et un chiffre
            </p>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmer le mot de passe
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-gray-400"
                :class="{
                  'border-red-300 focus:ring-red-500 focus:border-red-500':
                    confirmPassword && password !== confirmPassword,
                  'border-green-300 focus:ring-green-500 focus:border-green-500':
                    confirmPassword && password === confirmPassword,
                }"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  v-if="confirmPassword && password === confirmPassword"
                  class="h-5 w-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <svg
                  v-else-if="confirmPassword && password !== confirmPassword"
                  class="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <svg
                  v-else
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
            <p
              v-if="confirmPassword && password !== confirmPassword"
              class="mt-1 text-xs text-red-600"
            >
              Les mots de passe ne correspondent pas
            </p>
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="acceptTerms"
                v-model="acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="acceptTerms" class="text-gray-700">
                J'accepte les
                <a
                  href="#"
                  class="text-orange-600 hover:text-orange-500 font-medium"
                >
                  Conditions d'utilisation
                </a>
                et la
                <a
                  href="#"
                  class="text-orange-600 hover:text-orange-500 font-medium"
                >
                  Politique de confidentialité
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            :disabled="
              isLoading ||
              !acceptTerms ||
              (confirmPassword && password !== confirmPassword)
            "
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
            {{ isLoading ? "Création..." : "Créer mon compte" }}
          </button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Ou s'inscrire avec</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span class="ml-2">Google</span>
          </button>

          <button
            type="button"
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg
              class="h-5 w-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            <span class="ml-2">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animations personnalisées */
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

/* Transitions pour les validations */
input {
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
