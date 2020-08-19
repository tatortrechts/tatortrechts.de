import * as React from "react";
import { Component } from "react";
import ky from "ky";
import MapGL, { Source, Layer } from "react-map-gl";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

import SearchInput from "./SearchInput";

import dotenv, { load } from "dotenv";

dotenv.config();

async function getData(q = null) {
  let url =
    "https://data.rechtegewalt.info/rechtegewalt.json?sql=select%0D%0A++id%2C%0D%0A++title%2C%0D%0A++AsGeoJSON%28point_geom%29%0D%0Afrom%0D%0A++incidents";

  if (q != null) {
    url += `+where+title+like+'%25${q}%25'`;
  }

  const apiResponse = await ky.get(url).json();
  const features = apiResponse.rows.map((x) => {
    return {
      geometry: JSON.parse(x[2]),
      properties: { id: x[0], title: x[1] },
      type: "Feature",
    };
  });
  const optionsArray = apiResponse.rows
    .map((x) => x[1])
    .filter((x) => x != null);
  const optionsSet = new Set();
  optionsArray.forEach((x) => {
    x.split(" ").forEach((xx) => optionsSet.add(xx));
  });

  const data = {
    type: "FeatureCollection",
    features,
  };

  return { options: Array.from(optionsSet), data };
}

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 52.520645,
      longitude: 13.409779,
      zoom: 4,
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
    const theData = await getData(q);

    this.setState({
      ...theData,
    });
  }

  async componentDidMount() {
    this.loadData();
  }

  _sourceRef = React.createRef();

  _onViewportChange = (viewport) => this.setState({ viewport });

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
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX;

    return (
      <>
        <MapGL
          {...viewport}
          width="100%"
          height="80%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={this._onClick}
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
          </Source>
        </MapGL>
        <SearchInput options={this.state.options} cb={this._onSearchChange} />
      </>
    );
  }
}
