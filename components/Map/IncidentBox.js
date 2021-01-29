import * as dayjs from "dayjs";
import { extractShortAddress } from "../../utils/labels";

const Source = ({ name, url, date }) => {
  return (
    <span>
      {name}
      {date && dayjs(date).format(", DD.MM.YYYY")}
      {url && url.length > 0 && (
        <a href={url} className="is-link">
          Link
        </a>
      )}
    </span>
  );
};

const IncidentBox = ({ x, setHighlight }) => {
  return (
    <div
      className="card has-text-dark"
      key={x.id}
      onMouseEnter={() => setHighlight(x.location.geolocation.coordinates)}
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
          <div className="column is-two-thirds">
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
            <div className="p-3" style={{ backgroundColor: "#fee0d2" }}>
              {x.location.house_number && (
                <div>Hausnummer: {x.location.house_number}</div>
              )}
              {x.location.street && <div>Straße: {x.location.street}</div>}
              {x.location.city && <div>Ort: {x.location.city}</div>}
              {x.location.district && (
                <div>Ortsteil: {x.location.district}</div>
              )}
              {x.location.county && <div>Landkreis: {x.location.county}</div>}
              <div>
                {x.sources.length === 1 && <span>Quelle (aus Chronik): </span>}
                {x.sources.length > 1 && <span>Quellen (aus Chronik): </span>}
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
                Chronik: {x.chronicle.name} (<a href={x.url}>Link</a>)
              </div>
              <br></br>
              <div>
                <div>Ortsangaben aus Chronik: {x.orig_city}</div>
              </div>
              {x.tags && <div>Tags: {x.tags}</div>}
              {x.contexts && <div>Kontext: {x.contexts}</div>}
              {x.factums && <div>Handlung: {x.factums}</div>}
              {x.motives && <div>Motiv: {x.motives}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentBox;
