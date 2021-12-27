<template>
  <ui-modal :is-open="task != undefined" :title="task?.name">
    <p class="text-center">{{ task.description }}</p>
    <div class="mt-5 text-center text-sm">Diese Aufgabe gibt:</div>
    <p class="text-center text-lg text-green-400 mb-10">
      + {{ task.points }} Punkte
    </p>

    <select-users-for-task class="m-4" @on-select-user="onSelectUser" />

    <template v-slot:buttons>
      <ui-button @click="onCancel">Abbrechen</ui-button>
    </template>
  </ui-modal>
</template>

<script setup lang="ts">
import { useGlobal } from "~~/stores/global";

const globalState = useGlobal();
const task = computed(() => globalState.selectedTask);

const onCancel = () => {
  globalState.setUserPointsByTask(null, null);
};

const onSelectUser = (id: string) =>
  globalState.setUserPointsByTask(id, task.value.id);
</script>
