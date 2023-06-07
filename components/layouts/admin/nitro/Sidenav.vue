<script setup>
import { onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { navigations } from '../../../../data/navigation'
import { useUserStore } from '~/stores/users'

// eslint-disable-next-line semi
const items = ref(navigations);
const isMenuActive = ref(0)
const config = useRuntimeConfig()
const title = config.public.projectName ?? 'OurProjects'
const userStore = useUserStore()
const { getCurrentProfile: user } = storeToRefs(userStore)

const dropdownToggle = (index) => {
  console.log('parent received dropdownToggle ' + index.target)
  isMenuActive.value = index
}

onMounted(() => {
  const dropdownLinks = document.querySelectorAll('.dropdown-link')
  const singleLink = document.querySelectorAll('.single-link')
  const adminWrapLayout = document.querySelector('.app-admin-wrap-layout')
  // header-sidebar
  const headerBtn = document.querySelector('.header-btn-toggle')
  const sidebarOverlay = document.querySelector('.sidebar-overlay')

  // dropdown menu functionality
  dropdownLinks.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (!btn.classList.contains('active')) {
        // singleLink.forEach(s => s.classList.remove('active'))
        dropdownLinks.forEach(x => x.classList.remove('active'))
        btn.classList.add('active')
      } else {
        btn.classList.remove('active')
      }
    })
  })

  // END::menu functionality

  if (headerBtn) {
    headerBtn.addEventListener('click', () => {
      adminWrapLayout?.classList.toggle('sidebar-close')
    })
    sidebarOverlay?.addEventListener('click', () =>
      adminWrapLayout?.classList.remove('sidebar-close')
    )
  }
// eslint-disable-next-line semi
});
</script>
<template>
  <div class="sidebar-content-wrap">
    <perfect-scrollbar class="sidebar">
      <!-- 👉 Nav header -->
      <div class="sidebar-header">
        <img class="ms-2" src="@/assets/images/ourprojects_logo.png" alt="">
      </div>

      <ul v-for="(item, index) in items" :key="index" class="nav-links">
        <SidenavSectionTitle v-if="item.type === 'sectionTitle'" :title="item.name" />
        <SidenavLink v-else v-bind="item" :index="index" :active="isMenuActive === index" @ondropdownclicked="dropdownToggle" />
      </ul>
      <div class="bg-secondary-lighten-4 rounded mt-10 text-center">
        <v-avatar v-if="user?.avatarurl" size="74" class="sidebar-profile-img">
          <img class="w-full" :src="user.avatarurl" alt="">
        </v-avatar>
        <div v-if="user?.full_name" class="text-13 f-600 mt-2">
          {{ user.full_name }}
        </div>
        <div
          v-if="user?.title"
          class="text-13 font-weight-medium text-secondary-darken-1 pb-4 mb-4"
        >
          {{ user.title }}
        </div>
      </div>
    </perfect-scrollbar>
    <div class="sidebar-overlay" />
  </div>
</template>

<style lang="scss">
// colors
$sidebarLink: rgb(95, 116, 141);
$primary: #0a68ff;
$background: rgb(var(--v-theme-background));
$onBackground: rgb(var(--v-theme-on-background));
$surface: rgb(var(--v-theme-surface));

// variables
$sidebarWidth: 260px;
$transition: all 0.2s ease-in;
.sidebar-profile-img {
  border: 2px solid #fff;
  margin-top: -33px;
}
.dot {
  position: relative;
  float: left;
  border: 4px solid rgb(36, 153, 239, 0);
  background-color: rgb(246, 249, 251, 0.1);
  padding: 0px;
  border-radius: 50%;
  margin-right: 0.5rem;
  &:before {
    display: block;
    content: " ";
    background-color: rgb(167, 190, 218);
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }
}
.router-link-active {
  .dot {
    position: relative;
    float: left;
    border: 4px solid rgb(36, 153, 239, 0.2);
    background-color: rgb(246, 249, 251, 0.1);
    padding: 0px;
    border-radius: 50%;
    margin-right: 0.5rem;
    &:before {
      display: block;
      content: " ";
      background-color: $primary;
      width: 4px;
      height: 4px;
      border-radius: 50%;
    }
  }
}

.group-name {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.ps {
  height: 100%;
}
</style>
