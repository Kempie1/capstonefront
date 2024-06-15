// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 5000,
  },

  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-headlessui",
    "@nuxt/eslint",
  ],
  headlessui: {
    prefix: "Headless",
  },
  runtimeConfig: {
    // The private keys which are only available within server-side

    // Keys within public, will be also exposed to the client-side
    public: {
      authKeycloakId: process.env.AUTH_KEYCLOAK_ID || "PartShopClient",
      authKeycloakRealm: process.env.AUTH_KEYCLOAK_REALM || "PartShop",
      authKeycloakURL: process.env.AUTH_KEYCLOAK_URL || "http://localhost:8080",
    },
  },
});
