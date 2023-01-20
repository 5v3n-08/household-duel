import { createI18n } from 'vue-i18n'

import de from '../locales/de-DE.json'
import en from '../locales/en-US.json'
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      de,
      en
    }
  })

  vueApp.use(i18n)
})
