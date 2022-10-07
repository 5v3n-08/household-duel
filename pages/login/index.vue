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
                    <img class="mx-auto w-48" src="ourprojects_logo.png" alt="logo">
                    <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">
                      {{ config.public.projectName }}
                    </h4>
                  </div>
                  <v-alert color="error">
                    {{ authentication.isAuthenticated }}
                  </v-alert>
                  {{ config.public.demouser.username }}
                  <v-alert color="error">
                    {{ authentication.getUserToken }}
                  </v-alert>
                  {{ config.public.development }}
                  {{ JSON.stringify(currentUser, null, 2) }}
                  <form>
                    <p class="mb-4 text-center">
                      {{ $t('login.title') }}
                    </p>
                    <v-alert v-if="globalStore.getError.msg" border="start" color="error" class="mt-3 mb-3">
                      {{ globalStore.getError.msg }}
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
                        data-mdb-ripple-color="light" :disabled="isLoading"
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
import { ILoginError, useBackend } from '~~/composables/useBackend'
import { API } from '~~/helpers/api'
import { useGlobalStore } from '~~/stores/global'

import { validateRequired } from '~~/helpers/validation'
import { useAuthentication } from '~~/stores/authentication'
import { useAuth } from '~~/composables/auth/useAuth'
import { useAuthUser } from '~~/composables/auth/useAuthUser'
interface ILoginData {
  driver: string;
  username: string;
  password: string;
}
interface ILoginReturnData {
  token?: string;
}
const { locale } = useI18n()
definePageMeta({
  layout: 'blank'
})
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const hasError = reactive({ msg: null })
let error2 = ref()
const config = useRuntimeConfig()
const globalStore = useGlobalStore()
const authentication = useAuthentication()
const { login } = useAuth()
const currentUser = useAuthUser()

const onLoginClick = async () => {
  isLoading.value = true
  // await login(email.value, password.value, true)
  // const { pending, data, error, refresh } = await useBackend<ILoginReturnData>(`${API.authentication.oauth}`,
  //   {
  //     driver: 'username',
  //     username: email.value,
  //     password: password.value
  //   },
  //   EHttpMethods.POST
  // )

  // if (data.value?.token) {
  //   console.log('user successful authenticated with token => ' + data.value.token)
  //   authentication.userAuthenticated({ token: data.value.token })
  //   return navigateTo('/dashboard')
  // }
  setTimeout(() => {
    isLoading.value = false
    navigateTo('/dashboard')
  }, 2000)
}
onMounted(() => {
  console.log('mounted')
  console.log(config.public.demouser.username + ' => ' + config.public.demouser.password)
  console.log(email.value + ' => ' + password.value)
  email.value = config.public.development ? config.public.demouser.username : null
  password.value = config.public.development ? config.public.demouser.password : null
  console.log(email.value + ' => ' + password.value)
})
</script>

<style scoped>
.ui-card {
  --v-medium-emphasis-opacity: 1;
}
</style>
