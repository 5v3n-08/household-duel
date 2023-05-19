<template>
  <VApp>
    <div class="app-admin-wrap-layout">
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
const router = useRouter()
</script>
