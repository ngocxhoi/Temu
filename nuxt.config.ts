// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxthub/core"],
  css: ["~/assets/css/main.css"],

  appConfig: {
    title: "Temu",
    description: "Buy your sell products and more",
  },

  hub: {
    database: true,
    blob: true,
    kv: false,
    cache: false,
  },
});
