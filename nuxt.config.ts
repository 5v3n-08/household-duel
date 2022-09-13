import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/main.css', 'vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify']
  },
  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }
    ],
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  head () {
    // needed for SEO metadata @nuxtjs/i18n plugin
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      {
        code: 'de',
        file: 'de-DE.json'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      legacy: false,
      locale: 'en'
    },
    lazy: true,
    langDir: 'locales/'
  },
  typescript: {
    shim: false
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '/api',
      baseUrl: '',
      projectName: 'OurProjects-Cloud'
    }
  },
  loadingIndicator: {
    name: 'rotating-plane',
    color: 'blue',
    background: 'red'
  },
  loading: {
    color: 'DodgerBlue',
    height: '10px'
  }
})
