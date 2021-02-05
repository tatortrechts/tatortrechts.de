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
  const title = "Karte - Tatort Rechts";
  const description = "Karte - Tatort Rechts";
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
