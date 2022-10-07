<template>
  <div class="w-full">
    <label v-if="!labelInInput" class="block text-gray-500 font-bold pl-1 mb-1" for="inline-full-name">
      {{ label }}
    </label>

    <v-text-field
      :disabled="disabled"
      :type="type ?? 'text'"
      :placeholder="labelInInput ? label : undefined"
      :loading="loading"
      :value="modelValue"
      @input="onInput"
    />
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
  loading?: boolean;
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
