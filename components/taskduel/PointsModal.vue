<template>
  <ui-modal :is-open="task != undefined" :title="task?.name">
    <p class="text-center">{{ task.description }}</p>
    <div class="mt-5 text-center text-sm">Diese Aufgabe gibt:</div>
    <p class="text-center text-lg text-green-400 mb-10">
      + {{ task.points }} Punkte
    </p>

    <TaskduelSelectUsersForTask
      class="m-4"
      @on-select-user="onSelectUser"
    />

    <template #buttons>
      <ui-button @click="onCancel">Abbrechen</ui-button>
    </template>
  </ui-modal>
</template>

<script setup lang="ts">
import { useTaskDuel } from "~~/stores/taskduel/global";
import { useTasks } from "~~/stores/taskduel/tasks";

const taskDuelStore = useTaskDuel();
const tasksStore = useTasks();

const task = computed(() => tasksStore.selectedTask);

const onCancel = () => {
  taskDuelStore.setUserPointsByTask(null, null);
};

const onSelectUser = (id: string) =>
taskDuelStore.setUserPointsByTask(id, task.value.id);
</script>
