<template>
  <div class="h-screen w-screen">
    <div class="pt-5 pb-5 mx-5 flex flex-row">
      <HouseworkCategories class="h-min" />
      <HouseworkUserOverview class="ml-3 w-1/3" />
    </div>

    <HouseworkPointsModal />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  layout: "housework-duel",
});
</script>
