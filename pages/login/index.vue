<template>
  <section class="h-full gradient-form bg-gray-200 md:h-screen">
    <div class="container py-12 px-6 h-full w-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="xl:w-10/12">
          <div class="block bg-white shadow-lg rounded-lg">
            <div class="lg:flex lg:flex-wrap g-0">
              <div class="lg:w-6/12 px-4 md:px-0">
                <div class="md:p-12 md:mx-6">
                  <div class="text-center">
                    <img class="mx-auto w-48" src="/ourprojects_logo.png" alt="logo">
                    <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">
                      {{ config.public.projectName }}
                    </h4>
                  </div>
                  <form>
                    <p class="mb-4 text-center">
                      {{ $t('login.title') }}
                    </p>
                    <div class="text-center">
                      <v-chip class="mb-4 text-center">
                        {{ $t('login.socialMedia') }}
                      </v-chip>
                    </div>
                    <v-btn
                      class="ma-2"
                      color="error"
                      @click="login('google')"
                    >
                      <v-icon
                        start
                        icon="mdi-google"
                      />
                      Google
                    </v-btn>
                    <v-alert v-if="errorMsg" type="error" icon="mdi-lock">
                      {{ errorMsg }}
                    </v-alert>
                    <div class="mb-4">
                      <ui-input
                        v-model="email" :disabled="isLoading" :loading="isLoading" class="mb-2" :label="$t('login.username')"
                        label-in-input type="email" :rules="[validateRequired]"
                      />
                    </div>
                    <div class="mb-4">
                      <ui-input
                        v-model="password" class="mt-2" :label="$t('login.password')" label-in-input
                        :disabled="isLoading" :loading="isLoading" type="password" :rules="[validateRequired]"
                      />
                    </div>
                    <div class="text-center pt-1 mb-12 pb-1">
                      <ui-button :disabled="!password || !email" block @click="onLoginClick()">
                        {{ $t('login.button') }}
                      </ui-button>
                      <a class="text-gray-500" href="#">Forgot password?</a>
                    </div>
                    <div class="flex items-center justify-between pb-6">
                      <p class="mb-0 mr-2">
                        {{ $t('login.noAccount') }}
                      </p>
                      <ui-button
                        type="button" class="text-red-900" data-mdb-ripple="true"
                        style="background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                        data-mdb-ripple-color="light" :disabled="isLoading" @click="navigateTo('/')"
                      >
                        {{ $t('login.backToHome') }}
                      </ui-button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                style="background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
              >
                <div class="text-white px-4 py-6 md:p-12 md:mx-6">
                  <h4 class="text-xl font-semibold mb-6">
                    {{ $t('login.description.title') }}
                  </h4>
                  <p class="text-sm">
                    {{ $t('login.description.text') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="tsx">
import _ from 'lodash'
import { useI18n } from 'vue-i18n'
import { loginOAuth, signInWithEmail } from '~/composables/auth/useAuthentication'

import { validateRequired } from '~~/helpers/validation'
const { locale } = useI18n()
definePageMeta({
  layout: 'blank',
  middleware: 'guest-only'
})
const email = ref('')
const errorMsg = ref('')
const password = ref('')
const isLoading = ref(false)
const config = useRuntimeConfig()
const client = useSupabaseAuthClient()

const onLoginClick = async () => {
  isLoading.value = true
  const loginData = await signInWithEmail(email.value, password.value)

  if (loginData.data.user) {
    navigateTo('/dashboard')
  }
  if (loginData.error) {
    errorMsg.value = loginData.error.message
  }
  isLoading.value = false
}
const login = async (provider: 'github' | 'google' | 'apple') => {
  const loginData = await loginOAuth(provider)
  if (loginData.data) {
    console.log('redirect to dashboard')
    navigateTo('/dashboard')
  }
  if (loginData.error) {
    errorMsg.value = loginData.error.message
  }
}

onMounted(() => {
  email.value = config.public.development ? config.public.demouser.username : ''
  password.value = config.public.development ? config.public.demouser.password : ''
})
</script>

<style scoped>
.ui-card {
  --v-medium-emphasis-opacity: 1;
}
</style>
