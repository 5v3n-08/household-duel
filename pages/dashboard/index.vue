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
