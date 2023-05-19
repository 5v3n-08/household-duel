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
            {{ $t('login.welcome.title') }}
          </div>
          <div class="text-18 text-secondary font-weight-medium mb-10">
            <router-link to="/login" class="text-decoration-none f-600">
              {{ $t('login.accountExists') }}
            </router-link>
          </div>
          <div class="d-flex justify-center align-center py-8 mw-320">
            <v-divider class="flex-1 mx-4 line-color" />
          </div>

          <div class="d-flex justify-space-between align-center mw-700 mb-7">
            <div class="text-center">
              <span class="text-success text-error text-decoration-none font-weight-medium">
                {{ $t('login.welcome.checkMails') }}
              </span>
            </div>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup lang="tsx">
const config = useRuntimeConfig()

definePageMeta({
  layout: 'blank',
  middleware: 'guest-only'
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
