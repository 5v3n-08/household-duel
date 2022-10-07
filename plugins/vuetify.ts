import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: { light, dark }
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        fa
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#fffbeb',
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  variables: {}
}

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#fffbeb',
    primary: '#90caf9',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  variables: {}
}
