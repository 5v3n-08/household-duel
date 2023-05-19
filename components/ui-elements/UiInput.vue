<template>
  <div>
    <v-text-field
      v-bind="props"
      @input="onInput"
    />
    <div v-if="errorMessage" class="text-sm text-red-700 mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">

type TInputTypes = 'text' | 'password' | 'email';
interface IEmits {
  (event: 'update:modelValue', value: string): void;
}
interface IProps {
  modelValue?: string | null;
  type?: TInputTypes;
  color?: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  errorMessage?: string;
}

const emit = defineEmits<IEmits>()
const props = defineProps<IProps>()

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

</script>
