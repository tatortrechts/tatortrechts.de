import Histogram from "../components/Map/Histogram";

export default function HistogramSmallMultiple({ histoData, orgs }) {
  const data = [];
  let minDate = null;
  let maxDate = null;
  let maxForYear = null;

  for (const [key, value] of Object.entries(histoData)) {
    // need to sort to make histogram fill in missing data
    value.sort(function (a, b) {
      return new Date(a.date_histogram) - new Date(b.date_histogram);
    });
    data.push(value);

    value.forEach((x) => {
      if (minDate === null || new Date(x.date_histogram) < minDate)
        minDate = new Date(x.date_histogram);
      if (maxDate === null || new Date(x.date_histogram) > maxDate)
        maxDate = new Date(x.date_histogram);
      if (maxForYear === null || maxForYear < x.total) maxForYear = x.total;
    });
  }

  // sort by total cases
  const sum = (x) => x.map((xx) => xx.total).reduce((a, b) => a + b, 0);

  data.sort((a, b) => sum(b) - sum(a));

  const dataFinal = [];

  for (const x of data) {
    let newDat = x;
    if (new Date(x[0].date_histogram) > minDate) {
      newDat = [
        {
          date_histogram: minDate,
          year: minDate,
          total: 0,
          time_interval: "year",
          chronicle: x[0].chronicle,
        },
      ].concat(newDat);
    }
    if (new Date(x.reverse()[0].date_histogram) < maxDate) {
      newDat = newDat.concat([
        {
          date_histogram: maxDate,
          year: maxDate,
          total: 0,
          time_interval: "year",
          chronicle: x[0].chronicle,
        },
      ]);
    }
    // no idea why i have to sort again, but i have to do it. fuck this shit.
    newDat.sort(function (a, b) {
      return new Date(a.date_histogram) - new Date(b.date_histogram);
    });
    dataFinal.push(newDat);
  }

  return (
    <>
      <div className="columns is-centered is-multiline">
        {dataFinal.map((x) => (
          <div className="column is-3">
            <div>{orgs.filter((xx) => x[0].chronicle == xx.id)[0].name}</div>
            <br />
            <Histogram data={x} yMax={maxForYear} height={200} width={300} />
          </div>
        ))}
      </div>
    </>
  );
}
