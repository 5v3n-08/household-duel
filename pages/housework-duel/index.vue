<template>
  <div class="h-screen w-screen">
    <div class="pt-5 pb-5 mx-5 flex flex-row">
      <categories class="h-min" />
      <user-overview class="ml-3 w-1/3" />
    </div>

    <points-modal />
  </div>
</template>

<script>
export default {
  name: "HouseworkDuel",
  layout: "housework-duel",
};
</script>
