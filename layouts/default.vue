<template>
  <LayoutAdminNitro>
    <!-- 👉 navbar -->
    <template #navbar>
      <Header />
      <!--
      <VTextField
        rounded
        prepend-inner-icon="mdi-magnify"
        density="compact"
        max-width="100px"
        class="app-bar-search d-none d-sm-block"
      />

      <VSpacer />
      -->
    </template>

    <!-- <UserProfile /> -->

    <!-- 👉 Sidenav content -->
    <template #navigation-drawer-content>
      <Sidenav />
    </template>

    <!-- 👉 Pages -->
    <slot scrollable />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </LayoutAdminNitro>
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
