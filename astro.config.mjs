import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import react from "@astrojs/react";
import { SITE_METADATA } from "./src/consts.ts";
import metaTags from "astro-meta-tags";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: SITE_METADATA.siteUrl,
  integrations: [
    expressiveCode({
      themes: ["dracula"]
    }),
    mdx(),
    sitemap(),
    solidJs({
      include: ["**/solidjs/*"],
    }),
    react({
      include: ["**/react/*"],
    }),
    metaTags(),
    robotsTxt(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
