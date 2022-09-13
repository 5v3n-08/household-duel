module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'queen-blue': {
          100: '#5B96C2',
          200: '#4C8CBD',
          300: '#4282B3',
          400: '#3D77A4',
          500: '#33658A',
          600: '#33658A',
          700: '#2C5777',
          800: '#274C68',
          900: '#224159'
        },
        charcoal: {
          100: '#4F7892',
          200: '#476D85',
          300: '#406277',
          400: '#39576A',
          500: '#2F4858',
          600: '#2B4150',
          700: '#243642',
          800: '#1D2B35',
          900: '#162027'
        },
        themeBackground: 'var(--background)',
        themeText: 'var(--text)'
      }
    }
  },
  plugins: []
}
