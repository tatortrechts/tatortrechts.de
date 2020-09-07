import ky from "ky-universal";

let API_LOCATION = "http://localhost:8000";
if (process.env.NODE_ENV === "production") {
  API_LOCATION = "https://api.rechtegewalt.info";
}

function buildQuery(q, startDate, endDate) {
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

  if (params.length === 0) return "";
  return "?" + params.join("&");
}

async function fetchOptions(q = null, startDate = null, endDate = null) {
  const paramsString = buildQuery(q, startDate, endDate);
  const url = `${API_LOCATION}/autocomplete/${paramsString}`;
  const apiResponse = await ky.get(url).json();
  return apiResponse.results.map((x) => x.string);
}

async function fetchGeoData(q = null, startDate = null, endDate = null) {
  const paramsString = buildQuery(q, startDate, endDate);
  const url = `${API_LOCATION}/aggincidents/${paramsString}`;
  const apiResponse = await ky.get(url).json();
  return apiResponse;
}

export { fetchGeoData, fetchOptions };
