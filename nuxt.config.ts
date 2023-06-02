import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: ['vuetify/lib/styles/main.sass', '@/assets/nitro/styles/_main.scss', '@/assets/fonts/theiconof.css'],

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
          'defineStore' // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          // ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }
    ],
    [
      '@pinia-orm/nuxt',
      {
        autoImports: [
          // automatically imports `useRepo`
          'useRepo' // import { useRepo } from 'pinia-orm'
        ]
      }
    ],
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
    [
      'dayjs-nuxt',
      {
        defaultLocale: 'de',
        locales: ['de', 'en'],
        plugins: ['relativeTime', 'utc', 'timezone'],
        defaultTimezone: 'Europe/Berlin'
      }
    ],
    [
      'nuxt-lodash', {
        prefix: 'use',
        upperAfterPrefix: true
      }
    ],
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n'
    // '@nuxt/devtools',
    // [
    //   '@nuxtjs/moment',
    //   {
    //     defaultLocale: 'de',
    //     locales: ['de']
    //   }
    // ]
  ],

  // nuxt configurations
  typescript: {
    shim: false
  },

  plugins: [
    '~/plugins/vuetify/index.ts'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    authenticationSecret: 'defaultGithubSecretForSecurity2023',
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
      serviceUserToken: '',
      redirectUrl: 'https://ourprojects.de'
    }
  },

  googleFonts: {
    display: 'swap',
    families: {
      Roboto: [100, 300, 400, 500, 700, 900],
      Montserrat: [400, 500, 600, 700]
    }
  },

  i18n: {
    locales: [
      {
        code: 'us',
        name: 'English',
        file: 'en-US.json'
      },
      {
        code: 'de',
        name: 'German',
        file: 'de-DE.json'
      }
    ],
    defaultLocale: 'de',
    lazy: true,
    langDir: 'locales/'
  },

  // auth: {
  //   isEnabled: true,
  //   origin: 'http://localhost:3000',
  //   basePath: '/api/auth',
  //   enableSessionRefreshPeriodically: false,
  //   enableSessionRefreshOnWindowFocus: true,
  //   enableGlobalAppMiddleware: true,
  //   globalMiddlewareOptions: {
  //     allow404WithoutAuth: true
  //   }
  // }
  alias: {
    images: resolve(__dirname, './assets/images')
  },

  devtools: {
    enabled: true
  }
})
