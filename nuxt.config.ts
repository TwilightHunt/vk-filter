// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    // PRIVATE: KEY
    // Keys within public are also exposed client-side
    public: {
      token: process.env.TOKEN,
      app_id: process.env.APP_ID,
      base_url: process.env.BASE_URL,
    },
  },
});
