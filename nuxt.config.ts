import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/styles/main.css"],
  // css: ["@/assets/styles/main.css", "vuetify/lib/styles/main.sass"],
  buildModules: ["@pinia/nuxt", "@nuxtjs/stylelint-module"],
  build: {
    transpile: ["vuetify"],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  publicRuntimeConfig: {
    baseUrl: process.env.API_HOST,
  },
  typescript: {
    shim: false
  }
});
