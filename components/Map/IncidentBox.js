import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { shortTitle } from "../../utils/labels";

const Source = ({ name, url, date }) => {
  return (
    <li>
      {url && url.length > 0 && (
        <a target="_blank" href={url}>
          <span>{name}</span>
        </a>
      )}
      {!(url && url.length > 0) && <span> {name} </span>}
      {date && dayjs(date).format("(DD.MM.YYYY)")}
    </li>
  );
};

const TableRow = ({ value, label }) => {
  return (
    <>
      <div className="column is-6">{label}:</div>{" "}
      <div className="column is-6">{value}</div>
    </>
  );
};

const IncidentBox = ({ x, setHighlight, incident_id = null }) => {
  const BOX_MAX_HEIGHT = 300;

  const isDetailsView = incident_id !== null;
  const [expanded, setExpanded] = useState(false);
  const [minBoxHeight, setMinBoxHeight] = useState(BOX_MAX_HEIGHT);
  const boxRef = useRef(null);

  if (!expanded && isDetailsView) setExpanded(true);

  useEffect(() => {
    const newHeight = boxRef.current.clientHeight;
    if (newHeight <= BOX_MAX_HEIGHT * 1.2) {
      setMinBoxHeight(newHeight);
      setExpanded(true);
    }
  }, []);

  return (
    <React.Fragment key={x.id}>
      <div
        className="card has-text-dark"
        key={x.id}
        onMouseEnter={() => setHighlight(x.location.geolocation.coordinates)}
        onMouseLeave={() => setHighlight(null)}
      >
        <Collapse in={expanded} timeout={1000} collapsedSize={minBoxHeight}>
          <div ref={boxRef} style={{ height: "auto" }}>
            <header className="card-header">
              <p className="card-header-title">{shortTitle(x)}</p>
            </header>
            <div className="card-content">
              <div className="columns">
                <div className="column is-three-fifths">
                  {(x.title || x.title_highlighted) && (
                    <p
                      className="content mb-3 has-text-weight-semibold"
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
                  <div
                    className="columns is-multiline is-mobile tor-info-table"
                    style={{ backgroundColor: "#fee0d2", borderRadius: "3px" }}
                  >
                    {[
                      [
                        <a
                          href={
                            x.url.includes("reachoutberlin.de")
                              ? "https://web.archive.org/web/*/" + x.url
                              : x.url
                          }
                          target="_blank"
                        >
                          {x.chronicle.name}
                        </a>,
                        "Projekt",
                      ],
                      [x.location.house_number, "Hausnummer"],
                      [x.location.street, "Straße"],
                      [x.location.city, "Ort"],
                      [x.location.district, "Ortsteil"],
                      [x.location.county, "Landkreis"],
                      [x.tags, "Stichwörter"],
                      [x.factums, "Handlungen"],
                      [x.motives, "Motive"],
                      [x.contexts, "Kontexte"],
                    ]
                      .filter(
                        (xx) =>
                          xx[0] != null &&
                          (typeof xx[0] !== "string" || xx[0].trim().length > 0)
                      )
                      .filter(
                        (xx) =>
                          xx[1] !== "Landkreis" ||
                          (xx[0] !== x.location.city &&
                            xx[0] !== x.location.city + " (Stadt)")
                      )
                      .map((xx) => (
                        <TableRow
                          key={xx[0] + xx[1]}
                          value={xx[0]}
                          label={xx[1]}
                        />
                      ))}

                    <div
                      style={{
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        borderTopWidth: "0.1rem",
                        borderTopStyle: "solid",
                        width: "100%",
                        margin: "0 1rem",
                      }}
                    ></div>

                    <div className="column is-12">
                      Quellen:
                      <ul className="dashed">
                        {x.sources.map((s, i) => (
                          <Source
                            key={s.name + s.date + s.url}
                            name={s.name}
                            url={s.url}
                            date={s.date}
                          />
                        ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        borderTopWidth: "0.1rem",
                        borderTopStyle: "solid",
                        width: "100%",
                        margin: "0 1rem",
                      }}
                    ></div>

                    <div
                      className="p-3 pr-5 is-flex"
                      style={{ marginLeft: "auto" }}
                    >
                      <div className="pr-5" title="Link kopieren">
                        <a
                          target="_blank"
                          href={
                            "/fall/" +
                            (incident_id === null ? x.id : incident_id)
                          }
                          style={{ color: "inherit" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="bi bi-link-45deg"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
                          </svg>
                        </a>
                      </div>

                      <div title="Problem melden">
                        <a
                          target="_blank"
                          href={
                            "https://api.tatortrechts.de/fehler/?incident_id=" +
                            (incident_id === null ? x.id : incident_id)
                          }
                          style={{ color: "inherit" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="is-clickable"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
        {/* don't let them collaspse them */}
        <div
          className={
            "tor-read-more" +
            (expanded ? " tor-is-expaned is-hidden" : " tor-is-collapsed") +
            (isDetailsView ? " is-hidden" : "")
          }
        >
          <IconButton
            size="small"
            className="tor-collapse is-size-7 mt-5"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="mehr anzeigen"
          >
            {expanded ? "weniger anzeigen" : "alles anzeigen"}

            <ExpandMoreIcon
              className={expanded ? "tor-expanded" : "tor-not-expanded"}
            />
          </IconButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IncidentBox;
