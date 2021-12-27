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
    <div class="text-center">
      <div class="text-xs">Der Verlierer muss</div>
      <div class="text-white">das nächste Essen bezahlen!</div>
    </div>
    <div class="text-center" @click="isModalOpen = true">
      <div class="text-white">30 Tage</div>
      <div class="text-xs">verbleibend</div>
    </div>
    <ui-modal :is-open="isModalOpen" title="Zurücksetzten">
      <p class="text-center">
        Möchten sie wirklich alle gesammelten Punkte zurücksetzten?
      </p>
      <div class="flex justify-center items-center mt-10 mb-5">
        <ui-button @click="onResetClick">Zurücksetzten</ui-button>
      </div>
      <template v-slot:buttons>
        <ui-button @click="isModalOpen = false">Abbrechen</ui-button>
      </template>
    </ui-modal>
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
