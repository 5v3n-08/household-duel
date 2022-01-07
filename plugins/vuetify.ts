import { defineNuxtPlugin } from "#app";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    theme: {
      defaultTheme: "light",
      themes: { light },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});

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
  },
  variables: {},
};
