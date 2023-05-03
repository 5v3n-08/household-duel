<template>
  <LayoutsAdminVerticalNav>
    <!-- 👉 navbar -->
    <template #navbar>
      <VTextField
        rounded
        prepend-inner-icon="mdi-magnify"
        density="compact"
        max-width="100px"
        class="app-bar-search d-none d-sm-block"
      />

      <VSpacer />

      <a
        href="https://github.com/GhostLabs94"
        target="_blank"
        rel="noopener noreferrer"
        style="color: inherit"
      >
        <VIcon
          class="ms-6 me-4"
          icon="mdi-github"
        />
      </a>
      <LayoutsNavbarThemeSwitcher />
      <VBtn
        icon
        variant="text"
        color="default"
        class="me-2"
        size="small"
      >
        <VIcon
          icon="mdi-bell-outline"
          size="24"
        />
      </VBtn>
      <!-- <UserProfile /> -->
    </template>

    <!-- 👉 Sidenav content -->
    <template #navigation-drawer-content>
      <LayoutsAdminVerticalNavSidenavContent />
    </template>

    <!-- 👉 Pages -->
    <div class="layout-page-content">
      <slot />
    </div>

    <!-- 👉 Footer -->
    <template #footer>
      <LayoutsAdminVerticalNavFooter />
    </template>
  </LayoutsAdminVerticalNav>
</template>

<script setup lang="tsx">
const config = useRuntimeConfig()
const title = config.public.projectName ?? 'OurProjects'
useHead({
  titleTemplate: title => `${title}`,
  meta: [
    { name: 'description', content: 'Automate your life, your home and your special routines' }
  ]
})
</script>
