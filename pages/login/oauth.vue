<template>
  <LoginPage :title="$t('login.callback.title')" title-class="text-success" :sub-title="$t('login.callback.redirectTitle')" show-redirect-url>
    <v-progress-linear :model-value="loadingValue" />
    <div v-if="errorMsg" class="mt-5">
      <v-alert
        color="error"
        theme="dark"
        border="start"
        prominent
        class="mw-700 mx-auto"
      >
        <i class="tio- text-18 me-2"> error_outlined </i>
        {{ errorMsg }}
      </v-alert>
    </div>
    <template v-if="currentUser?.avatarurl && avatarError === false" #avatar>
      <v-avatar size="80" class="mb-8">
        <img class="w-full" :src="currentUser.avatarurl" @error="avatarErrorHandler">
      </v-avatar>
    </template>
  </LoginPage>
</template>

<script setup lang="tsx">
import Profile from '~/models/Profile'
import { useUserStore } from '~/stores/users'

const config = useRuntimeConfig()

const { t } = useI18n()
const loadingValue = ref(0)
const errorMsg = ref('')
const avatarUpdated = ref(false)
const avatarError = ref(false)
definePageMeta({
  layout: 'blank',
  middleware: 'auth'
})
const user = useSupabaseUser()
const userStore = useUserStore()
const supabase = useSupabaseClient()
const currentUser = computed(() => userStore.getCurrentProfile)

const avatarErrorHandler = () => {
  console.log('AVATAR LOADING ERROR')
  avatarError.value = true
}

watch(currentUser, async (newUser, oldUser) => {
  console.log('watcher triggered' + avatarError.value)
  if (user.value && avatarUpdated.value === false) {
    console.log('updating avatar')
    // update avatar if available from oauth
    if (user.value.user_metadata.avatar_url) {
      const userTemp = userStore.getCurrentProfile
      if (userTemp) {
        const response = await fetch(user.value.user_metadata.avatar_url)
        const blob = await response.blob()
        const filePath = `${Math.random()}.jpg`
        let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, blob)
        userTemp.avatar_filename = filePath
        userTemp.avatarurl = URL.createObjectURL(blob)
        avatarUpdated.value = true
        avatarError.value = false

        // save new avatar to database and filesystem
        await userStore.saveProfile(userTemp)
      }
    }
  }
})

onMounted(() => {
  nextTick(function () {
    console.log(user.value)
    const timer = window.setInterval(async () => {
      loadingValue.value += Math.floor(Math.random() * 3) + 1
      if (!user.value) {
        errorMsg.value = t('login.callback.sessionNotFound')
      } else {
        errorMsg.value = ''
      }
      if (loadingValue.value >= 100) {
        clearInterval(timer)
        if (!user.value) {
          navigateTo('/login')
        }
        navigateTo('/dashboard')
      }
    }, 100)
  })
})

</script>
