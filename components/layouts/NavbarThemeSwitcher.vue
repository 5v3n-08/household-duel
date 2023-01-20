<template>
  <VBtn
    icon
    variant="text"
    color="default"
    size="small"
    @click="changeTheme"
  >
    <VIcon
      :icon="getThemeIcon"
      size="24"
    />
  </VBtn>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { useCycleList, computedWithControl } from '@vueuse/core'

const themes = [
  {
    name: 'light',
    icon: 'mdi-weather-sunny'
  },
  {
    name: 'dark',
    icon: 'mdi-weather-night'
  }
]

const vuetifyTheme = useTheme()
const {
  state: currentTheme,
  next: getNextThemeName,
  index: currentThemeIndex
} = useCycleList(themes.map(t => t.name), { initialValue: vuetifyTheme.global.name.value })
const changeTheme = () => {
  vuetifyTheme.global.name.value = getNextThemeName()
}
const getThemeIcon = computedWithControl(vuetifyTheme.global.name, () => {
  const nextThemeIndex = currentThemeIndex.value + 1 === themes.length ? 0 : currentThemeIndex.value + 1

  return themes[nextThemeIndex].icon
})
watch(vuetifyTheme.global.name, (val) => {
  currentTheme.value = val
})
</script>
