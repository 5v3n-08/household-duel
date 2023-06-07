<template>
  <v-breadcrumbs :items="generatedBreadcrumbs" class="v-theme--dark">
    <template #divider>
      <v-icon icon="mdi-chevron-right" />
    </template>
    <template #prepend>
      <v-icon size="small" icon="mdi-home" />
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'

const router = useRouter()
const { t: i18nMessage } = useI18n()

const link: Ref<string | boolean> = ref(false)
const routePaths = router.currentRoute.value.path.substring(1).split('/')
const routeBefore = ref('')

const generatedBreadcrumbs = computed(() => {
  const items = ref([{
    title: i18nMessage('sidenav.home'),
    disabled: false,
    href: '/dashboard'
  }])
  routePaths.forEach((item, index) => {
    routeBefore.value += '/' + item
    const title = i18nMessage('sidenav.categories.' + item) !== 'sidenav.categories.' + item ? i18nMessage('sidenav.categories.' + item) : i18nMessage('sidenav.' + item) !== 'sidenav.' + item ? i18nMessage('sidenav.' + item) : item
    try {
      const l = router.resolve(item)
      link.value = l.href
    } catch (error) {
      link.value = false
    }
    items.value.push({
      title,
      disabled: false,
      href: routeBefore.value
    })
  })
  return items.value
})
</script>
