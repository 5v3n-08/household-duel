<template>
  <div class="grid gap-4 grid-cols-2">
    <div
      v-for="user in users"
      :key="user.id"
      class="flex justify-center items-center border rounded h-36 bg-gray-100 hover:bg-gray-200 cursor-pointer"
      @click="onUserClick(user.id)"
    >
      <h1 class="font-bold text-lg">{{ user.name }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsers } from "~~/stores/housework/users";

const usersStore = useUsers();
const emit = defineEmits(["onSelectUser"]);
const users = computed(() => usersStore.users);

const onUserClick = (id: string) => emit("onSelectUser", id);
</script>
