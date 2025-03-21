import { reference } from "astro:content";

import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";
import { z } from "astro:content";
import { POST_METADATA } from "@/consts";

export const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image().optional(),
      date: z.coerce.date(),
      lastmod: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      summary: z.string(),
      images: z.string().optional(),
      authors: z.array(reference("authors")).default(["default"]),
      postLayout: z
        .enum(["simple", "column"])
        .default(POST_METADATA.defaultLayout as "simple" | "column"),
      tags: z.array(reference("tags")),
      related: z.array(reference("blog")).default([]),
      relatedProjects: z.array(reference("projects")).default([]),
    }),
});
