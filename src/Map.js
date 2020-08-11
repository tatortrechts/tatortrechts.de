import * as React from "react";
import { Component } from "react";
import MapGL, { Source, Layer } from "react-map-gl";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

import dotenv from "dotenv";

dotenv.config();

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 40.67,
      longitude: -103.59,
      zoom: 3,
      bearing: 0,
      pitch: 0,
    },
  };

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
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={this._onClick}
      >
        <Source
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
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
