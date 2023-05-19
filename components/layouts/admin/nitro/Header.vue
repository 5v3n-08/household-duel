<script lang="tsx" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '~/stores/users'

const userStore = useUserStore()
const { getCurrentProfile: user } = storeToRefs(userStore)

const isSearch = ref(false)
const search = () => {
  isSearch.value = !isSearch.value
}

const isLoggedIn = ref(true)

const handleSignOut = async () => { await navigateTo('/logout') }
</script>

<template>
  <div class="header">
    <v-container v-if="isSearch">
      <div class="search-field d-flex w-100">
        <i class="text-20 text-secondary search-icon tio-">search</i>
        <input
          type="text"
          placeholder="Search"
          class="flex-1 border-secondary rounded-lg py-2"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="close-search me-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="isSearch = false"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <v-btn color="primary" class="text-capitalize ml-4" flat>
          Search
        </v-btn>
      </div>
    </v-container>
    <v-container v-else class="d-flex justify-space-between">
      <i class="tio- text-primary h2 header-btn-toggle"> menu_left </i>

      <div class="d-flex align-center">
        <v-btn
          flat
          icon
          class="me-3"
          color="white"
          size="x-small"
          variant="elevated"
          @click="search"
        >
          <i class="tio- text-secondary"> search </i>
        </v-btn>
        <v-btn
          class="me-3"
          icon
          color="transparent"
          size="x-small"
          elevation="0"
        >
          <i class="tio- text-orange lighten-2"> brightness_1 </i>
        </v-btn>
        <v-badge class="me-3" color="error" content="6">
          <i class="tio- text-primary h2">notifications</i>
        </v-badge>
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
        <NavbarThemeSwitcher />
        <LanguageSwitchBtn />
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
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn
              rounded="pill"
              class="bg-primary-lighten-5"
              dark
              elevation="0"
              v-bind="props"
            >
              <span
                class="me-2 text-capitalize text-caption f-600 text-secondary-darken-1"
              >
                test</span>
              <v-badge
                bordered
                location="bottom-right"
                color="light-green"
                dot
                offset-x="2"
                offset-y="0"
              >
                <v-avatar size="26">
                  <img class="w-full" src="@/assets/images/faces/avatar.png">
                </v-avatar>
              </v-badge>
            </v-btn>
          </template>
          <v-list class="bg-white">
            <v-list-item>
              <v-list-item-title>View Profile</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                v-if="isLoggedIn"
                class="mouse-hover"
                @click="handleSignOut"
              >
                Sign Out
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.search-field {
  position: relative;
  background-color: #fff;
  .search-icon {
    position: absolute;
    padding-left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  .close-search {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 95px;
    &:hover {
      color: #6366f1;
      cursor: pointer;
    }
  }
  input {
    padding-left: 40px;
    &:focus {
      outline: none;
    }
  }
}
.mouse-hover {
  cursor: pointer;
}
</style>
