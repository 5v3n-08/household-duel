<template>
  <nuxt-link
    v-for="locale in availableLocales"
    :key="locale.code"
    :to="switchLocalePath(locale.code)"
  >
    <country-flag :country="locale.code" size="normal" />
  </nuxt-link>
</template>

<script lang="ts" setup>
import CountryFlag from 'vue-country-flag-next'
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>
