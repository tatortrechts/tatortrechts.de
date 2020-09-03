import ky from "ky-universal";

const API_LOCATION = "http://localhost:8000";
// const API_LOCATION = "https://api.rechtegewalt.info";

async function fetchOptions(q = null, startDate = null, endDate = null) {
  let whereClause = "";

  if (q != null) {
    whereClause += `?q=${q}'`;
  }

  const url = `${API_LOCATION}/autocomplete/${whereClause}`;
  const apiResponse = await ky.get(url).json();
  return apiResponse.results.map((x) => x.string);
}

async function fetchGeoData(q = null, startDate = null, endDate = null) {
  let whereClause = "";

  if (q != null) {
    whereClause += `?q=${q}'`;
  }

  let url = `${API_LOCATION}/aggincidents/${whereClause}`;

  const apiResponse = await ky.get(url).json();
  return apiResponse;
}

async function fetchData(q = null) {
  const options = await fetchOptions(q);
  const data = await fetchGeoData(q);
  return { data, options };
}

export { fetchData };
