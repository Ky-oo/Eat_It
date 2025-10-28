<script setup lang="ts">
import type { Restaurant, MenuItem } from "~/types/Restaurant";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  restaurant: Restaurant | undefined;
}>();

const { t } = useI18n();

const menuItems = ref<MenuItem[]>(props.restaurant?.menu || []);
const isAddingItem = ref(false);
const editingItemId = ref<string | null>(null);

const newItem = ref<Partial<MenuItem>>({
  name: "",
  description: "",
  price: 0,
  image: "",
});

const startAddingItem = () => {
  isAddingItem.value = true;
  newItem.value = {
    name: "",
    description: "",
    price: 0,
    image: "",
  };
};

const cancelAddingItem = () => {
  isAddingItem.value = false;
  newItem.value = {
    name: "",
    description: "",
    price: 0,
    image: "",
  };
};

const addItem = async () => {
  try {
    const itemToAdd: MenuItem = {
      id: String(Date.now()), // Génération temporaire d'ID
      name: newItem.value.name || "",
      description: newItem.value.description || "",
      price: newItem.value.price || 0,
      image: newItem.value.image || "",
    };

    menuItems.value.push(itemToAdd);
    cancelAddingItem();

    console.log("Ajout du plat:", itemToAdd);
  } catch (error) {
    console.error("Erreur lors de l'ajout du plat:", error);
    alert("Erreur lors de l'ajout du plat");
  }
};

const startEditingItem = (itemId: string) => {
  editingItemId.value = itemId;
};

const cancelEditingItem = () => {
  editingItemId.value = null;
};

const saveItem = async (item: MenuItem) => {
  try {
    // TODO: Implémenter l'API PUT pour modifier un plat
    console.log("Modification du plat:", item);
    editingItemId.value = null;

    // Rafraîchir les données
    await refreshNuxtData(`owner-restaurant-${props.restaurant?.id}`);
  } catch (error) {
    console.error("Erreur lors de la modification du plat:", error);
    alert("Erreur lors de la modification du plat");
  }
};

const deleteItem = async (itemId: string) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
    return;
  }

  try {
    // TODO: Implémenter l'API DELETE pour supprimer un plat
    menuItems.value = menuItems.value.filter((item) => item.id !== itemId);
    console.log("Suppression du plat:", itemId);
  } catch (error) {
    console.error("Erreur lors de la suppression du plat:", error);
    alert("Erreur lors de la suppression du plat");
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">
          {{ t("menu.title") }}
        </h2>
        <p class="text-gray-600 text-sm mt-1">
          {{ menuItems.length }} {{ t("menu.itemsAvailable") }}
        </p>
      </div>
      <button
        v-if="!isAddingItem"
        @click="startAddingItem"
        class="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        {{ t("menu.addItem") }}
      </button>
    </div>

    <div
      v-if="isAddingItem"
      class="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-orange-200"
    >
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        {{ t("menu.newItem") }}
      </h3>
      <form @submit.prevent="addItem" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t("menu.itemName") }} *
            </label>
            <input
              v-model="newItem.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ex: Pizza Margherita"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t("menu.itemPrice") }} *
            </label>
            <input
              v-model.number="newItem.price"
              type="number"
              step="0.1"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="12.90"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("menu.itemDescription") }} *
          </label>
          <textarea
            v-model="newItem.description"
            rows="3"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Décrivez votre plat..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("menu.itemImage") }} *
          </label>
          <input
            v-model="newItem.image"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>

        <div class="flex items-center justify-end space-x-4">
          <button
            type="button"
            @click="cancelAddingItem"
            class="px-6 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            {{ t("common.cancel") }}
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            {{ t("common.add") }}
          </button>
        </div>
      </form>
    </div>

    <div class="space-y-4">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div v-if="editingItemId !== item.id" class="flex items-start gap-4">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-24 h-24 rounded-lg object-cover flex-shrink-0"
          />

          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                  {{ item.name }}
                </h3>
                <p class="text-gray-600 text-sm mb-2">
                  {{ item.description }}
                </p>
                <p class="text-orange-600 font-bold text-lg">
                  {{ item.price.toFixed(2) }}€
                </p>
              </div>

              <div class="flex items-center space-x-2 ml-4">
                <button
                  @click="startEditingItem(item.id)"
                  class="p-2 text-blue-600 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>

                <button
                  @click="deleteItem(item.id)"
                  class="p-2 text-red-600 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <form v-else @submit.prevent="saveItem(item)" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t("menu.itemName") }}
              </label>
              <input
                v-model="item.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t("menu.itemPrice") }}
              </label>
              <input
                v-model.number="item.price"
                type="number"
                step="0.1"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t("menu.itemDescription") }}
            </label>
            <textarea
              v-model="item.description"
              rows="2"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t("menu.itemImage") }}
            </label>
            <input
              v-model="item.image"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div class="flex items-center justify-end space-x-4">
            <button
              type="button"
              @click="cancelEditingItem"
              class="px-6 py-2 border border-gray-300 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              {{ t("common.cancel") }}
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              {{ t("common.save") }}
            </button>
          </div>
        </form>
      </div>

      <div
        v-if="menuItems.length === 0 && !isAddingItem"
        class="text-center py-12 text-gray-500"
      >
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p>{{ t("menu.empty") }}</p>
        <p class="text-sm mt-2">{{ t("menu.emptySubtitle") }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
