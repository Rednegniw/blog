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
  // newsletter: {
  //     // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
  //     // Please add your .env file and modify it according to your selection
  //     provider: 'buttondown',
  // },
  // search: {
  //     provider: 'kbar', // kbar or algolia
  //     kbarConfig: {
  //         searchDocumentsPath: 'search.json', // path to load documents to search
  //     },
  //     // provider: 'algolia',
  //     // algoliaConfig: {
  //     //   // The application ID provided by Algolia
  //     //   appId: 'R2IYF7ETH7',
  //     //   // Public API key: it is safe to commit it
  //     //   apiKey: '599cec31baffa4868cae4e79f180729b',
  //     //   indexName: 'docsearch',
  //     // },
  // },
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
  { href: "/tags", title: "nav.tags" },
  { href: "/projects", title: "nav.projects" },
  { href: "/about", title: "nav.about" },
] as const;

export const POST_METADATA = {
  defaultLayout: "column", // Default layout for blog posts, options: simple and column
  showFullWidthCover: false, // Show full width cover image in blog post
  showCover: true, // Show cover image in blog post
  showTags: true, // Show tags in blog post
  showDate: true, // Show date in blog post, TODO: Add support for hiding date
  showSummary: true, // Show summary in blog post
  showAuthors: true, // Show authors in blog post, TODO: Add support for hiding authors
  showRelatedPosts: true, // Show related posts in blog post, TODO: Add support for hiding related posts
  showTableOfContents: true, // Show table of contents in blog post
  showShareButtons: 'both', // Show share buttons in blog post, options: top, bottom, both, none
};
