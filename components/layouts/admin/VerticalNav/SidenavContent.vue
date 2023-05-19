<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <NuxtLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <!-- <VImg src="/ourprojects_logo.png" /> -->

      <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
        {{ title }}
      </h1>
    </NuxtLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <LayoutsAdminVerticalNavSidenavLink2
      :item="{
        title: $t('sidenav.dashboard'),
        to: '/dashboard',
        icon: { icon: 'mdi-home-outline' }
      }"
    />

    <!-- 👉 Account specific -->
    <LayoutsAdminVerticalNavSidenavSectionTitle2 :item="{ heading: $t('sidenav.categories.account') }" />
    <LayoutsAdminVerticalNavSidenavLink2
      :item="{
        title: $t('sidenav.accountSettings'),
        to: '/dashboard/account',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
    <LayoutsAdminVerticalNavSidenavLink2
      :item="{
        title: $t('logout.button'),
        to: '/logout',
        icon: { icon: 'mdi-logout' }
      }"
    />

    <!-- 👉 Apps -->
    <LayoutsAdminVerticalNavSidenavSectionTitle2 :item="{ heading: $t('sidenav.categories.apps') }" />

    <LayoutsAdminVerticalNavSidenavLink2
      :item="{
        title: $t('sidenav.taskDuel'),
        to: '/taskduel',
        icon: { icon: 'mdi-fencing' }
      }"
    />

    <!-- 👉 Administration -->
    <LayoutsAdminVerticalNavSidenavSectionTitle2 :item="{ heading: $t('sidenav.categories.admin') }" />
    <LayoutsAdminVerticalNavSidenavLink2
      :item="{
        title: $t('sidenav.instances'),
        to: '/admin/instances',
        icon: { icon: 'mdi-apps' },
        category: {
          title: $t('sidenav.categories.admin'),
          to: ''
        }
      }"
    />
    <LayoutsAdminVerticalNavSidenavLink2
      :item="{
        title: $t('sidenav.adapters'),
        to: '/admin/adapters',
        icon: { icon: 'mdi-apps' },
        category: {
          title: $t('sidenav.categories.admin'),
          to: ''
        }
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
