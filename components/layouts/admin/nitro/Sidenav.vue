<script setup>
import { onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { navigations } from '../../../../data/navigation'
import { useUserStore } from '~/stores/users'

const items = ref(navigations)
const isMenuActive = ref(0)
const config = useRuntimeConfig()
const title = config.public.projectName ?? 'OurProjects'
const userStore = useUserStore()
const { getCurrentProfile: user } = storeToRefs(userStore)
const isSidenavCollapsed = computed(() => user.value?.sidenav_collapsed ?? true)

const dropdownToggle = (index) => {
  isMenuActive.value = index
}

async function toogleSidenav () {
  try {
    if (user.value) {
      user.value.sidenav_collapsed = !user.value.sidenav_collapsed
      await userStore.saveProfile(user.value)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <!-- 👉 Nav header -->
  <v-navigation-drawer
    :rail="isSidenavCollapsed"
    fixed
    app
    width="260"
  >
    <v-list-item
      :title="title"
      nav
    >
      <template #prepend>
        <v-avatar>
          <img class="w-full" src="@/assets/images/ourprojects_logo.png" alt="OurProjects Logo">
        </v-avatar>
      </template>
      <template v-if="!isSidenavCollapsed" #append>
        <VIcon
          icon="mdi-arrow-collapse-left"
          size="small"
          class="text-primary h2"
          @click.prevent="toogleSidenav"
        />
      </template>
    </v-list-item>

    <v-divider />

    <div v-if="!isSidenavCollapsed" class="mt-5 mb-5">
      <img class="ms-2" src="@/assets/images/ourprojects_logo.png" alt="">
    </div>
    <v-list v-for="(item, index) in items" :key="index" density="compact" nav active-class="active">
      <SidenavSectionTitle v-if="item.type === 'sectionTitle'" :title="item.name" />
      <SidenavItem v-else v-bind="item" :index="index" :active="isMenuActive === index" @ondropdownclicked="dropdownToggle" />
    </v-list>

    <div v-if="!isSidenavCollapsed" class="bg-secondary-lighten-4 rounded mt-10 text-center">
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
  </v-navigation-drawer>
</template>

<style lang="scss">
.sidebar-profile-img {
  border: 2px solid #fff;
  margin-top: -33px;
}
</style>
