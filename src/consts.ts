/**
 * Site metadata that is used across the site.
 *
 * A few of these are not used yet, and are subject to change, example of this is Author.
 */
export const SITE_METADATA = {
  title: "Antonín Wingender's Blog",
  theme: "system",
  siteUrl: "https://awingender.com/",
  siteRepo: "https://github.com/Rednegniw/blog",
  robots: "index, follow",
};

/**
 * Default posts per page for pagination.
 */
export const ITEMS_PER_PAGE = 5;


/**
 * Navigation items.
 If title is not found in the translation file, it will be used as is.
 example: if title is "nav.home", and translation file does not have "nav.home", it will be displayed as "nav.home"

 You should add translations for these in src/i18n/ui.ts or use as is.
 */
export const NAVIGATION = [
  { href: "/", title: "nav.home" },
  { href: "/blog", title: "nav.blog" },
  { href: "/projects", title: "nav.projects" },
  { href: "/about", title: "nav.about" },
] as const;

export const POST_METADATA = {
  defaultLayout: "column",
  showFullWidthCover: false,
  showCover: true,
  showTags: true,
  showDate: true,
  showSummary: true,
  showAuthors: true,
  showRelatedPosts: true,
  showTableOfContents: true,
  showShareButtons: "both",
};
