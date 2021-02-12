import Head from "next/head";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import {
  fetchAutocomplete,
  fetchLocations,
  fetchMinMaxDate,
  fetchOrganizations,
} from "../utils/networking";

function Karte({
  organizations,
  minMaxDate,
  locationOptions,
  autocompleteOptions,
}) {
  const title = "Karte - Recherche-Tool | Tatort Rechts";
  const description =
    "12 Projekte haben seit 2000 über 16.000 Fälle mit rechtem Bezug registriert. Wir zeigen sie auf einer interaktiven Karte. Ein Projekt von Anna Neifer und Johannes Filter.";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <Map
        organizations={organizations}
        minMaxDate={minMaxDate}
        initLocationOptions={locationOptions}
        initAutocompleteOptions={autocompleteOptions}
      />
    </>
  );
}

export async function getServerSideProps() {
  const [
    organizations,
    minMaxDate,
    locationOptions,
    autocompleteOptions,
  ] = await Promise.all([
    fetchOrganizations(),
    fetchMinMaxDate(),
    fetchLocations(),
    fetchAutocomplete(),
  ]);

  return {
    props: { organizations, minMaxDate, locationOptions, autocompleteOptions },
  };
}

export default Karte;
