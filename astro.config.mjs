import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { SITE_METADATA } from "./src/consts.ts";
import metaTags from "astro-meta-tags";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import expressiveCode from "astro-expressive-code";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  prefetch: true,
  site: SITE_METADATA.siteUrl,
  integrations: [
    expressiveCode({
      themes: ["dracula"]
    }),
    mdx(),
    sitemap(),
    react(),
    metaTags(),
    robotsTxt(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
