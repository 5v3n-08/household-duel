<template>
  <VLayout class="layout-wrapper layout-nav-type-vertical">
    <VNavigationDrawer
      v-model="drawer"
      app
      floating
      sticky
      :absolute="false"
      style="background: rgb(var(--v-theme-background))"
      class="layout-vertical-nav position-fixed"
    >
      <slot name="navigation-drawer-content" />
    </VNavigationDrawer>
    <VAppBar
      app
      flat
      class="px-6 layout-navbar"
      style="background: transparent"
    >
      <template
        v-if="mdAndDown"
        #prepend
      >
        <VAppBarNavIcon
          class="d-block d-lg-none me-2 ms-n3"
          color="inherit"
          @click="drawer = true"
        />
      </template>
      <slot name="navbar" />
    </VAppBar>
    <VMain class="w-100">
      <div class="pa-6">
        <Breadcrumbs :key="router.currentRoute.value.name" />
        <div class="pa-6">
          <slot />
        </div>
      </div>
    </VMain>
    <v-footer
      app
      style="background: transparent"
    >
      <slot name="footer" />
    </v-footer>
  </VLayout>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import Breadcrumbs from '../../Breadcrumbs.vue'
const router = useRouter()

const { lgAndUp, mdAndDown } = useDisplay()
const drawer = ref(lgAndUp.value)
</script>

<style lang="scss">
.layout-vertical-nav {
  top: 0 !important;
  height: 100% !important;

  .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;

    > ul {
      flex-grow: 1;
    }
  }
}

.v-toolbar__prepend {
  margin-inline-start: 0 !important;
}

.v-footer {
  padding-left: 24px !important;
  padding-right: 24px !important;
}
</style>
