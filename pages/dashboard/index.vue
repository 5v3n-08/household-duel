<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="4"
    >
      <DashboardsWelcomeCard />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <DashboardsUserInfos />
    </VCol>
  </VRow>
</template>

<script setup lang="tsx">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.ui-card-icon {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
