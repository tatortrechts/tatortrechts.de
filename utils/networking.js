import { transformToHtml } from "./html";

const isServer = typeof window === "undefined";

let API_LOCATION;
if (isServer && process.env.API_URL) {
  API_LOCATION = process.env.API_URL;
} else {
  API_LOCATION = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV === "production") {
    API_LOCATION = "https://api.tatortrechts.de";
  }
}

function buildQueryParams(
  q,
  startDate,
  endDate,
  chronicles,
  bbox,
  location,
  q_location
) {
  const params = [];
  if (q != null) {
    params.push(`q=${q}`);
  }

  if (startDate != null) {
    const formatedDate = startDate.format("YYYY-MM-DD");
    params.push(`start_date=${formatedDate}`);
  }

  if (endDate != null) {
    const formatedDate = endDate.format("YYYY-MM-DD");
    params.push(`end_date=${formatedDate}`);
  }

  if (chronicles != null) {
    chronicles.forEach((x) => {
      params.push(`chronicle=${x}`);
    });
  }

  if (bbox != null) {
    bbox.flat().forEach((x) => params.push(`bbox=${x}`));
  }

  if (location != null) {
    params.push(`location=${location}`);
  }

  if (q_location != null) {
    params.push(`q_location=${q_location}`);
  }

  if (params.length === 0) return "";
  return "?" + params.join("&");
}

async function _fetch(
  endpoint,
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  bbox = null,
  location = null,
  q_location = null
) {
  const paramsString = buildQueryParams(
    q,
    startDate,
    endDate,
    chronicles,
    bbox,
    location,
    q_location
  );
  const url = `${API_LOCATION}/${endpoint}/${paramsString}`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (e) {
    return [null, e];
  }
}

async function fetchAutocomplete(
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  bbox = null,
  location = null
) {
  const r = await _fetch(
    "autocomplete",
    q,
    startDate,
    endDate,
    chronicles,
    bbox,
    location
  );
  if (r.length === 2 && r[0] === null) return r;
  else return r.map((x) => x.option);
}

async function fetchLocations(
  q_location,
  // q = null,
  startDate = null,
  endDate = null,
  chronicles = null
) {
  const r = await _fetch(
    "locations",
    null,
    startDate,
    endDate,
    chronicles,
    null,
    null,
    q_location
  );
  if (r.length === 2 && r[0] === null) return r;
  else return r;
}

function fetchAggregatedIncidents(
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  location = null
) {
  return _fetch(
    "aggregated_incidents",
    q,
    startDate,
    endDate,
    chronicles,
    null,
    location
  );
}

function fetchIncidents(
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  bbox = null,
  location = null
) {
  return _fetch("incidents", q, startDate, endDate, chronicles, bbox, location);
}

function fetchHistogramIncidents(
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  bbox = null,
  location = null
) {
  return _fetch(
    "histogram_incidents",
    q,
    startDate,
    endDate,
    chronicles,
    bbox,
    location
  );
}

async function fetchIncidentsNext(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (e) {
    return [null, e];
  }
}

function fetchOrganizations() {
  return _fetch("chronicles");
}

async function fetchContent(slug) {
  const url = API_LOCATION + `/content/api/v2/pages/?slug=${slug}`;
  const response = await fetch(url);
  const apiResponse = await response.json();
  const id = apiResponse.items[0].id;

  const url2 = API_LOCATION + `/content/api/v2/pages/${id}/`;
  const response2 = await fetch(url2);
  const apiResponse2 = await response2.json();
  const {
    layout,
    body,
    article_date,
    article_teaser,
    title,
    article_image_caption,
    article_image_thumbnail,
    meta: { article_image },
  } = apiResponse2;

  let article = null;

  if (article_image != null) {
    article = {};
    article.image_url = API_LOCATION + article_image_thumbnail.url;
    article.title = title;
    article.teaser = article_teaser;
    article.date = article_date;
    article.caption = article_image_caption;
  }

  apiResponse2.body = await transformToHtml(body, layout, article);
  return apiResponse2;
}

async function fetchChildPages(pageId) {
  const url =
    API_LOCATION +
    `/content/api/v2/pages/?child_of=${pageId}&order=-article_date&live=true`;
  const response = await fetch(url);
  const apiResponse = await response.json();
  const items = apiResponse.items.map((x) => {
    const {
      meta: { slug },
      title,
      article_date: date,
      article_teaser: teaser,
      article_image_thumbnail,
    } = x;

    // dummy image if the page does not have a image set yet
    let thumbnail_url = "/changme.jpg";
    if (article_image_thumbnail != null) {
      thumbnail_url = article_image_thumbnail.url;
    }

    return {
      url: "/blog/" + slug,
      teaser,
      title,
      date,
      thumbnail_url: API_LOCATION + thumbnail_url,
    };
  });
  return items;
}

async function fetchMinMaxDate() {
  const url = API_LOCATION + "/min_max_date/";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const apiResponse = await response.json();
    return {
      minDate: apiResponse.min_date,
      maxDate: apiResponse.max_date,
      total: apiResponse.total,
    };
  } catch (e) {
    return [null, e];
  }
}

async function fetchIncident(id) {
  const url = API_LOCATION + "/incidents/" + id;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (e) {
    return [null, e];
  }
}

async function fetchChroHisto() {
  const url = API_LOCATION + "/chronicles_histogram/";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const apiResponse = await response.json();
    return apiResponse.result;
  } catch (e) {
    return [null, e];
  }
}

async function fetchAllCaseIds() {
  const url = API_LOCATION + "/all_case_ids/";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const apiResponse = await res.json();
    return apiResponse.result;
  } catch (e) {
    return [null, e];
  }
}

export {
  API_LOCATION,
  fetchAggregatedIncidents,
  fetchAutocomplete,
  fetchIncidents,
  fetchHistogramIncidents,
  fetchIncidentsNext,
  fetchOrganizations,
  fetchLocations,
  fetchContent,
  fetchChildPages,
  fetchMinMaxDate,
  fetchIncident,
  fetchChroHisto,
  fetchAllCaseIds,
};
