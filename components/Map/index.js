import * as dayjs from "dayjs";
import { withRouter } from "next/router";
import React, { Component } from "react";
import MapGL, { Layer, Source, WebMercatorViewport } from "react-map-gl";
import {
  fetchAggregatedIncidents,
  fetchAutocomplete,


  fetchHistogramIncidents, fetchIncidents,
  fetchIncidentsNext,

  fetchLocations
} from "../../utils/networking";
import DateInput from "./DateInput";
import IncidentList from "./IncidentList";
import {
  clusterCountLayer, clusterLayer,

  unclusteredPointLayer,
  unclusteredPointTextLayer
} from "./layers";
import LocationInput from "./LocationInput";
import OrganizationInput from "./OrganizationInput";
import SearchInput from "./SearchInput";





const GERMAN_LAT = [47, 55.4];
const GERMAN_LNG = [4.8, 15.4];

const CENTER_GERMANY = [51.1657, 10.4515];

class Map extends Component {
  constructor(props) {
    super(props);

    const { router } = this.props;

    this.state = {
      mapInitalized: false,
      viewport: {
        latitude: CENTER_GERMANY[0],
        longitude: CENTER_GERMANY[1],
        zoom: 6,
        minZoom: 6,
        bearing: 0,
        pitch: 0,
      },
      bbox:
        router.query.bbox == null
          ? null
          : router.query.bbox.split(",").map((x) => parseFloat(x)),
      aggregatedIncidents: {
        type: "FeatureCollection",
        features: [],
      },
      q: router.query.q == null ? null : router.query.q,
      autocompleteOptions: [],
      startDate:
        router.query.startDate == null
          ? null
          : dayjs(parseInt(router.query.startDate)),
      endDate:
        router.query.endDate == null
          ? null
          : dayjs(parseInt(router.query.endDate)),
      incidentsTimeoutFetch: null,
      incidentsResults: null,
      incidentsCount: null,
      incidentsNext: null,
      incidentsHistogram: null,
      organizationsSelected:
        router.query.organizationsSelected == null
          ? []
          : router.query.organizationsSelected
              .split(",")
              .map((x) => parseInt(x)),
      locationId: null,
      locationOptions: [],
      locationName: null,
    };
  }

  _sourceRef = React.createRef();
  _mapRef = React.createRef();

  async componentDidMount() {
    this._loadAggregatedIncidents();
  }

  async _loadAggregatedIncidents() {
    const { q, startDate, endDate, locationId: location } = this.state;
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
      ? []
      : this.props.organizations
          .map((x) => x.id)
          .filter((x) => !this.state.organizationsSelected.includes(x));

  _stateToUrl = () => {
    let url = "/chronik";
    const params = [];

    [
      "q",
      "startDate",
      "endDate",
      "bbox",
      "locationId",
      "organizationsSelected",
    ].forEach((x) => {
      if (
        this.state[x] != null &&
        (!Array.isArray(this.state[x]) || x.length > 0)
      ) {
        params.push(x + "=" + this.state[x]);
      }
    });

    if (params.length === 0) return url;
    return url + "?" + params.join("&");
  };

  _setStateAndReload = (state) => {
    const { router } = this.props;

    this.setState(state, () => {
      router.replace(this._stateToUrl(), undefined, { shallow: true });
      this._loadAggregatedIncidents();
      this._loadIncidents();
      state.location !== null && this._loadAggregatedIncidents();
    });
  };

  _loadHistogram = async () => {
    const { q, startDate, endDate, bbox, locationId: location } = this.state;
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
    const { q, startDate, endDate, bbox, locationId: location } = this.state;
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

      if (this.state.locationName == null && this.state.locationId != null) {
        this.setState({
          locationName: results[0].location.location_string,
        });
      }
    }
  }

  _loadMoreIncidents = async () => {
    const { incidentsNext, incidentsResults } = this.state;
    const { next, results } = await fetchIncidentsNext(incidentsNext);
    // This is a bug in the infinite scroller component. Normally this should not get called.
    if (next == null) return;
    this.setState({
      incidentsNext: next,
      incidentsResults: incidentsResults.concat(results),
    });
  };

  _delayFetch = () => {
    let { incidentsTimeoutFetch } = this.state;
    incidentsTimeoutFetch && clearTimeout(incidentsTimeoutFetch);

    incidentsTimeoutFetch = setTimeout(() => this._setStateAndReload({}), 2000);
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
    const { locationOptions } = this.state;

    const filetedLocatin = locationOptions.filter((x) => x === value);

    let locationId = null;
    if (filetedLocatin.length !== 0) {
      locationId = filetedLocatin[0].id;
    }

    this._setStateAndReload({
      locationId,
      locationName: value.location_string,
      locationOptions: [],
    });
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
      const { locationId } = this.state;
      if (reason == "clear" || value.length === 0) {
        this.setState({ locationOptions, locationId: null });
      } else {
        if (locationId == null) this.setState({ locationOptions });
        else
          this.setState({
            locationOptions: [],
          });
      }
    }
  };

  _onClick = (event) => {
    const mapboxSource = this._sourceRef.current.getSource();
    if (event.features.length > 0) {
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id;

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
    } else {
      const features = this._mapRef.current.queryRenderedFeatures(event.point, {
        layers: ["unclustered-point", "unclustered-point-text"],
      });
      if (features.length > 0) {
        console.log(features[0].id);
        this._setStateAndReload({ locationId: features[0].id });
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
      locationName,
    } = this.state;

    const { organizations, minMaxDate } = this.props;

    let MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (MAPBOX_TOKEN == null || MAPBOX_TOKEN.length < 3) {
      MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    }

    const sideBarFilter = (
      <div id="sidebar-filter">
        <p>
          Durchsuch die Taten nach Schlagworten wie z. B. Feuer oder Kopf, oder
          such einen Ort aus.
        </p>
        <div className="columns">
          <div className="column">
            <SearchInput
              options={autocompleteOptions}
              cbChange={this._onSearchChange}
              cbInputChange={this._onInputChange}
              value={this.state.q}
            />
          </div>
          <div className="column">
            <LocationInput
              inputValue={locationName}
              options={locationOptions}
              cbChange={this._onLocationChange}
              cbInputChange={this._onInputLocationChange}
              clear={() =>
                this._setStateAndReload({
                  locationId: null,
                  locationName: null,
                })
              }
            />
          </div>
        </div>
        <p className="">Wähle einzelne Organisationen aus.</p>
        <OrganizationInput
          organizations={organizations}
          organizationsSelected={organizationsSelected}
          cbChange={(x) =>
            organizations &&
            x.length < organizations.length &&
            this._setStateAndReload({ organizationsSelected: x })
          }
        />

        <p className="mt-5">
          Wähle aus von wann bis wann die Taten aufgetreten sind.
        </p>

        <DateInput
          minMaxDate={minMaxDate}
          startDate={startDate}
          endDate={endDate}
          startCb={(x) => this._setStateAndReload({ startDate: x })}
          endCb={(x) => this._setStateAndReload({ endDate: x })}
        />
      </div>
    );

    return (
      <>
        <div id="map">
          <MapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/jfilter/ckiuq9h8713g119mq52rus073"
            // mapStyle="mapbox://styles/jfilter/ckf80h3h2521o19pfe9sam2cq"
            // mapStyle="mapbox://styles/jfilter/ckf7yh70g01i11ao1uo2ozug0"
            // mapStyle="http://168.119.114.9:8080/styles/positron/style.json"
            onViewportChange={this._onViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={[clusterLayer.id]}
            onClick={this._onClick}
            ref={this._mapRef}
            dragRotate={false}
            touchRotate={false}
          >
            <Source
              id="incidents"
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
        </div>
        <div id="sidebar">
          <IncidentList
            sideBarFilter={sideBarFilter}
            histogram={incidentsHistogram}
            results={incidentsResults}
            count={incidentsCount}
            next={incidentsNext}
            loadMore={this._loadMoreIncidents}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Map);
