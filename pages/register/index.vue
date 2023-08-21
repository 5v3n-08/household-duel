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
            {{ $t('login.registerTitle') }}
          </div>
          <div class="text-18 text-secondary font-weight-medium mb-10">
            <router-link to="/login" class="text-decoration-none f-600">
              {{ $t('login.accountExists') }}
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
          <form @submit="onSubmit">
            <v-row class="mw-700">
              <v-col v-if="registerError" cols="12">
                <v-alert
                  color="error"
                  theme="dark"
                  border="start"
                  prominent
                  class="mw-700 mx-auto"
                >
                  <i class="tio- text-18 me-2"> error_outlined </i>
                  {{ registerError }}
                </v-alert>
              </v-col>
              <v-col cols="12" lg="6">
                <ui-input
                  v-model="firstname"
                  :label="$t('profile.firstname')"
                  color="primary"
                  :disabled="isLoading" :loading="isLoading"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <ui-input
                  v-model="lastname"
                  :label="$t('profile.lastname')"
                  color="primary"
                  :disabled="isLoading" :loading="isLoading"
                />
              </v-col>
              <v-col cols="12">
                <ui-input
                  v-model="email"
                  type="email"
                  :label="$t('login.email')"
                  color="primary"
                  :disabled="isLoading" :loading="isLoading"
                />
              </v-col>
              <v-col cols="12">
                <ui-input
                  v-model="password"
                  type="password"
                  :label="$t('profile.password.new')"
                  color="primary"
                  :disabled="isLoading" :loading="isLoading"
                />
              </v-col>
              <v-col cols="12">
                <ui-input
                  v-model="confirmPassword"
                  type="password"
                  :label="$t('profile.password.confirm')"
                  color="primary"
                  :disabled="isLoading" :loading="isLoading"
                />
              </v-col>
              <v-col v-if="useSize(errors) > 0" cols="12">
                <v-alert
                  v-for="(error, index) in errors"
                  :key="index"
                  color="error"
                  theme="dark"
                  border="start"
                  prominent
                  class="mw-700 mx-auto"
                >
                  <i class="tio- text-18 me-2"> error_outlined </i>
                  {{ error }}
                </v-alert>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  flat
                  color="primary"
                  class="text-capitalize mb-5"
                  :disabled="!firstname || !lastname || !email || !password || !confirmPassword"
                  :loading="isLoading" type="submit"
                >
                  {{ $t('login.registerButton') }}
                </v-btn>
                <!-- <div class="text-caption font-weight-medium text-secondary">
                  By signing up, I agree to OurProjects
                  <router-link
                    to="#"
                    class="text-decoration-none text-secondary-darken-5 f-600"
                  >
                    Terms of Service & Privacy Policy
                  </router-link>
                </div> -->
              </v-col>
            </v-row>
          </form>

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
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup lang="tsx">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { loginOAuth, registerWithEmail, signInWithEmail } from '~/composables/auth/useAuthentication'
import { regexMinOneUppercase, regexSpecialCharacters, regexMinOneLowercase, regexMinOneNumber } from '~/helpers/validation'
const { t } = useI18n()

// page definitions
definePageMeta({
  layout: 'blank',
  middleware: 'guest-only'
})

// form validation
const validationSchema = toTypedSchema(
  zod.object({
    firstname: zod.string().nonempty(t('profile.firstnameRequired')),
    lastname: zod.string().nonempty(t('profile.lastnameRequired')),
    email: zod.string().nonempty(t('profile.emailRequired')).email(t('profile.emailInvalid')),
    password: zod.string().min(8, t('profile.password.required.minLengthDesc'))
      .regex(regexMinOneUppercase, t('profile.password.required.minUppercaseDesc'))
      .regex(regexMinOneLowercase, t('profile.password.required.minLowercaseDesc'))
      .regex(regexMinOneNumber, t('profile.password.required.minNumberDesc'))
      .regex(regexSpecialCharacters, t('profile.password.required.minSpecialCharDesc')),
    confirmPassword: zod.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: t('profile.password.required.dontConfirmMatch'),
    path: ['confirmPassword']
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

// register methods
const registerError = ref('')
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const loginData = await registerWithEmail(email.value, password.value)

  if (loginData.data.user) {
    navigateTo('/register/welcome')
  }
  if (loginData.error) {
    registerError.value = loginData.error.message
  }
  isLoading.value = false

  const { data: currentPasswordCheck, error: currentPasswordError } = await supabase.rpc('verify_user_password', { password: values.password })

  if (currentPasswordCheck) {
    const { data: passwordChangedSuccess, error: passwordChangeFailed } = await supabase.auth.updateUser({ password: values.password })
    if (passwordChangedSuccess) {
      Toast.fire({
        icon: 'success',
        title: t('profile.password.changed.success')
      })
    }
    if (passwordChangeFailed) {
      Toast.fire({
        icon: 'error',
        title: t('profile.password.changed.failed')
      })
    }
  }
  if (currentPasswordError) {
    Toast.fire({
      icon: 'error',
      title: t('profile.password.changed.wrongPassword')
    })
  }
})

const isLoading = ref(false)
const config = useRuntimeConfig()
const client = useSupabaseClient()
const checkbox = ref(true)

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

<style lang="scss" scoped>
.mw-320 {
  max-width: 320px;
  // min-width: 100%;
  margin: 0 auto;
}
.mw-700 {
  max-width: 700px;
  margin: 0 auto;
}
.br-0 {
  border-radius: 0;
}
.w-full {
  width: 100%;
}
</style>
