<template>
  <ui-card class="text-center p-0">
    <div class="text-sm bg-cyan-700 rounded-t-xl p-1">
      {{ category }}
    </div>
    <div class="grid gap-2 grid-cols-2 mt-2">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="bg-cyan-800 hover:bg-cyan-700 cursor-pointer flex items-center justify-center p-2 rounded"
        @click="onTaskClick(task.id)"
      >
        {{ task.name }}
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
import { useTaskDuel } from '~~/stores/taskduel/global'
import { useTasks } from '~~/stores/taskduel/tasks'

const tasksStore = useTasks()
const taskDuelStore = useTaskDuel()
const props = defineProps({
  category: {
    type: String,
    require: true
  }
})

const tasks = computed(() =>
  tasksStore.tasks.filter(task => task.category === props.category)
)

const onTaskClick = (id: string) => {
  taskDuelStore.setSelectedTaskId(id)
}
</script>
