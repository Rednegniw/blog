import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";
import { z } from "astro:content";

export const authors = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/authors" }),
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    shortBio: z.string(),
    company: z.string().optional(),
    email: z.string().email(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    layout: z.string().url().optional(),
  }),
});
