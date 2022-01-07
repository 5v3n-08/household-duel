<template>
  <div class="">
    <label class="block text-gray-500 font-bold pl-1 mb-1" for="inline-full-name">
      {{ label }}
    </label>

    <input
      class="bg-gray-200 appearance-none border-2 border-gray-900 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-gray-300 focus:!border-cyan-800"
      type="text"
      :value="modelValue"
      @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
interface IEmits {
  (event: "update:modelValue", value: string): void;
}
interface IProps {
  modelValue: string;
  label?: string;
}

const emit = defineEmits<IEmits>();
defineProps<IProps>();
</script>
