import Map from "../components/Map";
import NavBar from "../components/NavBar";
import { fetchMinMaxDate, fetchOrganizations } from "../utils/networking";

function Karte({ organizations, minMaxDate }) {
  return (
    <>
      <NavBar />
      <Map organizations={organizations} minMaxDate={minMaxDate} />
    </>
  );
}

export async function getServerSideProps() {
  const [organizations, minMaxDate] = await Promise.all([
    fetchOrganizations(),
    fetchMinMaxDate(),
  ]);

  return { props: { organizations, minMaxDate } };
}

export default Karte;
