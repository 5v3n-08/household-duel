import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, fa } from 'vuetify/iconsets/fa'
import {mdi} from "vuetify/lib/iconsets/mdi";

import '@mdi/font/css/materialdesignicons.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: { light },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        fa
      }
  },
  })

  nuxtApp.vueApp.use(vuetify)
})

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    primary: "#2C5777",
    surface: "#FFFFFF",
    secondary: "#03DAC6",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  }, variables: {},
};
