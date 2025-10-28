<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <NuxtImg
          src="/logos/logo_entier.webp"
          alt="Eat It"
          class="h-32 w-auto mx-auto mb-4"
          format="webp"
        />
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="mb-6">
          <svg
            class="w-16 h-16 text-orange-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
            />
          </svg>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Hors ligne</h1>
          <p class="text-gray-600">
            Vous êtes actuellement hors ligne. Vérifiez votre connexion internet
            et réessayez.
          </p>
        </div>

        <button
          @click="retryConnection"
          class="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          Réessayer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const retryConnection = () => {
  if (navigator.onLine) {
    window.location.reload();
  } else {
    alert("Vous êtes toujours hors ligne. Vérifiez votre connexion.");
  }
};
</script>
