import ky from "ky-universal";

let API_LOCATION = "http://localhost:8000";

if (process.env.NODE_ENV === "production") {
  API_LOCATION = "https://api.tatortrechts.de";
}

function buildQueryParams(q, startDate, endDate, chronicles, bbox, location) {
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
  location = null
) {
  const paramsString = buildQueryParams(
    q,
    startDate,
    endDate,
    chronicles,
    bbox,
    location
  );
  const url = `${API_LOCATION}/${endpoint}/${paramsString}`;
  try {
    const apiResponse = await ky.get(url, { timeout: 30000 }).json();
    return apiResponse;
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
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null
) {
  const r = await _fetch("locations", q, startDate, endDate, chronicles);
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
    const apiResponse = await ky.get(url).json();
    return apiResponse;
  } catch (e) {
    return [null, e];
  }
}

function fetchOrganizations() {
  return _fetch("chronicles");
}

async function imageToHtml(imgId) {
  const url = API_LOCATION + `/content/api/v2/images/${imgId}/`;
  const apiResponse = await ky.get(url).json();
  const src = API_LOCATION + apiResponse.meta.download_url;
  const title = apiResponse.title;
  return `<img src="${src}" title="${title}" />`;
}

async function transformToHtml(content) {
  const contentList = await Promise.all(
    content.map(async (x) => {
      if (x.type == "heading") {
        return `<h1 class="title">${x.value}</h1>`;
      }

      if (x.type == "image") {
        const html = await imageToHtml(x.value);
        return html;
      }

      if (x.type == "paragraph") {
        return x.value;
      }

      if (x.type == "two_columns") {
        const left = await transformToHtml(x.value.left_column);
        const right = await transformToHtml(x.value.right_column);

        return `<div class="columns is-desktop"><div class="column">${left}</div><div class="column">${right}</div></div>`;
      }

      console.error("problem with " + x);
    })
  );

  return (
    `<section class="section"><div class="container">` +
    contentList.join("") +
    `</div></section>`
  );
}

async function fetchContent(slug) {
  const url = API_LOCATION + `/content/api/v2/pages/?slug=${slug}`;
  const apiResponse = await ky.get(url).json();
  const id = apiResponse.items[0].id;
  console.log(id);

  const url2 = API_LOCATION + `/content/api/v2/pages/${id}/`;
  const apiResponse2 = await ky.get(url2).json();
  apiResponse2.body = await transformToHtml(apiResponse2.body);
  return apiResponse2;
}

async function fetchMinMaxDate() {
  const url = API_LOCATION + "/min_max_date/";

  try {
    const apiResponse = await ky.get(url).json();
    return {
      minDate: apiResponse.min_date,
      maxDate: apiResponse.max_date,
    };
  } catch (e) {
    return [null, e];
  }
}

export {
  fetchAggregatedIncidents,
  fetchAutocomplete,
  fetchIncidents,
  fetchHistogramIncidents,
  fetchIncidentsNext,
  fetchOrganizations,
  fetchLocations,
  fetchContent,
  fetchMinMaxDate,
};
