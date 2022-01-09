<template>
  <div class="w-screen main-body">
    <ui-header-custom class="sticky top-0">
      <template #center>
        <div class="text-center">
          <div class="text-xs">Der Verlierer muss</div>
          <div class="text-white">das nächste Essen bezahlen!</div>
        </div>
        <div class="text-center" @click="isModalOpen = true">
          <div class="text-white">30 Tage</div>
          <div class="text-xs">verbleibend</div>
        </div>
        <ui-modal :is-open="isModalOpen" title="Zurücksetzen">
          <p class="text-center">
            Möchten sie wirklich alle gesammelten Punkte zurücksetzen?
          </p>
          <div class="flex justify-center items-center mt-10 mb-5">
            <ui-button @click="onResetClick">Zurücksetzen</ui-button>
          </div>
          <template #buttons>
            <ui-button @click="isModalOpen = false">Abbrechen</ui-button>
          </template>
        </ui-modal>
      </template>
    </ui-header-custom>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from "~~/stores/housework/global";

const globalStore = useGlobal();
const isModalOpen = useState("isModalOpen", () => false);

const onResetClick = () => {
  globalStore.reset();
  isModalOpen.value = false;
};
</script>
