import ky from "ky-universal";

let API_LOCATION = "http://localhost:8000";
if (process.env.NODE_ENV === "production") {
  API_LOCATION = "https://api.rechtegewalt.info";
}

function buildQueryParams(q, startDate, endDate, bbox = null) {
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

  if (bbox != null) {
    bbox.flat().forEach((x) => params.push(`bbox=${x}`));
  }

  if (params.length === 0) return "";
  return "?" + params.join("&");
}

async function fetchAutocomplete(q = null, startDate = null, endDate = null) {
  const paramsString = buildQueryParams(q, startDate, endDate);
  const url = `${API_LOCATION}/autocomplete/${paramsString}`;
  try {
    const apiResponse = await ky.get(url).json();
    return apiResponse.results.map((x) => x.option);
  } catch (e) {
    return [null, e];
  }
}

async function fetchAggregatedIncidents(
  q = null,
  startDate = null,
  endDate = null
) {
  const paramsString = buildQueryParams(q, startDate, endDate);
  const url = `${API_LOCATION}/aggregated_incidents/${paramsString}`;
  try {
    const apiResponse = await ky.get(url).json();
    return apiResponse;
  } catch (e) {
    return [null, e];
  }
}

async function fetchIncidents(
  q = null,
  startDate = null,
  endDate = null,
  bbox = null
) {
  const paramsString = buildQueryParams(q, startDate, endDate, bbox);
  const url = `${API_LOCATION}/incidents/${paramsString}`;
  try {
    const apiResponse = await ky.get(url).json();
    return apiResponse;
  } catch (e) {
    return [null, e];
  }
}

async function fetchIncidentsNext(url) {
  try {
    const apiResponse = await ky.get(url).json();
    return apiResponse;
  } catch (e) {
    return [null, e];
  }
}

export {
  fetchAggregatedIncidents,
  fetchAutocomplete,
  fetchIncidents,
  fetchIncidentsNext,
};
