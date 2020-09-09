import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

const IncidentList = ({ results, next, count, loadMore }) => {
  const containerRef = useRef(null);

  if (count === null) {
    return null;
  }

  return (
    <div id="sidebar-results" ref={containerRef}>
      <div>{count} Treffer</div>
      <InfiniteScroll
        useWindow={false}
        getScrollParent={() => containerRef.current}
        pageStart={0}
        loadMore={loadMore}
        hasMore={next !== null}
      >
        {results.map((x) => {
          return (
            <div className="card" key={x.id}>
              <header className="card-header">
                {x.subdivisions} {x.date} {x.title && x.title}
              </header>
              <div className="card-content">
                <p className="content">{x.description}</p>
              </div>
              <footer className="card-footer">Quelle:</footer>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default IncidentList;
