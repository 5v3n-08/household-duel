
<template>
  <h6 class="ms-3 mb-2 mt-5 group-name">
    {{ title }}
  </h6>
</template>

<script lang="ts" setup>
interface IProps {
  title: string;
}
const props = defineProps<IProps>()
</script>
