import * as dayjs from "dayjs";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { extractShortAddress } from "../../utils/labels";
import Histogram from "./Histogram";

const Source = ({ name, url, date }) => {
  return (
    <span>
      {name}
      {date && dayjs(date).format(", DD.MM.YYYY")}
      {url.length > 0 && (
        <a href={url} className="is-link">
          Link
        </a>
      )}
    </span>
  );
};

const IncidentList = ({
  sideBarFilter,
  histogram,
  results,
  next,
  count,
  loadMore,
  setHighlight,
  minMaxDate,
  numOrganizations,
}) => {
  const containerRef = useRef(null);

  if (count === null) {
    return null;
  }

  return (
    <div id="sidebar-results-outer">
      <div id="sidebar-results" ref={containerRef}>
        {sideBarFilter}
        <div className="box tor-histogram">
          {minMaxDate.total === count && (
            <div className="is-size-7">
              Für den Zeitraum vom{" "}
              <b>{dayjs(minMaxDate.minDate).format("DD.MM.YYYY")}</b> bis{" "}
              <b>{dayjs(minMaxDate.maxDate).format("DD.MM.YYYY")}</b> haben{" "}
              <b>{numOrganizations}</b> Organisationen <b>{count}</b> rechte
              Taten registriert.
            </div>
          )}
          {minMaxDate.total !== count && (
            <div className="is-size-7">
              Auf deine Auwahl entfallen <b>{count}</b> von {minMaxDate.total}{" "}
              registrierte Taten. <a href="#">Auswahl zurücksetzen.</a>
            </div>
          )}
          {count === 1 && (
            <div>
              Am <b>xx.xx.xx</b> gab es <b>eine</b> Tat.
            </div>
          )}
          <div>{histogram && <Histogram data={histogram} />}</div>
        </div>
        <InfiniteScroll
          useWindow={false}
          getScrollParent={() => containerRef.current}
          pageStart={0}
          loadMore={loadMore}
          hasMore={next != null}
        >
          {results &&
            results.map((x) => {
              return (
                <div
                  className="card"
                  key={x.id}
                  onMouseEnter={() =>
                    setHighlight(x.location.geolocation.coordinates)
                  }
                  onMouseLeave={() => setHighlight(null)}
                >
                  <header className="card-header">
                    <p className="card-header-title">
                      {extractShortAddress(x.location)},{" "}
                      {dayjs(x.date).format("DD.MM.YYYY")}
                    </p>
                  </header>
                  <div className="card-content">
                    <div className="columns">
                      <div className="column">
                        {(x.title || x.title_highlighted) && (
                          <p
                            className="content mb-3"
                            dangerouslySetInnerHTML={{
                              __html: x.title || x.title_highlighted,
                            }}
                          ></p>
                        )}
                        <p
                          className="content"
                          dangerouslySetInnerHTML={{
                            __html: x.description || x.description_highlighted,
                          }}
                        ></p>
                      </div>
                      <div className="column content is-size-7">
                        <div className="has-background-info-light p-3">
                          {x.location.house_number && (
                            <div>Hausnummer: {x.location.house_number}</div>
                          )}
                          {x.location.street && (
                            <div>Straße: {x.location.street}</div>
                          )}
                          {x.location.city && <div>Ort: {x.location.city}</div>}
                          {x.location.district && (
                            <div>Ortsteil: {x.location.district}</div>
                          )}
                          {x.location.county && (
                            <div>Landkreis: {x.location.county}</div>
                          )}
                          <div>
                            {x.sources.length === 1 && (
                              <span>Quelle (aus Chronik): </span>
                            )}
                            {x.sources.length > 1 && (
                              <span>Quellen (aus Chronik): </span>
                            )}
                            {x.sources.map((x) => (
                              <Source
                                name={x.name}
                                url={x.url}
                                date={x.date}
                                key={x.name + x.date + x.url}
                              />
                            ))}
                          </div>

                          <div>
                            Chronik: {x.chronicle.name} (
                            <a href={x.url}>Link</a>)
                          </div>
                          <br></br>
                          <div>
                            <div>Ortsangaben aus Chronik: {x.orig_city}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default IncidentList;
