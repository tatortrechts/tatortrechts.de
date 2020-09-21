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
import OrganizationInput from "./OrganizationInput";
import LocationInput from "./LocationInput";

import {
  fetchAggregatedIncidents,
  fetchAutocomplete,
  fetchIncidents,
  fetchIncidentsNext,
  fetchHistogramIncidents,
  fetchLocations,
} from "../../utils/networking";

const GERMAN_LAT = [47, 55.4];
const GERMAN_LNG = [4.8, 15.4];

const CENTER_GERMANY = [51.1657, 10.4515];

class Map extends Component {
  state = {
    mapInitalized: false,
    viewport: {
      latitude: CENTER_GERMANY[0],
      longitude: CENTER_GERMANY[1],
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
    incidentsHistogram: null,
    organizationsSelected: [],
    location: null,
    locationOptions: [],
    locationSelected: null,
  };

  _sourceRef = React.createRef();

  async componentDidMount() {
    this._loadAggregatedIncidents();
  }

  async _loadAggregatedIncidents() {
    const { q, startDate, endDate, location } = this.state;
    const aggregatedIncidents = await fetchAggregatedIncidents(
      q,
      startDate,
      endDate,
      this._getOrganizationIds(),
      location
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

  _getOrganizationIds = () =>
    this.state.organizationsSelected.length === 0
      ? null
      : this.props.organizations
          .map((x) => x.id)
          .filter((x) => !this.state.organizationsSelected.includes(x));

  _setStateAndReload = (state) => {
    this.setState(state, () => {
      this._loadAggregatedIncidents();
      this._loadIncidents();
      state.location !== null && this._loadAggregatedIncidents();
    });
  };

  _loadHistogram = async () => {
    const { q, startDate, endDate, bbox, location } = this.state;
    this.setState({
      incidentsHistogram: await fetchHistogramIncidents(
        q,
        startDate,
        endDate,
        this._getOrganizationIds(),
        bbox,
        location
      ),
    });
  };

  async _loadIncidents() {
    const { q, startDate, endDate, bbox, location } = this.state;
    const incidentsResult = await fetchIncidents(
      q,
      startDate,
      endDate,
      this._getOrganizationIds(),
      bbox,
      location
    );
    if (incidentsResult.length === 2 && incidentsResult[0] === null) {
      console.error(`Could not fetch incidents. ${incidentsResult[1]}`);
    } else {
      const { count, next, results } = incidentsResult;
      this.setState(
        {
          incidentsCount: count,
          incidentsNext: next,
          incidentsResults: results,
        },
        this._loadHistogram
      );
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
    const { longitude, latitude } = this.state.viewport;
    const projection = new WebMercatorViewport(this.state.viewport);
    const bbox = projection.getBounds();

    // http://visgl.github.io/react-map-gl/docs/api-reference/web-mercator-viewport#getboundsoptions
    // Returns:
    // [[lon, lat], [lon, lat]] as the south west and north east corners of the smallest orthogonal bounds that encompasses the visible region.

    if (bbox[0][0] < GERMAN_LNG[0]) {
      console.log("too much left");
      viewport.longitude = Math.max(longitude, viewport.longitude);
    }
    if (bbox[1][0] > GERMAN_LNG[1]) {
      console.log("too much right");
      viewport.longitude = Math.min(longitude, viewport.longitude);
    }
    if (bbox[0][1] < GERMAN_LAT[0]) {
      console.log("too much down");
      viewport.latitude = Math.max(latitude, viewport.latitude);
    }
    if (bbox[1][1] > GERMAN_LAT[1]) {
      console.log("too much up");
      viewport.latitude = Math.min(latitude, viewport.latitude);
    }

    if (this.state.mapInitalized) {
      this.setState({ viewport, bbox }, this._delayFetch);
    } else {
      // initial bbox is strange
      this.setState({ viewport, mapInitalized: true }, this._delayFetch);
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

  _onSearchChange = (_, value) => {
    this._setStateAndReload({ q: value });
  };

  _onInputChange = async (_, value) => {
    const { startDate, endDate } = this.state;
    const autocompleteOptions = await fetchAutocomplete(
      value,
      startDate,
      endDate,
      this._getOrganizationIds()
    );
    if (autocompleteOptions.length === 2 && autocompleteOptions[0] === null) {
      console.error(
        `Could not fetch autocompleteOptions for autocomplete. ${autocompleteOptions[1]}`
      );
    } else {
      this.setState({ autocompleteOptions });
    }
  };

  _onLocationChange = (_, value) => {
    this._setStateAndReload({ location: value, locationOptions: [] });
  };

  _onInputLocationChange = async (_, value, reason) => {
    const { startDate, endDate } = this.state;
    const locationOptions = await fetchLocations(
      value,
      startDate,
      endDate,
      this._getOrganizationIds()
    );
    if (locationOptions.length === 2 && locationOptions[0] === null) {
      console.error(
        `Could not fetch locationOptions for autocomplete. ${locationOptions[1]}`
      );
    } else {
      const { location } = this.state;
      if (reason == "clear" || value.length === 0) {
        this.setState({ locationOptions, location: null });
      } else {
        if (location == null) this.setState({ locationOptions });
        else
          this.setState({
            locationOptions: [],
          });
      }
    }
  };

  render() {
    const {
      viewport,
      aggregatedIncidents,
      incidentsHistogram,
      incidentsResults,
      incidentsCount,
      incidentsNext,
      startDate,
      endDate,
      autocompleteOptions,
      organizationsSelected,
      locationOptions,
    } = this.state;

    const { organizations } = this.props;

    let MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (MAPBOX_TOKEN == null || MAPBOX_TOKEN.length < 3) {
      MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    }

    return (
      <>
        <MapGL
          {...viewport}
          width="50%"
          height="100%"
          mapStyle="mapbox://styles/jfilter/ckf80h3h2521o19pfe9sam2cq"
          // mapStyle="mapbox://styles/jfilter/ckf7yh70g01i11ao1uo2ozug0"
          // mapStyle="http://168.119.114.9:8080/styles/positron/style.json"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={this._onClick}
        >
          <Source
            type="geojson"
            data={aggregatedIncidents}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
            clusterProperties={{
              sum: ["+", ["get", "total"], ["get", "sum"]],
            }}
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
          <OrganizationInput
            organizations={organizations}
            organizationsSelected={organizationsSelected}
            cbChange={(x) =>
              this._setStateAndReload({ organizationsSelected: x })
            }
          />
          <LocationInput
            options={locationOptions}
            cbChange={this._onLocationChange}
            cbInputChange={this._onInputLocationChange}
          />
        </div>
        <IncidentList
          histogram={incidentsHistogram}
          results={incidentsResults}
          count={incidentsCount}
          next={incidentsNext}
          loadMore={this._loadMoreIncidents}
        />
      </>
    );
  }
}

export default Map;
