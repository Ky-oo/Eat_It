<script setup lang="ts">
import type { Restaurant } from "~/types/Restaurant";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  restaurant: Restaurant | undefined;
}>();

const { t } = useI18n();

const isEditing = ref(false);
const editedRestaurant = ref<Partial<Restaurant>>({});

const startEditing = () => {
  isEditing.value = true;
  editedRestaurant.value = { ...props.restaurant };
};

const cancelEditing = () => {
  isEditing.value = false;
  editedRestaurant.value = {};
};

const saveChanges = async () => {
  console.log("save en cours");
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t("owner.informations") }}
      </h2>
      <button
        v-if="!isEditing"
        @click="startEditing"
        class="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        {{ t("common.edit") }}
      </button>
    </div>

    <form @submit.prevent="saveChanges" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t("owner.image") }}
        </label>
        <div class="flex items-center space-x-4">
          <NuxtImg
            :src="
              isEditing
                ? editedRestaurant.image || restaurant?.image
                : restaurant?.image
            "
            alt="Restaurant"
            class="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
            format="webp"
            sizes="150px"
          />
          <div v-if="isEditing" class="flex-1">
            <input
              v-model="editedRestaurant.image"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="URL de l'image"
            />
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t("owner.name") }}
        </label>
        <input
          v-if="isEditing"
          v-model="editedRestaurant.name"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <p v-else class="text-gray-900">{{ restaurant?.name }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t("owner.description") }}
        </label>
        <textarea
          v-if="isEditing"
          v-model="editedRestaurant.description"
          rows="3"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        ></textarea>
        <p v-else class="text-gray-900">{{ restaurant?.description }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t("owner.cuisineType") }}
        </label>
        <select
          v-if="isEditing"
          v-model="editedRestaurant.cuisine"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="Italien">Italien</option>
          <option value="Américain">Américain</option>
          <option value="Japonais">Japonais</option>
          <option value="Français">Français</option>
          <option value="Mexicain">Mexicain</option>
          <option value="Chinois">Chinois</option>
          <option value="Indien">Indien</option>
          <option value="Méditerranéen">Méditerranéen</option>
          <option value="Thaïlandais">Thaïlandais</option>
          <option value="Healthy">Healthy</option>
          <option value="Coréen">Coréen</option>
          <option value="Britannique">Britannique</option>
        </select>
        <p v-else class="text-gray-900">{{ restaurant?.cuisine }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("owner.deliveryTime") }}
          </label>
          <input
            v-if="isEditing"
            v-model="editedRestaurant.deliveryTime"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="30-45"
          />
          <p v-else class="text-gray-900">{{ restaurant?.deliveryTime }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("owner.deliveryFee") }}
          </label>
          <input
            v-if="isEditing"
            v-model.number="editedRestaurant.deliveryFee"
            type="number"
            step="0.1"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <p v-else class="text-gray-900">{{ restaurant?.deliveryFee }}€</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("owner.distance") }}
          </label>
          <input
            v-if="isEditing"
            v-model.number="editedRestaurant.distance"
            type="number"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <p v-else class="text-gray-900">{{ restaurant?.distance }} Km</p>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t("owner.rating") }}
        </label>
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-yellow-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-gray-900 font-medium">{{
            restaurant?.rating
          }}</span>
          <span class="text-gray-500 ml-2">{{ t("owner.ratingAuto") }}</span>
        </div>
      </div>

      <div v-if="isEditing" class="flex items-center justify-end space-x-4">
        <button
          type="button"
          @click="cancelEditing"
          class="px-6 py-2 border border-gray-300 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          {{ t("common.cancel") }}
        </button>
        <button
          type="submit"
          class="px-6 py-2 bg-orange-500 hover:bg-orange-600 cursor-pointer text-white rounded-lg font-medium transition-colors"
        >
          {{ t("common.save") }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
