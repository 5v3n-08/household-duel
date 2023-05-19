<template>
  <div class="box-wrapper">
    <base-card :class="isOpen ? 'open' : ''" class="box-sidebar pa-0">
      <perfect-scrollbar class="py-3">
        <router-link
          v-for="(item, index) in accountList"
          :key="index"
          :to="item.link"
          class="account-link"
        >
          <i class="tio- me-2 text-20">{{ item.icon }}</i>
          <span class="text-caption f-600">{{ item.title }}</span>
        </router-link>
      </perfect-scrollbar>
    </base-card>
    <div class="box-content">
      <div class="mb-3 btn-account">
        <v-btn size="small" flat @click="isOpen = !isOpen">
          <i class="tio- text-18">menu_hamburger</i>
        </v-btn>
      </div>
      <slot />
      <pre>{{ supabaseUser }}</pre>
    </div>
    <div
      :class="isOpen ? 'd-block' : ''"
      class="box-overlay"
      @click="isOpen = !isOpen"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
const { t } = useI18n()
const supabaseUser = useSupabaseUser()

const hasIdentity = computed(() =>
  supabaseUser.value?.identities
)
const hasEmailIdentity = computed(() =>
  supabaseUser.value?.identities?.filter(identity => identity.provider === 'email')
)

const accountList = computed(() => {
  return [
    {
      title: t('profile.basicInfos'),
      icon: 'user_outlined',
      link: '/account'
    }
  ]
})
const isOpen = ref(false)

if (useSize(hasEmailIdentity.value) > 0) {
  accountList.value.push({
    title: t('profile.password.title'),
    icon: 'lock_outlined',
    link: '/account/password'
  })
}
accountList.value.push({
  title: 'Preferences',
  icon: 'settings_outlined',
  link: '/accounts/preferences'
},
{
  title: 'Recent Devices',
  icon: 'devices_apple',
  link: '/accounts/recent-devices'
},
{
  title: 'Notifications',
  icon: 'notifications_outlined',
  link: '/accounts/notifications'
},
{
  title: 'Two-Step verification',
  icon: 'fingerprint',
  link: '/accounts/two-step-verification'
},
{
  title: 'Connected Account',
  icon: 'link',
  link: '/accounts/connected-account'
},
{
  title: 'Social Account',
  icon: 'instagram',
  link: '/accounts/social-account'
},
{
  title: 'Billing',
  icon: 'dollar_outlined',
  link: '/accounts/billing'
},
{
  title: 'Statements',
  icon: 'file_outlined',
  link: '/accounts/statements'
},
{
  title: 'Referrals',
  icon: 'premium_outlined',
  link: '/accounts/referrals'
},
{
  title: 'API Keys',
  icon: 'key',
  link: '/accounts/api-keys'
},
{
  title: 'Delete Your Account',
  icon: 'delete_outlined',
  link: '/accounts/delete-account'
})
</script>

<style lang="scss" scoped>
$background: rgb(var(--v-theme-background));
$onBackground: rgb(var(--v-theme-on-background));
$surface: rgb(var(--v-theme-surface));
$onSurface: rgb(var(--v-theme-on-surface));

.box-wrapper {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  .box-sidebar {
    width: 260px;
    background-color: $surface;
    position: relative;

    @media (max-width: "991px") {
      position: fixed;
      top: 0;
      left: -260px;
      z-index: 999;
      height: 100vh;
      transition: all 0.2s ease-in;
      overflow-y: scroll;
      &.open {
        left: 0;
      }
    }
    .router-link-active {
      background-color: #f2f9ff;
      color: #1d4ed8 !important;
      border-left: 4px solid #1d4ed8 !important;
    }
    .account-link {
      padding: 0.725rem;
      display: block;
      text-decoration: none;
      color: $onBackground;
      border-left: 4px solid transparent;
      &:hover {
        background-color: #f2f9ff;
        color: #1d4ed8;
        border-left: 4px solid #1d4ed8;
      }
    }
  }
  .box-content {
    width: 100%;
    margin-left: 28px;
    @media (max-width: "991px") {
      margin-left: 0;
    }
  }
  .box-overlay {
    position: fixed;
    z-index: 998;
    display: none;
    background-color: #000;
    opacity: 0.5;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
  }
}
.btn-account {
  display: none;
  @media (max-width: "991px") {
    display: block;
  }
}
</style>
