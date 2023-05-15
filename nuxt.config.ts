import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    // "~~": "/<rootDir>",
    // "@@": "/<rootDir>",
    "~~": fileURLToPath(new URL("./assets", import.meta.url)),
    "@@": fileURLToPath(new URL("./public", import.meta.url)),
    // assets: "/<rootDir>/assets",
    // public: "/<rootDir>/public",
  },
  runtimeConfig: {
    token: process.env.TOKEN,
    app_id: process.env.APP_ID,
    base_url: process.env.BASE_URL,
    // public: {
    //   //
    // },
  },
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  app: {
    head: {
      link: [{ rel: "stylesheet", href: "favicon.ico" }],
      title: "VK Filter",
    },
  },
});
