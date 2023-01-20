<template>
  <v-btn
    v-bind="props"
    :color="props.color ?? undefined"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">

interface IProps {
  color?: string;
}
const props = defineProps<IProps>()
</script>
