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
                  <form>
                    <p class="mb-4 text-center">
                      {{ $t('login.title') }}
                    </p>
                    <v-alert v-if="globalStore.getError.msg" border="start" color="error" class="mt-3 mb-3">
                      {{ globalStore.getError.msg }}
                    </v-alert>
                    <div class="mb-4">
                      <ui-input
                        v-model="email" :disabled="isLoading" class="mb-2" :label="$t('login.username')"
                        label-in-input type="email" :rules="[validateRequired]"
                      />
                    </div>
                    <div class="mb-4">
                      <ui-input
                        v-model="password" class="mt-2" :label="$t('login.password')" label-in-input
                        :disabled="isLoading" type="password" :rules="[validateRequired]"
                      />
                    </div>
                    <div class="text-center pt-1 mb-12 pb-1">
                      {{ !email }}
                      {{ !password }}
                      <v-progress-circular
                        v-if="isLoading" :size="70" :width="7" indeterminate color="primary"
                      />
                      <ui-button :disabled="!password || !email" @click="onLoginClick()">
                        {{ $t('login.button') }}
                      </ui-button>
                      <a class="text-gray-500" href="#">Forgot password?</a>
                    </div>
                    <div class="bg-sky-700 aspect-square" />
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
import { ILoginData, ILoginError, useBackend } from '~~/composables/useBackend'
import { API } from '~~/helpers/api'
import { useGlobalStore } from '~~/stores/global'

import { validateRequired } from '~~/helpers/validation'
const { locale } = useI18n()
definePageMeta({
  layout: 'blank'
})
const email = useState('email', () => '')
const password = useState('password', () => '')
const isLoading = ref(false)
const hasError = reactive({ msg: null })
let error2 = ref()
const config = useRuntimeConfig()
const globalStore = useGlobalStore()
// const reqError = ref<string | null>(null);

type ILoginDataAndError = ILoginData | ILoginError;

const onLoginClick = async () => {
  const { pending, data, error, refresh } = await useBackend<ILoginDataAndError>(API.authentication.oauth, {
    driver: 'username',
    username: email.value,
    password: password.value
  })
  console.log('test')
  isLoading.value = true
  refresh().then(() => {
    console.log(pending.value)
    console.log(data.value)
    console.log(error.value)
  })
  // if (error.value?.data?.message) {
  //   console.log('err found')
  //   hasError.msg = _.get(error, 'value.data.message')
  // }
  setTimeout(() => {
    isLoading.value = false
  }, 5000)
}
</script>

<style scoped>
.ui-card {
  --v-medium-emphasis-opacity: 1;
}
</style>
