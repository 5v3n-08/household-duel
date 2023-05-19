<template>
  <VCard
    :title="props.title"
    :subtitle="props.subTitle"
    class="position-relative"
  >
    <VCardText>
      <slot />
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      v-if="!props.disableTriangle"
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
      style="z-index: -1"
    />

    <!-- Icon -->
    <VImg
      v-if="iconSrc?.includes('/')"
      :src="iconSrc"
      class="ui-card-icon"
      :width="iconWidth ?? 96"
    />
    <VIcon
      v-if="iconSrc?.includes('mdi-') || iconSrc?.includes('fa-')"
      :icon="iconSrc"
      class="ui-card-icon md-18"
      :size="iconWidth ?? 96"
    />
  </VCard>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/materio/misc/triangle-dark.png'
import triangleLight from '@/assets/materio/misc/triangle-light.png'

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

interface IProps {
  iconSrc?: string;
  iconWidth?: number | string;
  disableTriangle?: boolean;
  title?: string;
  subTitle?: string;
}
const props = defineProps<IProps>()

</script>
