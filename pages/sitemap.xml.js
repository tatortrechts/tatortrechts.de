import {
  fetchAllCaseIds,
  fetchChildPages,
  fetchContent,
} from "../utils/networking";

const BASE_URL = "https://tatortrechts.de";

async function createSitemap() {
  const blogPage = await fetchContent("blog");
  let blogRoutes = [];
  if (blogPage) {
    const blogPosts = await fetchChildPages(blogPage.id);
    blogRoutes = blogPosts.map(({ url }) => url);
  }

  const caseIds = await fetchAllCaseIds();
  const caseRoutes = Array.isArray(caseIds) ? caseIds.map((x) => `/fall/${x}`) : [];

  const localRoutes = [
    "",
    "/ueber",
    "/karte",
    "/blog",
    "/kontakt",
    "/projekte",
  ];

  const pages = localRoutes.concat(blogRoutes, caseRoutes);

  const urlSet = pages
    .map((page) => {
      // Build url portion of sitemap.xml
      return `<url><loc>${BASE_URL}${page}</loc></url>`;
    })
    .join("");

  // Add urlSet to entire sitemap string
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;
}

const Sitemap = () => {};

Sitemap.getInitialProps = async ({ res, req }) => {
  const sitemap = await createSitemap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;
