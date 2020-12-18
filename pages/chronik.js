import Head from "next/head";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Map from "../components/Map";

import { fetchOrganizations } from "../utils/networking";

function Karte({ organizations }) {
  return (
    <>
      <NavBar />
      <Map organizations={organizations} />
    </>
  );
}

export async function getServerSideProps() {
  const organizations = await fetchOrganizations();
  return { props: { organizations } };
}

export default Karte;
