<template>
  <div class="w-screen">
    <ui-header-custom class="sticky top-0">
      <template #center> Some header template content. </template>
    </ui-header-custom>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
