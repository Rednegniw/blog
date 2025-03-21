import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

export const projects = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "src/content/projects" }),
	schema: ({ image }) => z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		image: image(),
		link: z.string().url().optional(),
		playStoreLink: z.string().url().optional(),
		appStoreLink: z.string().url().optional(),
		githubLink: z.string().url().optional(),
		releaseDate: z.string().date().optional(),
		status: z.enum(["development", "released", "archived"]),
		techStack: z.array(z.object({
			name: z.string(),
			link: z.string().url().optional(),
			icon: image(),
			usedFor: z.string()
		})),
	}),
});