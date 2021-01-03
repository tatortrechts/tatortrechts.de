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
  return (
    <>
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
