import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), partytown({
    config: {
      forward: ['dataLayer.push'],
    },
  }),
],
  base: process.env.BASE_URL ? process.env.BASE_URL : "/"
});
