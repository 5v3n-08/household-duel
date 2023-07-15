
<template>
  <v-list-subheader v-if="!isSidenavCollapsed">
    {{ title }}
  </v-list-subheader>
  <v-divider v-else-if="isSidenavCollapsed && !hideDivider" />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/users'

interface IProps {
  title: string;
  hideDivider: boolean
}
const props = defineProps<IProps>()

const userStore = useUserStore()
const { getCurrentProfile: user } = storeToRefs(userStore)
const isSidenavCollapsed = computed(() => user.value?.sidenav_collapsed ?? true)
</script>
