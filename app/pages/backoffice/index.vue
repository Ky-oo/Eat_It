<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import type { User } from "~/types/User";
import type { ApiResponse } from "~/types/Utils";
import UserSearchBar from "~/components/organisms/searchbar/UserSearchBar.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const users = ref<User[]>([]);
const filteredUsers = ref<User[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const editingUserId = ref<string | null>(null);
const editedUser = ref<Partial<User>>({});

const loadUsers = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await $fetch<ApiResponse<User[]>>("/api/users");
    users.value = response.data;
  } catch (err: any) {
    error.value = err.message || t("backoffice.loadError");
  } finally {
    loading.value = false;
  }
};

onMounted(loadUsers);

const startEditing = (user: User) => {
  editingUserId.value = user.id;
  editedUser.value = { ...user };
};

const cancelEditing = () => {
  editingUserId.value = null;
  editedUser.value = {};
};

const saveUser = async () => {
  console.log("Update user");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        {{ t("backoffice.title") }}
      </h1>

      <Loader v-if="loading" />

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="loadUsers"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          {{ t("backoffice.retry") }}
        </button>
      </div>

      <div v-else>
        <UserSearchBar
          :users="users"
          @update:filtered="filteredUsers = $event"
        />
        <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead>
            <tr class="bg-orange-50 text-gray-700">
              <th class="px-6 py-3 text-left font-semibold">
                {{ t("backoffice.name") }}
              </th>
              <th class="px-6 py-3 text-left font-semibold">
                {{ t("backoffice.email") }}
              </th>
              <th class="px-6 py-3 text-left font-semibold">
                {{ t("backoffice.roles") }}
              </th>
              <th class="px-6 py-3 text-left font-semibold">
                {{ t("backoffice.actions") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers.length ? filteredUsers : users"
              :key="user.id"
              class="border-b"
            >
              <td class="px-6 py-4">
                <div v-if="editingUserId !== user.id">
                  {{ user.firstname }} {{ user.lastname }}
                </div>
                <div v-else>
                  <input
                    v-model="editedUser.firstname"
                    type="text"
                    class="border rounded px-2 py-1 w-24"
                  />
                  <input
                    v-model="editedUser.lastname"
                    type="text"
                    class="border rounded px-2 py-1 w-24 ml-2"
                  />
                </div>
              </td>
              <td class="px-6 py-4">
                <div v-if="editingUserId !== user.id">{{ user.email }}</div>
                <div v-else>
                  <input
                    v-model="editedUser.email"
                    type="email"
                    class="border rounded px-2 py-1 w-48"
                  />
                </div>
              </td>
              <td class="px-6 py-4">
                <div v-if="editingUserId !== user.id">
                  {{
                    Array.isArray(user.roles)
                      ? user.roles.join(", ")
                      : user.roles
                  }}
                </div>
                <div v-else>
                  <div class="flex gap-2">
                    <label class="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value="user"
                        v-model="editedUser.roles"
                      />
                      <span>{{ t("backoffice.roleUser") }}</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value="owner"
                        v-model="editedUser.roles"
                      />
                      <span>{{ t("backoffice.roleOwner") }}</span>
                    </label>
                    <label class="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value="admin"
                        v-model="editedUser.roles"
                      />
                      <span>{{ t("backoffice.roleAdmin") }}</span>
                    </label>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div v-if="editingUserId !== user.id">
                  <button
                    @click="startEditing(user)"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg mr-2"
                  >
                    {{ t("backoffice.edit") }}
                  </button>
                </div>
                <div v-else>
                  <button
                    @click="saveUser"
                    class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg mr-2"
                  >
                    {{ t("backoffice.save") }}
                  </button>
                  <button
                    @click="cancelEditing"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg"
                  >
                    {{ t("backoffice.cancel") }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
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
</style>
