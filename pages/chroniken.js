import Head from "next/head";
import ContentMiddle from "../components/ContentMiddle";
import Footer from "../components/Footer";
import HistogramSmallMultiple from "../components/HistogramSmallMultiple";
import NavBar from "../components/NavBar";
import { fetchChroHisto, fetchOrganizations } from "../utils/networking";

function Chroniken({ histoData, orgs }) {
  // const { seo_title: title, search_description: description } = content.meta;
  const title = "Chroniken";
  const description = "";

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
      <ContentMiddle>
        <h1 className="is-size-1">Chroniken</h1>
        <p>
          Auf Tatort Rechts sind Daten von {orgs.length} Projekte. Eine
          Übersicht über die Anzahl und Zeiträume der Daten.
          <br />
          <br />
          Wir sind immer interessiert weitere Datenquellen zu erschließen. Bitte{" "}
          <a href="/kontakt">
            nehmt mit uns Kontakt auf, um weitere Daten hinzuzufügen.
          </a>
        </p>
      </ContentMiddle>

      <HistogramSmallMultiple histoData={histoData} orgs={orgs} />
      <ContentMiddle>
        {/* {orgs.map((x) => {
          return <div>{x.name}</div>;
        })} */}
      </ContentMiddle>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const histo = await fetchChroHisto();
  const orgs = await fetchOrganizations();

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
  return { props: { histoData, orgs } };
}

export default Chroniken;
