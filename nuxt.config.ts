import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['@/assets/styles/main.css', 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
      transpile: ['vuetify'],
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {}
          },
        },
      },
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
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
          ],
        },
      ],
    ],
    vite: {
      define: {
        'process.env.DEBUG': false,
      },
    },
    typescript: {
      shim: false
    }
})
