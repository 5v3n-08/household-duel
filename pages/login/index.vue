<template>
  <v-app>
    <v-row>
      <v-col
        cols="12"
        lg="6"
        class="bg-primary-lighten-5 d-flex justify-center align-center"
      >
        <div class="text-center">
          <v-avatar size="320" rounded="0">
            <img class="mw-320" src="@/assets/images/session/signin.svg">
          </v-avatar>
          <div class="text-h4 f-600 mb-2">
            {{ config.public.projectName }}
          </div>
          <div class="text-subtitle-2 text-secondary-darken-1 mb-4">
            {{ $t('login.description.title') }}
          </div>
          <div class="text-sm">
            {{ $t('login.description.text') }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="d-flex justify-center align-center bg-gray-lighten-5"
      >
        <v-container class="text-center">
          <v-avatar size="80" class="mb-8">
            <img class="w-full" src="@/assets/images/ourprojects_logo.png">
          </v-avatar>
          <div class="text-h5 f-600 mb-2">
            {{ $t('login.title') }}
          </div>
          <div class="text-18 text-secondary font-weight-medium mb-10">
            <router-link to="/register" class="text-decoration-none f-600">
              {{ $t('login.noAccount') }}
            </router-link>
          </div>
          <div class="d-flex justify-center">
            <v-btn
              size="large"
              class="border-secondary px-8 me-3"
              flat
              @click="login('google')"
            >
              <v-avatar size="30">
                <img src="@/assets/images/social-media/Google.png" alt="">
              </v-avatar>
            </v-btn>
            <!-- <v-btn size="large" class="border-secondary px-8 me-3" flat>
            <v-avatar size="30">
              <img src="@/assets/images/social-media/facebook.svg" alt="">
            </v-avatar>
          </v-btn>
          <v-btn size="large" class="border-secondary px-8 me-3" flat>
            <v-avatar size="30">
              <img src="@/assets/images/social-media/twitter.svg" alt="">
            </v-avatar>
          </v-btn> -->
          </div>
          <div class="d-flex justify-center align-center py-8 mw-320">
            <v-divider class="flex-1 mx-4 line-color" />
            <span class="text-secondary">OR</span>
            <v-divider class="flex-1 mx-4 line-color" />
          </div>

          <ui-input v-model="email" :disabled="isLoading" :loading="isLoading" class="mb-4 mw-700" :label="$t('login.email')" type="email" />
          <ui-input v-model="password" variant="outlined" hide-details :disabled="isLoading" :loading="isLoading" class="mb-4 mw-700" :label="$t('login.password')" type="password" />

          <div class="d-flex justify-space-between align-center mw-700 mb-7">
            <!-- <v-checkbox
            v-model="checkbox"
            hide-details
            color="primary"
            label="Remember login"
          /> -->
            <router-link
              to="#"
              class="text-error text-decoration-none font-weight-medium"
              hide-details
            >
              Forgot Password ?
            </router-link>
          </div>
          <div v-if="errorMsg">
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
          <div class="d-flex mw-700">
            <ui-button :disabled="!password || !email" block color="primary" flat @click="onLoginClick()">
              {{ $t('login.button') }}
            </ui-button>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup lang="tsx">
import { loginOAuth, signInWithEmail } from '~/composables/auth/useAuthentication'

definePageMeta({
  layout: 'blank',
  middleware: 'guest-only'
})
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)
const config = useRuntimeConfig()
// const client = useSupabaseAuthClient()
const checkbox = ref(true)
const supabase = useSupabaseClient()

const onLoginClick = async () => {
  isLoading.value = true
  const { data: user, error } = await signInWithEmail(email.value, password.value)
  // const { data: user, error } = await supabase.auth.signInWithPassword({
  //   email: 'example@email.com',
  //   password: 'example-password'
  // })

  if (user) {
    navigateTo('/login/oauth')
  }
  if (error) {
    errorMsg.value = error.message
  }
  isLoading.value = false
}
const login = async (provider: 'github' | 'google' | 'apple') => {
  const loginData = await loginOAuth(provider)
  console.log(loginData)
  if (loginData.data) {
    console.log(loginData.data)
    navigateTo('/dashboard')
  }
  if (loginData.error) {
    console.log(loginData.error)
    errorMsg.value = loginData.error.message
  }
}

onMounted(() => {
  email.value = config.public.development ? config.public.demouser.username : ''
  password.value = config.public.development ? config.public.demouser.password : ''
})
</script>
