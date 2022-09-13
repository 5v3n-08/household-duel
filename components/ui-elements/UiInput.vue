<template>
  <div class="w-full">
    <label v-if="!labelInInput" class="block text-gray-500 font-bold pl-1 mb-1" for="inline-full-name">
      {{ label }}
    </label>

    <input
      class="bg-gray-200 appearance-none border-2 border-gray-900 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-gray-300 focus:!border-cyan-800"
      :type="type ?? 'text'"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="labelInInput ? label : undefined"
      @input="onInput"
    >
    <div v-if="error" class="text-sm text-red-700 mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { TValidateResult } from '~~/helpers/validation'

type TInputTypes = 'text' | 'password' | 'email';
interface IEmits {
  (event: 'update:modelValue', value: string): void;
}
interface IProps {
  modelValue: string;
  type?: TInputTypes;
  label?: string;
  labelInInput?: boolean;
  rules?: ((v: string) => TValidateResult)[];
  disabled?: boolean;
}

const emit = defineEmits<IEmits>()
const props = defineProps<IProps>()

const error = ref<string | null>(null)

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  validate(value)
  emit('update:modelValue', value)
}

const validate = (value: string) => {
  if (props.rules?.length > 0) {
    props.rules.forEach((fn) => {
      const result = fn(value)
      _.isString(result) ? (error.value = result) : (error.value = null)
    })
  }
}
</script>
