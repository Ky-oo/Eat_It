import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Eat It",
      htmlAttrs: {
        lang: "fr",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logos/logo_entier.webp" },
        { rel: "canonical", href: "https://kylian-patry.duckdns.org/eat-it" },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@pinia/nuxt",
    "nuxt-vue3-google-signin",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@vite-pwa/nuxt",
    "@nuxt/test-utils/module",
  ],
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "fr",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Francais", file: "fr.json" },
    ],
  },
  ssr: true,

  nitro: {
    prerender: {
      routes: ["/", "/offline"],
    },
    routeRules: {
      "/": {
        ssr: true,
        headers: { "Cache-Control": "s-maxage=60" },
      },
      "/offline": {
        ssr: true,
        headers: { "Cache-Control": "s-maxage=86400" }, // 24h
      },
      "/restaurants/**": {
        ssr: true,
        isr: true,
        headers: { "Cache-Control": "s-maxage=3600" }, // 1 heure
      },
      "/login": { ssr: false },
      "/register": { ssr: false },
      "/cart": { ssr: false },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },

  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Eat It - Commande de repas",
      short_name: "Eat It",
      description: "Application de livraison de repas en ligne",
      theme_color: "#ea580c",
      background_color: "#fef3c7",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/logos/logo.webp",
          sizes: "192x192",
          type: "image/webp",
        },
        {
          src: "/logos/logo.webp",
          sizes: "512x512",
          type: "image/webp",
        },
      ],
    },
    workbox: {
      navigateFallback: "/offline",
      globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,ico,webp}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/images\.unsplash\.com\/.*/,
          handler: "CacheFirst",
          options: {
            cacheName: "unsplash-images",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
            },
          },
        },
        {
          urlPattern: /^https:\/\/via\.placeholder\.com\/.*/,
          handler: "CacheFirst",
          options: {
            cacheName: "placeholder-images",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 jours
            },
          },
        },
        {
          urlPattern: "/api/.*",
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60, // 1 heure
            },
          },
        },
      ],
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
