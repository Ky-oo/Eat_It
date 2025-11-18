<script>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
const SpeedInsights = defineAsyncComponent(() =>
  Promise.resolve(SpeedInsights)
);
</script>
<template>
  <SpeedInsights />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
