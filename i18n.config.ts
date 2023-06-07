import de from './locales/de-DE.json'
import us from './locales/en-US.json'

// availableLocales not working, why?
export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'de',
    messages: {
      de,
      us
    },
    locales: [
      {
        code: 'us',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.json'
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'German',
        file: 'de-DE.json'
      }
    ]
  }
})
