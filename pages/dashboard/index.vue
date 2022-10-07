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
                  {{ config.app.baseURL }}
                  test: {{ config.public.development }}
                  <v-alert color="error">
                    {{ authentication.getUserToken }}
                  </v-alert>
                  <form>
                    <p class="mb-4 text-center">
                      {{ $t('login.title') }}
                    </p>
                    <v-alert v-if="globalStore.getError.msg" border="start" color="error" class="mt-3 mb-3">
                      {{ globalStore.getError.msg }}
                    </v-alert>
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
  layout: 'blank',
  middleware: 'admin-only'
})
const email = useState('email', () => '')
const password = useState('password', () => '')
const isLoading = ref(false)
const hasError = reactive({ msg: null })
let error2 = ref()
const config = useRuntimeConfig()
const globalStore = useGlobalStore()
const authentication = useAuthentication()
</script>

<style scoped>
.ui-card {
  --v-medium-emphasis-opacity: 1;
}
</style>
