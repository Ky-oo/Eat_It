import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "nuxt-vue3-google-signin"],

  // Configuration SSR/ISR
  ssr: true,

  // Configuration du rendu
  nitro: {
    prerender: {
      // Prérendu des pages statiques
      routes: ["/"],
    },
    // Configuration ISR pour les pages de restaurants
    routeRules: {
      // Page d'accueil - SSR avec cache
      "/": {
        ssr: true,
        headers: { "Cache-Control": "s-maxage=60" },
      },
      // Liste des restaurants - SSR avec cache
      "/restaurants": {
        ssr: true,
        headers: { "Cache-Control": "s-maxage=300" }, // 5 minutes
      },
      // Détail restaurant - ISR avec revalidation
      "/restaurants/**": {
        ssr: true,
        isr: true,
        headers: { "Cache-Control": "s-maxage=3600" }, // 1 heure
      },
      // Pages d'authentification - Client-side uniquement
      "/login": { ssr: false },
      "/register": { ssr: false },
      "/cart": { ssr: false },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // googleSignIn: {
  //   clientId: process.env.GOOGLE_CLIENT_ID,
  // },

  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  },

  // Configuration Pinia pour la persistance
  pinia: {
    storesDirs: ["./stores/**"],
  },

  components: [
    {
      path: "~/components/atoms",
      pathPrefix: false,
    },
    {
      path: "~/components/molecules",
      pathPrefix: false,
    },
    {
      path: "~/components/organisms",
      pathPrefix: false,
    },
    {
      path: "~/components/atoms/icons",
      pathPrefix: false,
    },
  ],
});
