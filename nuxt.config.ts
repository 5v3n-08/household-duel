import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: ['@/assets/styles/main.css', 'vuetify/lib/styles/main.sass', '@/assets/styles/scss/index.scss'],
  build: {
    transpile: ['vuetify']
  },
  modules: [
    // Webfontloader not working at the moment
    // error: serialize is not defined
    // ['nuxt-webfontloader', { proxyHeaders: false }],
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          // 'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }
    ],
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    ['@nuxtjs/moment', {
      defaultLocale: 'de',
      locales: ['de']
    }]
  ],
  // nuxt configurations
  typescript: {
    shim: false
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      development: process.env.NODE_ENV !== 'production',
      apiBaseUrl: '',
      apiBasePath: '/api',
      projectName: 'OurProjects-Cloud',
      demouser: {
        username: '',
        password: ''
      },
      serviceUserToken: ''
    }
  },
  vite: {
    define: {
      'process.env.DEBUG': true
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
  },
  // plugin configs
  // Webfontloader not working at the moment
  // error: serialize is not defined
  // webfontloader: {
  //   google: {
  //     families: ['Inter:100,200,300,400,500,600,700&display=swap'] // Loads Lato font with weights 400 and 700
  //   }
  // },
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
  }
})
