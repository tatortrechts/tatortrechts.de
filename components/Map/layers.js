export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#bdc9e1",
      50,
      "#74a9cf",
      100,
      "#2b8cbe",
      300,
      "#045a8d",
    ],
    "circle-radius": [
      "step",
      ["get", "point_count"],
      15,
      50,
      25,
      100,
      30,
      300,
      40,
    ],
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#404040",
    "circle-radius": {
      property: "total",
      stops: [
        [0, 8],
        [10, 15],
        [30, 20],
        [100, 30],
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
    "text-field": "{total}",
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
  paint: {
    "text-color": "#ffffff",
  },
};
