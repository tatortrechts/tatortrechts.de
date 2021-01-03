import Map from "../components/Map";
import NavBar from "../components/NavBar";
import {
  fetchLocations,
  fetchMinMaxDate,
  fetchOrganizations,
} from "../utils/networking";

function Karte({ organizations, minMaxDate, locationOptions }) {
  return (
    <>
      <NavBar />
      <Map
        organizations={organizations}
        minMaxDate={minMaxDate}
        initLocationOptions={locationOptions}
      />
    </>
  );
}

export async function getServerSideProps() {
  const [organizations, minMaxDate, locationOptions] = await Promise.all([
    fetchOrganizations(),
    fetchMinMaxDate(),
    fetchLocations(),
  ]);

  return { props: { organizations, minMaxDate, locationOptions } };
}

export default Karte;
