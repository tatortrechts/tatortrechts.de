import * as dayjs from "dayjs";
import { withRouter } from "next/router";
import React from "react";
import MapGL, {
  CanvasOverlay,
  Layer,
  Source,
  WebMercatorViewport,
} from "react-map-gl";
import { extractShortAddress } from "../../utils/labels";
import { round } from "../../utils/math";
import {
  fetchAggregatedIncidents,
  fetchAutocomplete,
  fetchHistogramIncidents,
  fetchIncidents,
  fetchIncidentsNext,
  fetchLocations,
} from "../../utils/networking";
import DateInput from "./DateInput";
import IncidentList from "./IncidentList";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
  unclusteredPointTextLayer,
} from "./layers";
import LocationInput from "./LocationInput";
import OrganizationInput from "./OrganizationInput";
import SearchInput from "./SearchInput";

const GERMAN_LAT = [47, 55.4];
const GERMAN_LNG = [4.8, 15.4];
const CENTER_GERMANY = [51.1657, 10.4515];

// TODO: re-structure in more components

class Map extends React.Component {
  constructor(props) {
    super(props);

    const { router } = this.props;

    this.state = {
      mapInitalized: false,
      viewport: {
        latitude: CENTER_GERMANY[0],
        longitude: CENTER_GERMANY[1],
        zoom: 6,
        minZoom: 5,
        bearing: 0,
        pitch: 0,
      },
      lastViewport: null,
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
              .map((x) => parseInt(x))
              .filter((x) => x),
      locationId: null,
      locationOptions: [],
      highlightPointMap: null,
      hoverInfo: null,
      hoverClusters: null,
    };
  }

  _sourceRef = React.createRef();
  _mapRef = React.createRef();

  async componentDidMount() {
    this._loadAggregatedIncidents();
    setInterval(this._viewPointCheck, 1000);
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
    let url = "/karte";
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

  _viewPointCheck = () => {
    const { viewport, lastViewport } = this.state;

    if (viewport == lastViewport) return;

    // const { longitude, latitude } = viewport;

    const projection = new WebMercatorViewport(viewport);
    const bbox = projection.getBounds();

    bbox[0] = bbox[0].map((x) => x.toFixed(5));
    bbox[1] = bbox[1].map((x) => x.toFixed(5));

    this._setStateAndReload({ bbox, lastViewport: viewport });

    // http://visgl.github.io/react-map-gl/docs/api-reference/web-mercator-viewport#getboundsoptions
    // Returns:
    // [[lon, lat], [lon, lat]] as the south west and north east corners of the smallest orthogonal bounds that encompasses the visible region.

    // let allCool = true;
    // if (bbox[0][0] < GERMAN_LNG[0]) {
    //   process.env.NODE_ENV === "development" && console.log("too much left");
    //   allCool = false;
    //   // viewport.longitude = Math.max(longitude, viewport.longitude);
    // }
    // if (bbox[1][0] > GERMAN_LNG[1]) {
    //   process.env.NODE_ENV === "development" && console.log("too much right");
    //   allCool = false;
    //   // viewport.longitude = Math.min(longitude, viewport.longitude);
    // }
    // if (bbox[0][1] < GERMAN_LAT[0]) {
    //   process.env.NODE_ENV === "development" && console.log("too much down");
    //   allCool = false;
    //   // viewport.latitude = Math.max(latitude, viewport.latitude);
    // }
    // if (bbox[1][1] > GERMAN_LAT[1]) {
    //   process.env.NODE_ENV === "development" && console.log("too much up");
    //   allCool = false;
    //   // viewport.latitude = Math.min(latitude, viewport.latitude);
    // }

    // if (allCool) {
    //   this._setStateAndReload({ bbox, goodViewport: viewport });
    // } else {
    //   const projection2 = new WebMercatorViewport(this.state.goodViewport);
    //   const bbox2 = projection2.getBounds();

    //   this._setStateAndReload({
    //     viewport: this.state.goodViewport,
    //     bbox: bbox2,
    //   });
    // }

    // if (this.state.mapInitalized) {
    //   this._setStateAndReload({ viewport, bbox });
    // } else {
    //   // initial bbox is strange
    //   this._setStateAndReload({ viewport, mapInitalized: true });
    // }
  };

  _onViewportChange = (viewport) => {
    this.setState({ viewport });
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
    const { initLocationOptions } = this.props;

    const selectedLocation = locationOptions
      .concat(initLocationOptions)
      .filter((x) => x === value);

    let locationId = null;
    if (selectedLocation.length !== 0) {
      locationId = selectedLocation[0].id;
    }

    this._setStateAndReload({
      locationId,
      locationOptions: [],
    });
  };

  _fetchLocations = async (value) => {
    const { startDate, endDate } = this.state;
    const locationOptions = await fetchLocations(
      value,
      startDate,
      endDate,
      this._getOrganizationIds()
    );
    return locationOptions;
  };

  _onInputLocationChange = async (_, value, reason) => {
    const locationOptions = await this._fetchLocations(value);
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

  _redrawHighlight = ({ width, height, ctx, project }) => {
    const { highlightPointMap } = this.state;

    ctx.clearRect(0, 0, width, height);
    const dotRadius = 10;
    const dotFill = "orange";
    if (highlightPointMap) {
      for (const location of [highlightPointMap]) {
        const pixel = project(location);
        const pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
        if (
          pixelRounded[0] + dotRadius >= 0 &&
          pixelRounded[0] - dotRadius < width &&
          pixelRounded[1] + dotRadius >= 0 &&
          pixelRounded[1] - dotRadius < height
        ) {
          ctx.fillStyle = dotFill;
          ctx.beginPath();
          ctx.arc(pixelRounded[0], pixelRounded[1], dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  _onClick = (event) => {
    this._clearHover();
    const feature = event.features[0];
    if (feature == null) return;

    // removing this for now, because the behavior was strange

    // if ("cluster_id" in feature.properties) {
    // const mapboxSource = this._sourceRef.current.getSource();
    //   const clusterId = feature.properties.cluster_id;

    //   mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
    //     if (err) {
    //       return;
    //     }

    //     this._onViewportChange({
    //       ...this.state.viewport,
    //       longitude: feature.geometry.coordinates[0],
    //       latitude: feature.geometry.coordinates[1],
    //       zoom,
    //       transitionDuration: 500,
    //     });
    //   });
    // } else {
    //   this._onViewportChange({
    //     ...this.state.viewport,
    //     longitude: feature.geometry.coordinates[0],
    //     latitude: feature.geometry.coordinates[1],
    //     zoom: this.state.viewport.zoom + 1,
    //     transitionDuration: 500,
    //   });
    // }

    this._onViewportChange({
      ...this.state.viewport,
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
      zoom: this.state.viewport.zoom + 1,
      transitionDuration: 1000,
    });
  };

  // don't use onHover for perf reasons
  _onMouseEnter = (event) => {
    const {
      srcEvent: { offsetX, offsetY },
    } = event;

    const w = window.innerWidth;

    const features = this._mapRef.current.queryRenderedFeatures(event.point, {
      layers: [clusterLayer.id, unclusteredPointLayer.id],
    });

    const hoveredFeature = features && features[0];

    // show toolip bottom if mouse is too much right (because it would overlap)

    const x = offsetX / (w / 2) < 0.8 ? offsetX + 10 : offsetX - 100;
    const y = offsetX / (w / 2) < 0.8 ? offsetY : offsetY + 20;

    this.setState({
      hoverInfo: hoveredFeature
        ? {
            feature: hoveredFeature,
            x,
            y,
          }
        : null,
    });
  };

  _clearHover = () => {
    this.setState({ hoverInfo: null, hoverClusters: null });
  };

  _renderTooltip = (hoverInfo) => {
    let notShownRows = [];
    let tableRows = [];
    if ("cluster_id" in hoverInfo.feature.properties) {
      const mapboxSource = this._sourceRef.current.getSource();
      const clusterId = hoverInfo.feature.properties.cluster_id;

      mapboxSource.getClusterLeaves(clusterId, 100000000, 0, (_, clusters) => {
        if (clusters != null) {
          this.setState({
            hoverClusters: clusters
              .map((x) => x.properties)
              .sort((a, b) => b.total - a.total),
          });
        }
      });

      if (!this.state.hoverClusters) return null;

      tableRows = this.state.hoverClusters.slice(0, 5);
      notShownRows = this.state.hoverClusters.slice(5);
    } else {
      tableRows = [hoverInfo.feature.properties];
    }

    return (
      <div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
        <div>
          <table className="table is-narrow">
            <thead>
              <tr>
                <th>Taten</th>
                <th>Ort</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((x, i) => {
                return (
                  <tr key={i}>
                    <td>{x.total}</td>
                    <td>{extractShortAddress(x)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {notShownRows.length > 0 && (
            <p>
              ...und weitere{" "}
              {notShownRows.map((x) => x.total).reduce((a, b) => a + b)} Taten
              an {notShownRows.length} Orten.
            </p>
          )}
        </div>
      </div>
    );
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
      highlightPointMap,
      hoverInfo,
    } = this.state;

    const {
      organizations,
      minMaxDate,
      initLocationOptions,
      initAutocompleteOptions,
    } = this.props;

    // FIXME
    let MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (MAPBOX_TOKEN == null || MAPBOX_TOKEN.length < 3) {
      MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
    }

    const sideBarFilter = (
      <div className="box" id="sidebar-filter">
        <p className="is-size-7">
          Durchsuch die Taten nach Schlagworten wie z. B. "Feuer" oder "Schlag",
          oder wähl einen Ort aus.
        </p>
        <div className="columns">
          <div className="column">
            <SearchInput
              options={
                autocompleteOptions.length > 0
                  ? autocompleteOptions
                  : initAutocompleteOptions
              }
              cbChange={this._onSearchChange}
              cbInputChange={this._onInputChange}
              value={this.state.q}
            />
          </div>
          <div className="column">
            <LocationInput
              options={
                locationOptions.length > 0
                  ? locationOptions
                  : initLocationOptions
              }
              cbChange={this._onLocationChange}
              cbInputChange={this._onInputLocationChange}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <p className="is-size-7">Zeitraum eingrenzen</p>

            <DateInput
              minMaxDate={minMaxDate}
              startDate={startDate}
              endDate={endDate}
              startCb={(x) => this._setStateAndReload({ startDate: x })}
              endCb={(x) => this._setStateAndReload({ endDate: x })}
            />
          </div>
          <div className="column">
            <p className="is-size-7 mb-4">Organisationen auswählen</p>
            <OrganizationInput
              organizations={organizations}
              organizationsSelected={organizationsSelected}
              cbChange={(x) =>
                organizations &&
                x.length < organizations.length &&
                this._setStateAndReload({ organizationsSelected: x })
              }
            />
          </div>
        </div>
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
            onTransitionEnd={this._viewPointCheck}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
            onClick={this._onClick}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._clearHover}
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
              clusterRadius={40}
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
            {hoverInfo && this._renderTooltip(hoverInfo)}
            {highlightPointMap && (
              <CanvasOverlay redraw={this._redrawHighlight} />
            )}
          </MapGL>
        </div>
        <div id="sidebar">
          <IncidentList
            sideBarFilter={sideBarFilter}
            histogram={incidentsHistogram}
            results={incidentsResults}
            count={incidentsCount}
            next={incidentsNext}
            minMaxDate={minMaxDate}
            numOrganizations={organizations.length}
            loadMore={this._loadMoreIncidents}
            setHighlight={(x) => this.setState({ highlightPointMap: x })}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Map);
