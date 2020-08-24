import ky from "ky-universal";

async function fetchOptions(q = null, startDate = null, endDate = null) {
  let whereClause = "";

  if (q != null) {
    whereClause = `+where+title+like+'%25${q}%25'`;
  }

  let url = `https://data.rechtegewalt.info/rechtegewalt.json?sql=select+id%2C+title%2C+subdivisions%2C+date+from+incidents+${whereClause}`;

  const apiResponse = await ky.get(url).json();

  const optionsArray = apiResponse.rows
    .map((x) => x[1])
    .filter((x) => x != null);

  const optionsSet = new Set();
  optionsArray.forEach((x) => {
    x.split(" ").forEach((xx) => optionsSet.add(xx));
  });

  return Array.from(optionsSet);
}

async function fetchGeoData(q = null, startDate = null, endDate = null) {
  let whereClause = "";

  if (q != null) {
    whereClause = `+where+title+like+'%25${q}%25'`;
  }

  let url = `https://data.rechtegewalt.info/rechtegewalt.json?sql=select+count%28*%29%2C+subdivisions%2C%0D%0A++AsGeoJSON%28point_geom%29%0D%0Afrom%0D%0A+incidents+${whereClause}+group+by+subdivisions`;

  const apiResponse = await ky.get(url).json();
  const features = apiResponse.rows.map((x) => {
    return {
      geometry: JSON.parse(x[2]),
      properties: { count: x[0], location: x[1] },
      type: "Feature",
    };
  });

  const data = {
    type: "FeatureCollection",
    features,
  };

  return data;
}

async function fetchData(q = null) {
  const options = await fetchOptions(q);
  const data = await fetchGeoData(q);
  return { data, options };
}

export { fetchData };
