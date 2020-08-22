export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "grey",
    "circle-radius": {
      property: "count",
      stops: [
        [0, 8],
        [10, 20],
        [30, 30],
        [100, 50],
      ],
    },
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export const unclusteredPointTextLayer = {
  id: "unclustered-point-text",
  type: "symbol",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "text-field": "{count}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};
