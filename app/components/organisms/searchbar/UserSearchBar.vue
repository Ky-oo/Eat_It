<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { User } from "~/types/User";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{ users: User[] }>();
const search = ref("");

const filteredUsers = computed(() => {
  if (!search.value) return props.users;
  const term = search.value.toLowerCase();
  return props.users.filter(
    (user) =>
      user.firstname?.toLowerCase().includes(term) ||
      user.lastname?.toLowerCase().includes(term)
  );
});

const emit = defineEmits(["update:filtered"]);
watch(filteredUsers, (val) => {
  emit("update:filtered", val);
});
</script>

<template>
  <div class="mb-6">
    <input
      v-model="search"
      type="text"
      :placeholder="t('search.userPlaceholder')"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    />
  </div>
</template>

<style scoped></style>
