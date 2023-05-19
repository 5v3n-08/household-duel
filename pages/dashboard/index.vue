<template>
  <DashboardWidgets />
</template>

<script setup lang="tsx">
import DashboardWidgets from './Widgets.vue'
definePageMeta({
  middleware: 'auth'
})
</script>
