import * as React from "react";
import { Component } from "react";
import MapGL, { Source, Layer, WebMercatorViewport } from "react-map-gl";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  unclusteredPointTextLayer,
} from "./layers";

import SearchInput from "./SearchInput";
import DateInput from "./DateInput";
import IncidentList from "./IncidentList";

import {
  fetchGeoData,
  fetchOptions,
  fetchIncidents,
  fetchIncidentsNext,
} from "../../utils/networking";

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
    startDate: null,
    endDate: null,
    bbox: null,
    incidentsTimeoutFetch: null,
    incidentsResults: null,
    incidentsCount: null,
    incidentsNext: null,
  };

  async loadData() {
    const { q, startDate, endDate } = this.state;
    const data = await fetchGeoData(q, startDate, endDate);

    if (data.length === 2 && data[0] === null) {
      console.error(`Could not fetch data. ${data[1]}`);
    } else {
      this.setState({
        data,
      });
    }
  }

  async componentDidMount() {
    this.loadData();
  }

  _sourceRef = React.createRef();

  async _loadIncidents() {
    const { q, startDate, endDate, bbox } = this.state;
    const incidentsResult = await fetchIncidents(q, startDate, endDate, bbox);
    if (incidentsResult.length === 2 && incidentsResult[0] === null) {
      console.error(`Could not fetch incidents. ${incidentsResult[1]}`);
    } else {
      const { count, next, results } = incidentsResult;
      this.setState({
        incidentsCount: count,
        incidentsNext: next,
        incidentsResults: results,
      });
    }
  }

  _delayFetch = () => {
    let { incidentsTimeoutFetch } = this.state;
    incidentsTimeoutFetch && clearTimeout(incidentsTimeoutFetch);

    incidentsTimeoutFetch = setTimeout(() => this._loadIncidents(), 2000);
    this.setState({ incidentsTimeoutFetch });
  };

  _onViewportChange = (viewport) => {
    const projection = new WebMercatorViewport(this.state.viewport);
    const bbox = projection.getBounds();

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

    this.setState({ viewport, bbox }, this._delayFetch);
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
    this._setStateAndReload({ q: event.target.value });
  };

  _loadMoreIncidents = async () => {
    const { next, results } = await fetchIncidentsNext(
      this.state.incidentsNext
    );
    this.setState({
      incidentsNext: next,
      incidentsResults: this.state.incidentsResults.concat(results),
    });
  };

  _onInputChange = async (event) => {
    const options = await fetchOptions(event.target.value);
    if (options.length === 2 && options[0] === null) {
      console.error(`Could not fetch options for autocomplete. ${options[1]}`);
    } else {
      this.setState({ options });
    }
  };

  _setStateAndReload = (state) => {
    this.setState(state, this.loadData);
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
        <div id="sidebar-filter">
          <SearchInput
            options={this.state.options}
            cbChange={this._onSearchChange}
            cbInputChange={this._onInputChange}
          />
          <DateInput
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            startCb={(x) => this._setStateAndReload({ startDate: x })}
            endCb={(x) => this._setStateAndReload({ endDate: x })}
          />
        </div>
        <IncidentList
          results={this.state.incidentsResults || null}
          count={this.state.incidentsCount}
          next={this.state.incidentsNext}
          loadMore={this._loadMoreIncidents}
        />
      </>
    );
  }
}
