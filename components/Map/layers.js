const stepsCount = [100, 500, 1000];
const stepsSize = [12, 15, 19, 23];
const stepsColor = ["#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"];

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

export const clusterLayer = {
  // beforeId: 'settlement-minor-label',
  id: "clusters",
  type: "circle",
  source: "incidents",
  filter: ["has", "point_count"],
  paint: {
    "circle-opacity": 0.5,
    "circle-color": [
      "step",
      ["get", "sum"],
      stepsColor[0],
      stepsCount[0],
      stepsColor[1],
      stepsCount[1],
      stepsColor[2],
      stepsCount[2],
      stepsColor[3],
    ],
    "circle-radius": [
      "step",
      ["get", "sum"],
      stepsSize[0],
      stepsCount[0],
      stepsSize[1],
      stepsCount[1],
      stepsSize[2],
      stepsCount[2],
      stepsSize[3],
    ],
  },
};

export const clusterCountLayer = {
  // beforeId: 'settlement-minor-label',
  id: "cluster-count",
  type: "symbol",
  source: "incidents",
  filter: ["has", "point_count"],
  layout: {
    "text-ignore-placement": true,
    "text-field": "{sum}",
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  // beforeId: 'settlement-minor-label',
  id: "unclustered-point",
  type: "circle",
  source: "incidents",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-opacity": 0.5,
    "circle-radius": {
      property: "total",
      stops: [
        [0, stepsSize[0]],
        [stepsCount[0], stepsSize[1]],
        [stepsCount[1], stepsSize[2]],
        [stepsCount[2], stepsSize[3]],
      ],
    },
    "circle-color": {
      property: "total",
      stops: zip(stepsCount, stepsColor),
    },
  },
};

export const unclusteredPointTextLayer = {
  // beforeId: 'settlement-minor-label',
  id: "unclustered-point-text",
  type: "symbol",
  source: "incidents",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "text-ignore-placement": true,
    "text-field": "{total}",
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};
