<template>
  <div class="inline-grid grid-cols-2 gap-4 w-full">
    <TaskduelCategoryCard
      v-for="item in tasksStore.categories"
      :key="item"
      :category="item"
    />
  </div>
</template>

<script setup lang="ts">
import { useTasks } from '~~/stores/taskduel/tasks'

const tasksStore = useTasks()
</script>
