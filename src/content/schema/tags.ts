import { file } from "astro/loaders";
import { defineCollection } from "astro:content";

import { z } from "astro:content";

/**
 * Tags are used to categorize content, so you can easily use them to filter it.
 */
export const tags = defineCollection({
  loader: file("src/content/tags/tags.json"),
  schema: z.object({
    id: z.string(),
    description: z.string(),
    name: z.string(),
  }),
});
