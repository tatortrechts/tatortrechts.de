import Head from "next/head";
import Footer from "../../components/Footer";
import IncidentBox from "../../components/Map/IncidentBox";
import NavBar from "../../components/NavBar";
import { shortTitle } from "../../utils/labels";
import { fetchIncident } from "../../utils/networking";

function IncidentDetail({ incident, rg_id }) {
  const title = shortTitle(incident);
  const description = (
    (incident.title ? incident.title + " - " : "") + incident.description
  ).substring(0, 200);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div className="container">
        <div className="columns is-centered m-5">
          <div className="column is-7">
            <IncidentBox
              x={incident}
              rg_id={rg_id}
              setHighlight={() => console.log("todo")}
            />
            <div className="buttons is-centered mt-5">
              <a href="/karte" className="button a is-primary">
                zur Karte
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query: { rg_id } }) {
  const dec = Buffer.from(rg_id, "base64").toString();
  const incident = await fetchIncident(dec);
  return { props: { incident, rg_id } };
}

export default IncidentDetail;
