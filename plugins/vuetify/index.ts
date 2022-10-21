import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import defaults from './defaults'
import theme from './themes'

// Styles
import '@/assets/styles/scss/libs/vuetify/index.scss'
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    defaults,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        fa
      }
    },
    theme
  })

  nuxtApp.vueApp.use(vuetify)
})
