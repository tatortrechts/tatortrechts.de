import {
  fetchAllCaseIds,
  fetchChildPages,
  fetchContent,
} from "../../utils/networking";

const BASE_URL = "https://tatortrechts.de";

async function Sitemap(req, res) {
  const blogPage = await fetchContent("blog");
  const blogPosts = await fetchChildPages(blogPage.id);
  const blogRoutes = blogPosts.map(({ url }) => url);

  const caseIds = await fetchAllCaseIds();
  const caseRoutes = caseIds.map((x) => `/fall/${x}`);

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
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  // set response content header to xml
  res.setHeader("Content-Type", "text/xml");
  // write the sitemap
  res.write(sitemap);
  res.end();
}

export default Sitemap;
