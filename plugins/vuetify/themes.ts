const theme = {
  defaultTheme: 'dark',
  variations: {
    colors: ['primary', 'secondary', 'info', 'warning', 'error', 'success'],
    lighten: 5,
    darken: 5
  },
  themes: {
    light: {
      dark: false,
      variables: {}, // ✅ this property is required to avoid Vuetify crash

      colors: {
        primary: '#0A68FF',
        secondary: '#647283',
        info: '#8C8DFF',
        warning: '#DB9E55',
        error: '#FF316F',
        success: '#27CE88',
        background: '#F4F5FA',
        'on-background': '#647283',
        'on-background-hover': '#000000',
        surface: '#FFFFFF'
      }
    },
    dark: {
      dark: true,
      variables: {}, // ✅ this property is required to avoid Vuetify crash

      colors: {
        primary: '#0A68FF',
        secondary: '#647283',
        info: '#8C8DFF',
        warning: '#DB9E55',
        error: '#FF316F',
        success: '#27CE88',
        background: '#28243D',
        'on-background': '#647283',
        'on-background-hover': '#ffffff',
        surface: '#28243D',
        'on-surface': '#f2f9ff'
      }
    }
  }
}
export default theme
