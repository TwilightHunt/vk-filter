import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "~~": fileURLToPath(new URL("./assets", import.meta.url)),
    "@@": fileURLToPath(new URL("./public", import.meta.url)),
  },
  runtimeConfig: {
    // private fieds
    public: {
      app_id: process.env.APP_ID,
      base_url: process.env.BASE_URL,
    },
  },
  css: ["bootstrap/dist/css/bootstrap.min.css", "~~/css/global.css"],
  app: {
    head: {
      link: [{ rel: "stylesheet", href: "favicon.ico" }],
      title: "VK Filter",
    },
  },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./i18n.config.ts",
    defaultLocale: "ru",
    locales: [
      {
        code: "en",
        name: "Englsih",
      },
      {
        code: "ru",
        name: "Русский",
      },
    ],
    strategy: "prefix",
  },
});
