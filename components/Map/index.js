import * as React from "react";
import { Component } from "react";
import ky from "ky-universal";
import MapGL, { Source, Layer } from "react-map-gl";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  unclusteredPointTextLayer,
} from "./layers";

import SearchInput from "./SearchInput";

async function fetchOptions(q = null) {
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

async function fetchGeoData(q = null) {
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

const GERMAN_LAT = [48, 53];
const GERMAN_LNG = [6, 15];

const GERMAN_BOUNDS = [
  [GERMAN_LAT[0], GERMAN_LNG[0]],
  [GERMAN_LAT[1], GERMAN_LNG[1]],
];

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 52.520645,
      longitude: 13.409779,
      zoom: 6,
      minZoom: 6,
      bearing: 0,
      pitch: 0,
    },
    data: {
      type: "FeatureCollection",
      features: [],
    },
    options: [],
    q: null,
  };

  async loadData(q = null) {
    const theData = await fetchData(q);

    this.setState({
      ...theData,
    });
  }

  async componentDidMount() {
    this.loadData();
  }

  _sourceRef = React.createRef();

  _onViewportChange = (viewport) => {
    if (viewport.longitude < GERMAN_LNG[0]) {
      viewport.longitude = GERMAN_LNG[0];
    }
    if (viewport.longitude > GERMAN_LNG[1]) {
      viewport.longitude = GERMAN_LNG[1];
    }
    if (viewport.latitude < GERMAN_LAT[0]) {
      viewport.latitude = GERMAN_LAT[0];
    }
    if (viewport.latitude > GERMAN_LAT[1]) {
      viewport.latitude = GERMAN_LAT[1];
    }

    console.log(viewport);

    this.setState({ viewport });
  };

  _onClick = (event) => {
    if (event.features.length > 0) {
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id;

      const mapboxSource = this._sourceRef.current.getSource();

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        this._onViewportChange({
          ...this.state.viewport,
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          zoom,
          transitionDuration: 500,
        });
      });
    }
  };

  _onSearchChange = (event) => {
    this.setState({ q: event.target.value });
    this.loadData(event.target.value);
  };

  render() {
    const { viewport } = this.state;
    let MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (MAPBOX_TOKEN == null || MAPBOX_TOKEN.length < 3) {
      MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    }

    return (
      <>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={this._onClick}
          maxBounds={GERMAN_BOUNDS}
        >
          <Source
            type="geojson"
            data={this.state.data}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
            ref={this._sourceRef}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
            <Layer {...unclusteredPointTextLayer} />
          </Source>
        </MapGL>
        <SearchInput options={this.state.options} cb={this._onSearchChange} />
      </>
    );
  }
}
