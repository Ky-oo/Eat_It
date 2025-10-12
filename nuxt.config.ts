import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@pinia/nuxt"],
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
