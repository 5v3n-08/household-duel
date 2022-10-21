<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <NuxtLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <!-- <VImg src="/ourprojects_logo.png" /> -->

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          {{ title }}
        </h1>
      </Transition>
    </NuxtLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <LayoutsAdminVerticalNavSidenavLink
      :item="{
        title: $t('sidenav.dashboard'),
        to: '/dashboard',
        icon: { icon: 'mdi-home-outline' }
      }"
    />

    <!-- 👉 Account specific -->
    <LayoutsAdminVerticalNavSidenavSectionTitle :item="{ heading: 'Account' }" />
    <LayoutsAdminVerticalNavSidenavLink
      :item="{
        title: $t('sidenav.accountSettings'),
        to: '',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
    <LayoutsAdminVerticalNavSidenavLink
      :item="{
        title: $t('logout.button'),
        to: '/logout',
        icon: { icon: 'mdi-logout' }
      }"
    />

    <!-- 👉 Apps -->
    <LayoutsAdminVerticalNavSidenavSectionTitle :item="{ heading: 'Apps' }" />

    <LayoutsAdminVerticalNavSidenavLink
      :item="{
        title: $t('sidenav.taskDuel'),
        to: '/taskduel',
        icon: { icon: 'mdi-fencing' }
      }"
    />
  </ul>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const title = config.public.projectName ?? 'OurProjects'
</script>

<style lang="scss">
.v-navigation-drawer {
  height: 100%;

  .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;

    > ul {
      flex-grow: 1;
    }
  }
}
</style>
