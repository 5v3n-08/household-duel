<template>
  <VApp>
    <div class="app-admin-wrap-layout" :class="isSidenavCollapsed ? 'sidebar-close' : undefined">
      <Spinner />
      <slot name="navbar" />
      <slot name="navigation-drawer-content" />

      <VMain class="main-content-wrap">
        <v-container>
          <base-card class="mb-5">
            <Breadcrumbs :key="$route.fullPath" class="pa-0" />
          </base-card>
          <slot />
          <slot name="footer" />
        </v-container>
      </VMain>
    </div>
  </VApp>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/users'

const router = useRouter()
const userStore = useUserStore()
const { getCurrentProfile: user } = storeToRefs(userStore)
const isSidenavCollapsed = computed(() => user.value?.sidenav_collapsed ?? true)
</script>
