import ky from "ky-universal";

let API_LOCATION = "http://localhost:8000";
if (process.env.NODE_ENV === "production") {
  API_LOCATION = "https://api.rechtegewalt.info";
}

function buildQueryParams(q, startDate, endDate, chronicles, bbox) {
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

  if (params.length === 0) return "";
  return "?" + params.join("&");
}

async function _fetch(
  endpoint,
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  bbox = null
) {
  const paramsString = buildQueryParams(
    q,
    startDate,
    endDate,
    chronicles,
    bbox
  );
  const url = `${API_LOCATION}/${endpoint}/${paramsString}`;
  try {
    const apiResponse = await ky.get(url).json();
    return apiResponse;
  } catch (e) {
    return [null, e];
  }
}

async function fetchAutocomplete(q = null, startDate = null, endDate = null) {
  const r = await _fetch("autocomplete", q, startDate, endDate);
  if (r.length === 2 && r[0] === null) return r;
  else return r.results.map((x) => x.option);
}

function fetchAggregatedIncidents(
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null
) {
  return _fetch("aggregated_incidents", q, startDate, endDate, chronicles);
}

function fetchIncidents(
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  bbox = null
) {
  return _fetch("incidents", q, startDate, endDate, chronicles, bbox);
}

function fetchHistogramIncidents(
  q = null,
  startDate = null,
  endDate = null,
  chronicles = null,
  bbox = null
) {
  return _fetch("histogram_incidents", q, startDate, endDate, chronicles, bbox);
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
};
