import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as dayjs from "dayjs";
import { useState } from "react";
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
  if (!value) return null;

  return (
    <>
      <div className="column is-6">{label}:</div>{" "}
      <div className="column is-6">{value}</div>
    </>
  );
};

const IncidentBox = ({ x, setHighlight, rg_id = null }) => {
  const isDetailsView = rg_id !== null;
  const [expanded, setExpanded] = useState(false);
  if (!expanded && isDetailsView) setExpanded(true);

  return (
    <>
      <div
        className="card has-text-dark"
        key={x.id}
        onMouseEnter={() => setHighlight(x.location.geolocation.coordinates)}
        onMouseLeave={() => setHighlight(null)}
      >
        <Collapse in={expanded} timeout={1000} collapsedHeight={200}>
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
                      <a href={x.url} target="_blank">
                        {x.chronicle.name}
                      </a>,
                      "Chronik",
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
                  ].map((xx) => (
                    <TableRow value={xx[0]} label={xx[1]} />
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
                      {x.sources.map((x) => (
                        <Source
                          name={x.name}
                          url={x.url}
                          date={x.date}
                          key={x.name + x.date + x.url}
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
                    style={{ "margin-left": "auto" }}
                  >
                    <div className="pr-5" title="Link kopieren">
                      <a
                        target="_blank"
                        href={
                          "/tat/" + (rg_id === null ? btoa(x.rg_id) : rg_id)
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
                          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                        </svg>
                      </a>
                    </div>

                    <div title="Problem melden">
                      <a
                        target="_blank"
                        href={
                          "https://api.tatortrechts.de/fehler/?rg_id=" +
                          (rg_id === null ? btoa(x.rg_id) : rg_id)
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
        </Collapse>
        <div
          className={
            "tor-read-more" +
            (expanded ? " tor-is-expaned" : " tor-is-collapsed") +
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
    </>
  );
};

export default IncidentBox;
