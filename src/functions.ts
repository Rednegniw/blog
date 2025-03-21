import type {CollectionEntry} from "astro:content";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { clsx } from 'clsx';

/**
 * Filter blog posts by published date and order them.
 * Change the sort order by changing the minus sign to a plus sign, or add your new logic by changing the return value.
 *
 * You have access to the post data, so you can sort by any property you want, ex. by tags or title.
 * The sort order is descending, so the newest posts are first.
 *
 * @param posts Collection of blog posts
 * @returns Collection of blog posts sorted by date
 */
export const sortBlogPosts = (posts: CollectionEntry<'blog'>[] | null): CollectionEntry<'blog'>[] => {
    if (!posts) return [];
    return posts.sort((a, b) => {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    })
}

/**
 * Exclude draft posts from the collection. If the site is built in production mode, draft posts are excluded by default.
 *
 * @param post Blog post
 * @returns True if the post is not a draft
 */
export const excludeDrafts = ({data}: CollectionEntry<'blog'>): boolean => {
    // Usually this should be like this - import.meta.env.PROD ? !data.draft : true; but for the purpose of the demo, we are displaying drafts as well
    return import.meta.env.PROD ? true : true;
}

/**
 * Utility function to merge tailwind classes.
 * @param classes - Tailwind classes
 * @returns Merged classes
 */
export const cn = (...classes: ClassNameValue[]) => twMerge(clsx(classes));
