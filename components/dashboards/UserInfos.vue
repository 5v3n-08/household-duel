<template>
  <VCard
    :title="$t('dashboard.widgets.userinfos.title')"
    :subtitle="username"
    class="position-relative"
  >
    <VCardText>
      <code class="block whitespace-pre overflow-x-scroll">
        {{ user }}
      </code>
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
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
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
