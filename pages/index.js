import Head from "next/head";
import Footer from "../components/Footer";
import Histogram from "../components/Map/Histogram";
import NavBar from "../components/NavBar";
import {
  fetchChroHisto,
  fetchContent,
  fetchOrganizations,
} from "../utils/networking";

function compareString(item1, item2) {
  var val1 = item1.attr,
    val2 = item2.attr;
  if (val1 == val2) return 0;
  if (val1 > val2) return 1;
  if (val1 < val2) return -1;
}

function Home({ content, histoData, orgs }) {
  const { seo_title: title, search_description: description } = content.meta;
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
    // if (x[0].chronicle == 19) console.log(newDat);
    dataFinal.push(newDat);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content="http://euro-travel-example.com/thumbnail.jpg"
          key="preview-image"
        />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      <div className="columns is-centered is-multiline">
        {dataFinal.map((x) => (
          <div className="column is-3">
            <div>{orgs.filter((xx) => x[0].chronicle == xx.id)[0].name}</div>
            <br />
            <Histogram data={x} yMax={maxForYear} height={200} width={300} />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("home");
  const histo = await fetchChroHisto();
  const orgs = await fetchOrganizations();

  // console.log(histo);
  const histoData = {};

  histo.forEach((x) => {
    x["time_interval"] = "year";
    x["date_histogram"] = x["year"];

    if (x["chronicle"] in histoData) {
      histoData[x["chronicle"]] = histoData[x["chronicle"]].concat([x]);
      // console.log(histo.size());
    } else {
      console.log(histo);
      histoData[x["chronicle"]] = [x];
    }
  });
  return { props: { content, histoData, orgs } };
}

export default Home;
