<template>
  <div
    class="
      p-3
      px-5
      bg-cyan-800
      h-min
      flex
      justify-between
      rounded-b-lg
      items-center
    "
  >
    <ui-clock></ui-clock>
    <slot name="center" />
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from "~~/stores/global";

const globalStore = useGlobal();
const isModalOpen = useState("isModalOpen", () => false);

const onResetClick = () => {
  globalStore.reset();
  isModalOpen.value = false;
};
</script>

<style scoped></style>
