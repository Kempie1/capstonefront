// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 5000
  },
  
  modules: ["@nuxt/image",  '@nuxtjs/tailwindcss', 'nuxt-icon',  'nuxt-headlessui'],
  headlessui: {
    prefix: 'Headless'
  }
})