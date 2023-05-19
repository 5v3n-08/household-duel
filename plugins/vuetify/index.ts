import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// uncomment to use font awesome icons
// import '@fortawesome/fontawesome-free/css/all.css'
// import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import defaults from './defaults'
import theme from './themes'

// Styles
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    defaults,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
        // fa
      }
    },
    theme
  })

  nuxtApp.vueApp.use(vuetify)
})
