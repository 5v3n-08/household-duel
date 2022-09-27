<template>
  <button
    type="button"
    class="px-6 py-2.5 transition duration-150 rounded-md ease-in-out mb-3 text-white bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg hover:bg-blue-600 hover:text-white hover:shadow-lg"
    :class="addClass"
    :style="addStyle"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">

interface IProps {
  addClass?: string;
  fullLength?: boolean;
  uppercase?: boolean;
  colored?: boolean;
  disabled?: boolean;
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
