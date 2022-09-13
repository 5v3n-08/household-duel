import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/main.css', 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify']
  },
  buildModules: ['@nuxtjs/tailwindcss'],
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
    ]
  ],
  vite: {
    define: {
      'process.env.DEBUG': false
    }
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
      baseUrl: ''
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
