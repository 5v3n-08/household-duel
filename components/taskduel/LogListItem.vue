<template>
  <div v-if="user && task" class="border-y border-cyan-800 py-1 px-5">
    <div class="flex justify-between items-center">
      <div>
        <div class="font-bold">
          {{ user.name }}
        </div>
        <div class="text-sm">
          {{ task.name }}
        </div>
      </div>
      <div class="text-center">
        <div class="font-bold text-green-300">
          + {{ task.points }}
        </div>
        <div class="text-xs">
          {{
            new Date(log.createdAt).toLocaleString("de", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskDuel } from '~~/stores/taskduel/global'
import { useTasks } from '~~/stores/taskduel/tasks'
import { useUsers } from '~~/stores/taskduel/users'

const taskDuelStore = useTaskDuel()
const usersStore = useUsers()
const tasksStore = useTasks()

const props = defineProps({
  logId: {
    type: String,
    require: true
  }
})

const log = computed(() =>
  taskDuelStore.logs.find(log => log.id === props.logId)
)
const user = computed(() =>
  usersStore.users.find(user => user.id === log.value.userId)
)
const task = computed(() =>
  tasksStore.tasks.find(task => task.id === log.value.taskId)
)
</script>
