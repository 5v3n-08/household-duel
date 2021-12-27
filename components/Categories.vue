<template>
  <div class="inline-grid grid-cols-2 gap-4 w-full">
    <category-card
      v-for="item in globalStore.categories"
      :key="item"
      :category="item"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from "~~/stores/global";

const globalStore = useGlobal();
</script>
