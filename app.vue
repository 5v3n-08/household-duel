<template>
  <div class="main-body w-screen">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from "./stores/global";

const globalStore = useGlobal();

onMounted(() => globalStore.loadLocalStorage());
</script>
