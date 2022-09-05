<template>
  <div class="h-screen w-screen">
    <div class="pt-5 pb-5 mx-5 flex flex-row">
      <TaskduelCategories class="h-min" />
      <TaskduelUserOverview class="ml-3 w-1/3" />
    </div>

    <TaskDuelPointsModal />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  layout: "taskduel",
});
</script>
