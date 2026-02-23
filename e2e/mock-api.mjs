import http from "node:http";

// Wagtail StreamField body format: array of {type, value} blocks
function makeBody(html) {
  return [{ type: "raw_html", value: html }];
}

// Mock data for the Wagtail CMS content API
const pages = {
  home: {
    id: 1,
    title: "Tatort Rechts",
    meta: {
      seo_title: "Tatort Rechts - Rechte Gewalt in Deutschland",
      search_description:
        "13 Projekte haben seit 2000 rechte Gewalt dokumentiert.",
    },
    body: makeBody("<p>Home page content</p>"),
    layout: null,
    article_date: null,
    article_teaser: null,
    article_image_caption: null,
    article_image_thumbnail: null,
  },
  blog: {
    id: 2,
    title: "Blog",
    meta: {
      seo_title: "Blog | Tatort Rechts",
      search_description: "Neuigkeiten von Tatort Rechts.",
      article_image: null,
    },
    body: makeBody('<h1 class="title">Blog</h1>'),
    layout: null,
    article_date: null,
    article_teaser: null,
    article_image_caption: null,
    article_image_thumbnail: null,
  },
  hintergrund: {
    id: 3,
    title: "Über uns",
    meta: {
      seo_title: "Über uns | Tatort Rechts",
      search_description: "Hintergrund zu Tatort Rechts.",
      article_image: null,
    },
    body: makeBody("<h1>Über uns</h1><p>Hintergrund-Informationen</p>"),
    layout: null,
    article_date: null,
    article_teaser: null,
    article_image_caption: null,
    article_image_thumbnail: null,
  },
  kontakt: {
    id: 4,
    title: "Kontakt",
    meta: {
      seo_title: "Kontakt | Tatort Rechts",
      search_description: "Kontaktiere uns.",
      article_image: null,
    },
    body: makeBody("<h1>Kontakt</h1>"),
    layout: null,
    article_date: null,
    article_teaser: null,
    article_image_caption: null,
    article_image_thumbnail: null,
  },
};

const chronicles = [
  { id: 1, name: "VBRG", chronicle_source: "https://example.com" },
  { id: 2, name: "RAA Sachsen", chronicle_source: "https://example.com" },
];

const minMaxDate = {
  min_date: "2000-01-01",
  max_date: "2024-12-31",
  total: 16000,
};

const sampleIncident = {
  id: 13135,
  title: "Angriff in Bremen-Vegesack",
  description: "Ein Mann griff einen Passanten an.",
  date: "2020-06-15",
  url: "https://example.com/vbrg/13135",
  chronicle: {
    name: "VBRG",
  },
  location: {
    city: "Bremen",
    county: "Bremen",
    district: "Vegesack",
    street: "Hauptstraße",
    house_number: "12",
    latitude: 53.1667,
    longitude: 8.6167,
  },
  tags: "Angriff, Waffe",
  factums: "Körperverletzung",
  motives: "Rassismus",
  contexts: "",
  sources: [
    { name: "Weser-Kurier", date: "2020-06-16", url: "https://example.com/article" },
  ],
  rg_id: "vbrg_123",
  orig_city: "Bremen",
  orig_county: "Bremen",
};

const aggregatedIncidents = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [13.405, 52.52] },
      properties: { id: 1, title: "Berlin Vorfall", date: "2020-01-01" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [9.9937, 53.5511] },
      properties: { id: 2, title: "Hamburg Vorfall", date: "2020-02-01" },
    },
  ],
};

function parseUrl(urlStr) {
  return new URL(urlStr, "http://localhost:8000");
}

const server = http.createServer((req, res) => {
  const url = parseUrl(req.url);
  const path = url.pathname;
  const params = url.searchParams;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Wagtail CMS pages API - list
  if (path === "/content/api/v2/pages/") {
    const slug = params.get("slug");
    const childOf = params.get("child_of");

    if (slug && pages[slug]) {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          items: [{ id: pages[slug].id, meta: { slug } }],
        })
      );
      return;
    }

    if (childOf) {
      res.writeHead(200);
      res.end(JSON.stringify({ items: [] }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({ items: [] }));
    return;
  }

  // Wagtail CMS pages API - detail
  const pageDetailMatch = path.match(/^\/content\/api\/v2\/pages\/(\d+)\/$/);
  if (pageDetailMatch) {
    const pageId = parseInt(pageDetailMatch[1]);
    const page = Object.values(pages).find((p) => p.id === pageId);
    if (page) {
      res.writeHead(200);
      res.end(JSON.stringify(page));
      return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not found" }));
    return;
  }

  // Chronicles (organizations)
  if (path === "/chronicles/") {
    res.writeHead(200);
    res.end(JSON.stringify(chronicles));
    return;
  }

  // Min/max date
  if (path === "/min_max_date/") {
    res.writeHead(200);
    res.end(JSON.stringify(minMaxDate));
    return;
  }

  // Locations
  if (path === "/locations/") {
    res.writeHead(200);
    res.end(
      JSON.stringify([
        { description: "Berlin", place_id: "berlin" },
        { description: "Hamburg", place_id: "hamburg" },
        { description: "Bremen", place_id: "bremen" },
      ])
    );
    return;
  }

  // Autocomplete
  if (path === "/autocomplete/") {
    res.writeHead(200);
    res.end(
      JSON.stringify([
        { option: "Angriff" },
        { option: "Brandanschlag" },
        { option: "Bedrohung" },
      ])
    );
    return;
  }

  // Aggregated incidents (GeoJSON for map)
  if (path === "/aggregated_incidents/") {
    res.writeHead(200);
    res.end(JSON.stringify(aggregatedIncidents));
    return;
  }

  // Incidents list
  if (path === "/incidents/") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        count: 1,
        next: null,
        previous: null,
        results: [sampleIncident],
      })
    );
    return;
  }

  // Single incident
  const incidentMatch = path.match(/^\/incidents\/(\d+)$/);
  if (incidentMatch) {
    res.writeHead(200);
    res.end(JSON.stringify({ ...sampleIncident, id: parseInt(incidentMatch[1]) }));
    return;
  }

  // Histogram incidents
  if (path === "/histogram_incidents/") {
    res.writeHead(200);
    res.end(
      JSON.stringify([
        { date: "2020-01", count: 50 },
        { date: "2020-02", count: 45 },
        { date: "2020-03", count: 60 },
      ])
    );
    return;
  }

  // Chronicles histogram
  if (path === "/chronicles_histogram/") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        result: [
          {
            chronicler_name: "VBRG",
            data: [
              { date: "2020-01", count: 30 },
              { date: "2020-02", count: 25 },
            ],
          },
        ],
      })
    );
    return;
  }

  // All case IDs
  if (path === "/all_case_ids/") {
    res.writeHead(200);
    res.end(JSON.stringify({ result: [13135, 13136, 13137] }));
    return;
  }

  // Fallback 404
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Not found" }));
});

const PORT = parseInt(process.env.MOCK_API_PORT || "8001", 10);
server.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
