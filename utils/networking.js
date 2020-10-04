import ky from "ky-universal";

let API_LOCATION = "http://localhost:8000";

if (process.env.NODE_ENV === "production") {
  API_LOCATION = "https://api.rechtegewalt.info";
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

export {
  fetchAggregatedIncidents,
  fetchAutocomplete,
  fetchIncidents,
  fetchHistogramIncidents,
  fetchIncidentsNext,
  fetchOrganizations,
  fetchLocations,
};
