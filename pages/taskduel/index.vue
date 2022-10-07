<template>
  <div class="h-screen w-screen">
    <div class="pt-5 pb-5 mx-5 flex flex-row">
      <TaskduelDuelCategories class="h-min" />
      <TaskduelUserOverview class="ml-3 w-1/3" />
    </div>

    <TaskduelPointsModal />
  </div>
</template>

<script lang="ts">
export default {}
definePageMeta({
  layout: 'task-duel',
  middleware: 'auth'
})
</script>
