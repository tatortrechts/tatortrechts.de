import React, { Component } from "react";
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
  fetchAggregatedIncidents,
  fetchAutocomplete,
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
    mapInitalized: false,
    viewport: {
      latitude: 52.520645,
      longitude: 13.409779,
      zoom: 6,
      minZoom: 6,
      bearing: 0,
      pitch: 0,
    },
    bbox: null,
    aggregatedIncidents: {
      type: "FeatureCollection",
      features: [],
    },
    q: null,
    autocompleteOptions: [],
    startDate: null,
    endDate: null,
    incidentsTimeoutFetch: null,
    incidentsResults: null,
    incidentsCount: null,
    incidentsNext: null,
  };

  _sourceRef = React.createRef();

  async componentDidMount() {
    this._loadAggregatedIncidents();
  }

  async _loadAggregatedIncidents() {
    const { q, startDate, endDate } = this.state;
    const aggregatedIncidents = await fetchAggregatedIncidents(
      q,
      startDate,
      endDate
    );

    if (aggregatedIncidents.length === 2 && aggregatedIncidents[0] === null) {
      console.error(
        `Could not fetch aggregatedIncidents. ${aggregatedIncidents[1]}`
      );
    } else {
      this.setState({
        aggregatedIncidents,
      });
    }
  }

  _setStateAndReload = (state) => {
    this.setState(state, this._loadAggregatedIncidents);
  };

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

  _loadMoreIncidents = async () => {
    const { incidentsNext, incidentsResults } = this.state;
    const { next, results } = await fetchIncidentsNext(incidentsNext);
    this.setState({
      incidentsNext: next,
      incidentsResults: incidentsResults.concat(results),
    });
  };

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
    if (this.state.mapInitalized) {
      this.setState({ viewport, bbox }, this._delayFetch);
    } else {
      this.setState({ mapInitalized: true });
    }
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

  _onInputChange = async (event) => {
    const autocompleteOptions = await fetchAutocomplete(event.target.value);
    if (autocompleteOptions.length === 2 && autocompleteOptions[0] === null) {
      console.error(
        `Could not fetch autocompleteOptions for autocomplete. ${autocompleteOptions[1]}`
      );
    } else {
      this.setState({ autocompleteOptions });
    }
  };

  render() {
    const {
      viewport,
      aggregatedIncidents,
      incidentsResults,
      incidentsCount,
      incidentsNext,
      startDate,
      endDate,
      autocompleteOptions,
    } = this.state;

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
            data={aggregatedIncidents}
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
            options={autocompleteOptions}
            cbChange={this._onSearchChange}
            cbInputChange={this._onInputChange}
          />
          <DateInput
            startDate={startDate}
            endDate={endDate}
            startCb={(x) => this._setStateAndReload({ startDate: x })}
            endCb={(x) => this._setStateAndReload({ endDate: x })}
          />
        </div>
        <IncidentList
          results={incidentsResults}
          count={incidentsCount}
          next={incidentsNext}
          loadMore={this._loadMoreIncidents}
        />
      </>
    );
  }
}