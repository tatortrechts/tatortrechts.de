import * as React from "react";
import { Component } from "react";
import ky from "ky";
import MapGL, { Source, Layer } from "react-map-gl";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

import dotenv from "dotenv";

dotenv.config();

async function getData() {
  const url =
    "https://data.rechtegewalt.info/rechtegewalt.json?sql=select%0D%0A++id%2C%0D%0A++title%2C%0D%0A++AsGeoJSON%28point_geom%29%0D%0Afrom%0D%0A++incidents";

  const data = await ky.get(url).json();
  const features = data.rows.map((x) => {
    return { geometry: JSON.parse(x[2]), id: x[0], title: x[1] };
  });
  return {
    type: "FeatureCollection",
    features,
  };
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
  };

  async componentDidMount() {
    const data = await getData();

    this.setState({
      data,
    });
  }

  _sourceRef = React.createRef();

  _onViewportChange = (viewport) => this.setState({ viewport });

  _onClick = (event) => {
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
  };

  render() {
    const { viewport } = this.state;
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX;

    return (
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
    );
  }
}
