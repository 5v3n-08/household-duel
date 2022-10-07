<template>
  <v-btn
    color="primary"
    class="mt-5"
    v-bind="props"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">

interface IProps {
  addClass?: string;
  fullLength?: boolean;
  uppercase?: boolean;
  colored?: boolean;
}
const props = defineProps<IProps>()
const addClass = ref('')
const addStyle = ref('')

onMounted(() => {
  if (props.fullLength) {
    addClass.value += ' w-full'
  }
  if (props.uppercase) {
    addClass.value += ' uppercase'
  }
  if (props.colored) {
    addStyle.value += ' background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
  }
})
</script>
