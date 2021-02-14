import Head from "next/head";
import Footer from "../../components/Footer";
import IncidentBox from "../../components/Map/IncidentBox";
import NavBar from "../../components/NavBar";
import { shortTitle } from "../../utils/labels";
import { fetchIncident } from "../../utils/networking";

function IncidentDetail({ incident, incident_id }) {
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
      <div className="tor-margin-top"></div>
      <div className="container">
        <div className="columns is-centered m-5">
          <div className="column is-7">
            <IncidentBox
              x={incident}
              incident_id={incident_id}
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

export async function getServerSideProps({ query: { id } }) {
  const incident = await fetchIncident(id);
  return { props: { incident, incident_id: id } };
}

export default IncidentDetail;
