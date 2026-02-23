import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapGL, { Layer, Marker, Source } from "react-map-gl";
import { WebMercatorViewport } from "@math.gl/web-mercator";
import { extractShortAddress } from "../../utils/labels";
import {
  fetchAggregatedIncidents,
  fetchAutocomplete,
  fetchHistogramIncidents,
  fetchIncidents,
  fetchIncidentsNext,
  fetchLocations,
} from "../../utils/networking";
import { theme } from "../../utils/style";
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

const CENTER_GERMANY = [51.1657, 10.4515];

const baseInitialViewport = {
  latitude: CENTER_GERMANY[0],
  longitude: CENTER_GERMANY[1],
  zoom: 5.5,
  minZoom: 5.5,
  bearing: 0,
  pitch: 0,
};

// TODO: re-structure in more components
// I'm really sorry if you have to deal with this mess. ;/

const widthToViewport = (width) => {
  if (width < 500) {
    return { ...baseInitialViewport, zoom: 4, minZoom: 4 };
  }
  if (width < 1000) {
    return { ...baseInitialViewport, zoom: 4.6, minZoom: 4.6 };
  }
  if (width < 1600) {
    return { ...baseInitialViewport, zoom: 5.2, minZoom: 5.2 };
  }
  return baseInitialViewport;
};

export default function Map({
  organizations,
  minMaxDate,
  initLocationOptions,
  initAutocompleteOptions,
}) {
  const router = useRouter();
  const mapRef = useRef(null);
  const sourceRef = useRef(null);

  // Parse initial state from URL query params
  const [initialViewport, setInitialViewport] = useState(null);
  const [viewState, setViewState] = useState(null);
  const [lastViewport, setLastViewport] = useState(null);
  const [bbox, setBbox] = useState(
    router.query.bbox == null
      ? null
      : router.query.bbox.split(",").map((x) => parseFloat(x))
  );
  const [aggregatedIncidents, setAggregatedIncidents] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [q, setQ] = useState(router.query.q == null ? null : router.query.q);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [startDate, setStartDate] = useState(
    router.query.startDate == null
      ? null
      : dayjs(parseInt(router.query.startDate))
  );
  const [endDate, setEndDate] = useState(
    router.query.endDate == null ? null : dayjs(parseInt(router.query.endDate))
  );
  const [incidentsResults, setIncidentsResults] = useState(null);
  const [incidentsCount, setIncidentsCount] = useState(null);
  const [incidentsNext, setIncidentsNext] = useState(null);
  const [incidentsHistogram, setIncidentsHistogram] = useState(null);
  const [organizationsSelected, setOrganizationsSelected] = useState(
    router.query.organizationsSelected == null
      ? []
      : router.query.organizationsSelected
          .split(",")
          .map((x) => parseInt(x))
          .filter((x) => x)
  );
  const [locationId, setLocationId] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [highlightPointMap, setHighlightPointMap] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [hoverClusters, setHoverClusters] = useState(null);
  const [filterExpanded, setFilterExpanded] = useState(false);

  // Use refs for values needed in intervals/callbacks to avoid stale closures
  const stateRef = useRef({});
  stateRef.current = {
    q,
    startDate,
    endDate,
    organizationsSelected,
    bbox,
    locationId,
    viewState,
    lastViewport,
    initialViewport,
  };

  const getOrganizationIds = useCallback(() => {
    const orgSelected = stateRef.current.organizationsSelected;
    if (orgSelected.length === 0) return [];
    return organizations
      .map((x) => x.id)
      .filter((x) => !orgSelected.includes(x));
  }, [organizations]);

  const loadAggregatedIncidents = useCallback(async () => {
    const { q, startDate, endDate, locationId } = stateRef.current;
    const result = await fetchAggregatedIncidents(
      q,
      startDate,
      endDate,
      getOrganizationIds(),
      locationId
    );
    if (result.length === 2 && result[0] === null) {
      console.error(`Could not fetch aggregatedIncidents. ${result[1]}`);
    } else {
      setAggregatedIncidents(result);
    }
  }, [getOrganizationIds]);

  const loadHistogram = useCallback(async () => {
    const { q, startDate, endDate, bbox, locationId } = stateRef.current;
    const result = await fetchHistogramIncidents(
      q,
      startDate,
      endDate,
      getOrganizationIds(),
      bbox,
      locationId
    );
    if (result.length === 2 && result[0] === null) {
      console.error(`Could not fetch histogram. ${result[1]}`);
    } else {
      setIncidentsHistogram(result);
    }
  }, [getOrganizationIds]);

  const loadIncidents = useCallback(async () => {
    const { q, startDate, endDate, bbox, locationId } = stateRef.current;
    const result = await fetchIncidents(
      q,
      startDate,
      endDate,
      getOrganizationIds(),
      bbox,
      locationId
    );
    if (result.length === 2 && result[0] === null) {
      console.error(`Could not fetch incidents. ${result[1]}`);
    } else {
      const { count, next, results } = result;
      setIncidentsCount(count);
      setIncidentsNext(next);
      setIncidentsResults(results);
    }
  }, [getOrganizationIds]);

  // After incidents load, load histogram
  useEffect(() => {
    if (incidentsResults !== null) {
      loadHistogram();
    }
  }, [incidentsResults, loadHistogram]);

  const stateToUrl = useCallback(() => {
    let url = "/karte";
    const params = [];
    const state = stateRef.current;

    const fields = {
      q: state.q,
      startDate: state.startDate,
      endDate: state.endDate,
      bbox: state.bbox,
      locationId: state.locationId,
      organizationsSelected: state.organizationsSelected,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value != null && (!Array.isArray(value) || value.length > 0)) {
        params.push(key + "=" + value);
      }
    });

    if (params.length === 0) return url;
    return url + "?" + params.join("&");
  }, []);

  const setStateAndReload = useCallback(
    (updates) => {
      // Apply all state updates
      if ("q" in updates) setQ(updates.q);
      if ("startDate" in updates) setStartDate(updates.startDate);
      if ("endDate" in updates) setEndDate(updates.endDate);
      if ("bbox" in updates) setBbox(updates.bbox);
      if ("locationId" in updates) setLocationId(updates.locationId);
      if ("organizationsSelected" in updates)
        setOrganizationsSelected(updates.organizationsSelected);
      if ("locationOptions" in updates)
        setLocationOptions(updates.locationOptions);
      if ("hoverInfo" in updates) setHoverInfo(updates.hoverInfo);
      if ("hoverClusters" in updates) setHoverClusters(updates.hoverClusters);
      if ("filterExpanded" in updates)
        setFilterExpanded(updates.filterExpanded);
      if ("lastViewport" in updates) setLastViewport(updates.lastViewport);
      if ("highlightPointMap" in updates)
        setHighlightPointMap(updates.highlightPointMap);

      // Update stateRef immediately for the reload calls
      Object.assign(stateRef.current, updates);

      // Update URL
      setTimeout(() => {
        router.replace(stateToUrl(), undefined, { shallow: true });
      }, 0);

      // Reload data
      loadAggregatedIncidents();
      loadIncidents();
    },
    [router, stateToUrl, loadAggregatedIncidents, loadIncidents]
  );

  // Initialize viewport on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const vp = widthToViewport(window.innerWidth);
      setInitialViewport(vp);
      setViewState(vp);
    }
  }, []);

  // Initial data load and viewport check interval
  useEffect(() => {
    if (viewState === null) return;

    loadAggregatedIncidents();

    const interval = setInterval(() => {
      const { viewState: vs, lastViewport: lv } = stateRef.current;
      if (vs == null || vs === lv) return;

      const projection = new WebMercatorViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        ...vs,
      });
      const bounds = projection.getBounds();
      const newBbox = [
        bounds[0].map((x) => x.toFixed(5)),
        bounds[1].map((x) => x.toFixed(5)),
      ];

      setStateAndReload({
        bbox: newBbox,
        lastViewport: vs,
        hoverInfo: null,
        hoverClusters: null,
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewState !== null]);

  const handleReset = useCallback(() => {
    const iv = stateRef.current.initialViewport;
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [iv.longitude, iv.latitude],
        zoom: iv.zoom,
        duration: 5000,
      });
    }

    setStateAndReload({
      lastViewport: null,
      bbox: null,
      q: null,
      startDate: null,
      endDate: null,
      organizationsSelected: [],
      locationId: null,
      hoverInfo: null,
    });
  }, [setStateAndReload]);

  const handleSearchChange = useCallback(
    (_, value) => {
      setStateAndReload({ q: value });
    },
    [setStateAndReload]
  );

  const handleInputChange = useCallback(
    async (_, value) => {
      const result = await fetchAutocomplete(
        value,
        stateRef.current.startDate,
        stateRef.current.endDate,
        getOrganizationIds()
      );
      if (result.length === 2 && result[0] === null) {
        console.error(
          `Could not fetch autocompleteOptions for autocomplete. ${result[1]}`
        );
      } else {
        setAutocompleteOptions(result);
      }
    },
    [getOrganizationIds]
  );

  const handleLocationChange = useCallback(
    (_, value) => {
      const allOptions = locationOptions.concat(initLocationOptions);
      const selectedLocations = allOptions.filter((x) => x === value);

      let selectedLocation = null;
      if (selectedLocations.length !== 0) {
        selectedLocation = selectedLocations[0];
      }

      if (selectedLocation === null) {
        setStateAndReload({ locationOptions: [] });
        return;
      }

      const longitude = selectedLocation["geolocation"]["coordinates"][0];
      const latitude = selectedLocation["geolocation"]["coordinates"][1];

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 10,
          duration: 3000,
        });
      }

      setStateAndReload({ locationOptions: [] });
    },
    [locationOptions, initLocationOptions, setStateAndReload]
  );

  const handleInputLocationChange = useCallback(
    async (_, value) => {
      if (value == null || value === "") return;
      const result = await fetchLocations(
        value,
        stateRef.current.startDate,
        stateRef.current.endDate,
        getOrganizationIds()
      );
      if (result.length === 2 && result[0] === null) {
        console.error(
          `Could not fetch locationOptions for autocomplete. ${result[1]}`
        );
      } else {
        setLocationOptions(result);
      }
    },
    [getOrganizationIds]
  );

  const handleMapClick = useCallback(
    (event) => {
      setHoverInfo(null);
      setHoverClusters(null);
      const feature = event.features && event.features[0];
      if (feature == null) return;

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: feature.geometry.coordinates,
          zoom: (stateRef.current.viewState?.zoom || 5) + 1,
          duration: 1000,
        });
      }
    },
    []
  );

  const handleMouseEnter = useCallback((event) => {
    const { originalEvent } = event;
    const offsetX = originalEvent?.offsetX || 0;
    const offsetY = originalEvent?.offsetY || 0;
    const w = window.innerWidth;

    const features =
      mapRef.current &&
      mapRef.current.queryRenderedFeatures(event.point, {
        layers: [clusterLayer.id, unclusteredPointLayer.id],
      });

    const hoveredFeature = features && features[0];

    const x = offsetX / (w / 2) < 0.8 ? offsetX + 10 : offsetX - 100;
    const y = offsetX / (w / 2) < 0.8 ? offsetY : offsetY + 20;

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x,
            y,
          }
        : null
    );
  }, []);

  const clearHover = useCallback(() => {
    setHoverInfo(null);
    setHoverClusters(null);
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (incidentsNext == null) return;
    const result = await fetchIncidentsNext(incidentsNext);
    if (result.length === 2 && result[0] === null) {
      console.error(`Could not fetch more incidents. ${result[1]}`);
      return;
    }
    setIncidentsNext(result.next);
    setIncidentsResults((prev) => (prev ? prev.concat(result.results) : result.results));
  }, [incidentsNext]);

  const renderTooltip = useCallback(
    (info) => {
      let notShownRows = [];
      let tableRows = [];

      if ("cluster_id" in info.feature.properties) {
        const map = mapRef.current;
        if (map) {
          const mapboxSource = map.getSource("incidents");
          const clusterId = info.feature.properties.cluster_id;

          mapboxSource.getClusterLeaves(
            clusterId,
            100000000,
            0,
            (_, clusters) => {
              if (clusters != null) {
                const allClusters = {};
                for (const x of clusters) {
                  const label = extractShortAddress(x.properties);
                  if (label in allClusters) {
                    allClusters[label] += x.properties.total;
                  } else {
                    allClusters[label] = x.properties.total;
                  }
                }
                setHoverClusters(
                  Object.entries(allClusters).sort((a, b) => b[1] - a[1])
                );
              }
            }
          );

          if (!hoverClusters) return null;

          tableRows = hoverClusters.slice(0, 5);
          notShownRows = hoverClusters.slice(5);
        }
      } else {
        tableRows = [
          [
            extractShortAddress(info.feature.properties),
            info.feature.properties.total,
          ],
        ];
      }

      return (
        <div className="tooltip" style={{ left: info.x, top: info.y }}>
          <div>
            <table className="table is-narrow">
              <thead>
                <tr>
                  <th>Fälle</th>
                  <th>Orte</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((x, i) => (
                  <tr key={i}>
                    <td>{x[1]}</td>
                    <td>{x[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {notShownRows.length > 0 && (
              <p>
                ...und weitere{" "}
                {notShownRows.map((x) => x[1]).reduce((a, b) => a + b)} Fälle
                an {notShownRows.length} Orten.
              </p>
            )}
          </div>
        </div>
      );
    },
    [hoverClusters]
  );

  // FIXME
  let MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (MAPBOX_TOKEN == null || MAPBOX_TOKEN.length < 3) {
    MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
  }

  const sideBarFilter = (
    <div className="box" id="sidebar-filter">
      <div className="is-size-7">
        Durchsuche die Fälle nach Schlagworten wie z. B.{" "}
        <a
          className="is-clickable no-underline"
          onClick={() => setStateAndReload({ q: "Hakenkreuz" })}
        >
          Hakenkreuz
        </a>{" "}
        oder{" "}
        <a
          className="is-clickable no-underline"
          onClick={() => setStateAndReload({ q: '"Brand"' })}
        >
          "Brand"
        </a>
        . Oder wähle einen Ort aus.
      </div>
      <div className="columns is-mobile is-multiline">
        <div className="column is-6-tablet is-12-mobile">
          <SearchInput
            options={
              autocompleteOptions.length > 0
                ? autocompleteOptions
                : initAutocompleteOptions
            }
            cbChange={handleSearchChange}
            cbInputChange={handleInputChange}
            value={q}
          />
        </div>
        <div className="column">
          <LocationInput
            options={
              locationOptions.length > 0 ? locationOptions : initLocationOptions
            }
            cbChange={handleLocationChange}
            cbInputChange={handleInputLocationChange}
          />
        </div>
        <div className="column is-narrow level" style={{ display: "flex" }}>
          <div className="level-item">
            <IconButton
              size="small"
              className="tor-collapse is-size-7"
              onClick={() => setFilterExpanded(!filterExpanded)}
              aria-expanded={filterExpanded}
              aria-label="show more"
            >
              erweitert
              <ExpandMoreIcon
                className={
                  filterExpanded ? "tor-expanded" : "tor-not-expanded"
                }
              />
            </IconButton>
          </div>
        </div>
      </div>

      <Collapse in={filterExpanded} timeout="auto">
        <div className="columns is-mobile" style={{ paddingBottom: "2rem" }}>
          <div className="column is-6-desktop">
            <p className="is-size-7">Zeitraum</p>

            <DateInput
              minMaxDate={minMaxDate}
              startDate={startDate}
              endDate={endDate}
              startCb={(x) => setStateAndReload({ startDate: x })}
              endCb={(x) => setStateAndReload({ endDate: x })}
            />
          </div>
          <div className="column is-narrow ml-1">
            <p className="is-size-7 mb-4 pb-1">Datenquellen</p>
            <OrganizationInput
              organizations={organizations}
              organizationsSelected={organizationsSelected}
              cbChange={(x) =>
                organizations &&
                x.length < organizations.length &&
                setStateAndReload({ organizationsSelected: x })
              }
            />
          </div>
        </div>
      </Collapse>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <>
        <div id="map">
          {initialViewport !== null && viewState !== null && (
            <MapGL
              {...viewState}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/jfilter/ckiuq9h8713g119mq52rus073"
              onMove={(evt) => setViewState(evt.viewState)}
              mapboxAccessToken={MAPBOX_TOKEN}
              interactiveLayerIds={[
                clusterLayer.id,
                unclusteredPointLayer.id,
              ]}
              onClick={handleMapClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={clearHover}
              ref={mapRef}
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
              >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
                <Layer {...unclusteredPointTextLayer} />
              </Source>
              {hoverInfo && renderTooltip(hoverInfo)}
              {highlightPointMap && (
                <Marker
                  longitude={highlightPointMap[0]}
                  latitude={highlightPointMap[1]}
                  anchor="center"
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "black",
                      border: "3px solid white",
                    }}
                  />
                </Marker>
              )}
            </MapGL>
          )}
        </div>
        <div id="sidebar">
          <IncidentList
            setStartDate={(x) =>
              setStateAndReload({ startDate: x, filterExpanded: true })
            }
            setStartEndDate={(x, y) =>
              setStateAndReload({
                startDate: x,
                endDate: y,
                filterExpanded: true,
              })
            }
            sideBarFilter={sideBarFilter}
            histogram={incidentsHistogram}
            results={incidentsResults}
            count={incidentsCount}
            next={incidentsNext}
            minMaxDate={minMaxDate}
            numOrganizations={organizations.length}
            loadMore={handleLoadMore}
            setHighlight={(x) => setHighlightPointMap(x)}
            reset={handleReset}
          />
        </div>
      </>
    </ThemeProvider>
  );
}
