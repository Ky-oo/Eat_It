import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "nuxt-vue3-google-signin"],

  ssr: true,

  nitro: {
    prerender: {
      routes: ["/"],
    },
    routeRules: {
      "/": {
        ssr: true,
        headers: { "Cache-Control": "s-maxage=60" },
      },
      "/restaurants": {
        ssr: true,
        headers: { "Cache-Control": "s-maxage=300" }, // 5 minutes
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
