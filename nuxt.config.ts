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
    "@sidebase/nuxt-auth",
    "nuxt-security"
  ],
  
  security: {
    // global
    headers: {
      contentSecurityPolicy: {
        "img-src": ["'self'",'partsshop-bucket.s3.eu-central-1.amazonaws.com/'],
        "script-src": [
          "'self'",
          "'nonce-{{nonce}}'",
          // The nonce allows the root script
          "'strict-dynamic'" 
          // All scripts inserted by the root script will also be allowed
        ],
        "script-src-attr": ["'unsafe-hashes'", "'unsafe-inline'"],
      }
    }
  },

  auth: {
    provider: {
      type: 'local',
      pages: {
        login: '/account/login',
      },
      endpoints: {
        signIn: { path: 'login', method: 'post'},
        signOut: { path: 'logout', method: 'post' },
        signUp: { path: 'register', method: 'post' },
        getSession: { path: 'session', method: 'get' }
      },
      token: { signInResponseTokenPointer: '/token/accessToken' },
    },
    
    baseURL: process.env.BASE_LOCAL_AUTH_URL || 'http://localhost:3000/auth/',
  },
  
  headlessui: {
    prefix: "Headless",
  },

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      // authKeycloakId: process.env.AUTH_KEYCLOAK_ID || "PartShopClient",
      // authKeycloakRealm: process.env.AUTH_KEYCLOAK_REALM || "PartShop",
      // authKeycloakURL: process.env.AUTH_KEYCLOAK_URL || "http://localhost:8080",
      URL: process.env.URL || "http://localhost:5000",
      API_URL: process.env.API_URL || "http://localhost:3000",
    },
  },
});