import de from './locales/de-DE.json'
import us from './locales/en-US.json'

// availableLocales not working, why?
export default defineI18nConfig(() => ({
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
      name: 'English'
    },
    {
      code: 'de',
      iso: 'de-DE',
      name: 'German'
    }
  ]
}))
