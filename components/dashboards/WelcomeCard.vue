<template>
  <VCard
    :title="$t('welcome')"
    :subtitle="username"
    class="position-relative"
  >
    <VCardText>
      <h5 class="text-2xl font-weight-medium text-primary">
        This is your awesome new home
      </h5>
      <p>🚀</p>
      <VBtn size="small">
        Start Tour
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />

    <!-- Trophy -->
    <VImg
      :src="trophy"
      class="trophy"
    />
  </VCard>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import trophy from '@/assets/images/misc/trophy.png'
import { useAuthentication } from '~~/stores/authentication'

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

const authentication = useAuthentication()
const username = authentication.getUser?.username ?? 'Unknown User'
</script>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
