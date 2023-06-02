<template>
  <VCard
    :title="$t('dashboard.widgets.userinfos.title')"
    :subtitle="username"
    class="position-relative"
  >
    <VCardText>
      <pre>{{ user }}</pre>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />
  </VCard>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/materio/misc/triangle-dark.png'
import triangleLight from '@/assets/materio/misc/triangle-light.png'
const supabase = useSupabaseClient()

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

const user = useSupabaseUser()
const username = user.value?.id ?? 'Unknown User'
</script>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}
</style>
