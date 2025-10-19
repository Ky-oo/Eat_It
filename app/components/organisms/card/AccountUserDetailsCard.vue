<script setup lang="ts">
import { useAuth } from "~/stores/Auth";
import { useRouter } from "vue-router";

const authStore = useAuth();
const router = useRouter();

const isLoading = ref(false);
const isEditing = ref(false);

import { computed, ref } from "vue";

const user = computed(
  () =>
    authStore.getUser ?? {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
    }
);
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
</template>
