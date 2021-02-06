import Head from "next/head";
import Footer from "../components/Footer";
import HistogramSmallMultiple from "../components/HistogramSmallMultiple";
import NavBar from "../components/NavBar";
import {
  fetchChroHisto,
  fetchContent,
  fetchOrganizations,
} from "../utils/networking";

function Projekte({ histoData, orgs, content }) {
  const { seo_title: title, search_description: description } = content.meta;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div className="tor-margin-top"></div>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />

      <HistogramSmallMultiple histoData={histoData} orgs={orgs} />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const [content, histo, orgs] = await Promise.all([
    fetchContent("projekte"),
    fetchChroHisto(),
    fetchOrganizations(),
  ]);

  const histoData = {};
  histo.forEach((x) => {
    x["time_interval"] = "year";
    x["date_histogram"] = x["year"];

    if (x["chronicle"] in histoData) {
      histoData[x["chronicle"]] = histoData[x["chronicle"]].concat([x]);
    } else {
      histoData[x["chronicle"]] = [x];
    }
  });
  return { props: { histoData, orgs, content } };
}

export default Projekte;
