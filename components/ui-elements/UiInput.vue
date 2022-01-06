<template>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label
        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="inline-full-name"
      >
        Full Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        :value="modelValue"
        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      />
    </div>
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
