<script setup lang="ts">
import { useAuth } from "~/stores/Auth";
import { useRouter } from "vue-router";

const authStore = useAuth();
const router = useRouter();

const isLoading = ref(false);
const isEditing = ref(false);

import { computed, ref } from "vue";

const defaultAvatar =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face";

const user = computed(
  () =>
    authStore.getUser ?? {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      picture: "",
    }
);

const userAvatar = computed(() => {
  return user.value.picture || defaultAvatar;
});
const handleSave = async () => {
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isEditing.value = false;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
  } finally {
    isLoading.value = false;
  }
};

// Fonction pour gérer le changement d'image (optionnel pour plus tard)
const handleImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // Ici vous pourrez implémenter l'upload d'image plus tard
    console.log("Nouvelle image sélectionnée:", file);
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">
        Informations personnelles
      </h2>
      <button
        v-if="!isEditing"
        @click="isEditing = true"
        class="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        Modifier
      </button>
    </div>

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- Section Photo de profil -->
      <div class="flex items-center space-x-6 pb-6 border-b border-gray-200">
        <div class="relative">
          <img
            :src="userAvatar"
            :alt="`Photo de ${user.firstname || 'utilisateur'}`"
            class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
            @error="$event.target.src = defaultAvatar"
          />
          <div
            v-if="isEditing"
            class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <input
            v-if="isEditing"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ user.firstname }} {{ user.lastname }}
          </h3>
          <p class="text-gray-600">{{ user.email }}</p>
          <p v-if="isEditing" class="text-sm text-gray-500 mt-2">
            Cliquez sur l'image pour changer votre photo de profil
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Prénom
          </label>
          <input
            v-model="user.firstname"
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
            v-model="user.lastname"
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
          class="flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? "Sauvegarde..." : "Sauvegarder" }}
        </button>
        <button
          type="button"
          @click="isEditing = false"
          class="flex-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>
