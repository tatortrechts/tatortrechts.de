import Head from "next/head";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Map from "../components/Map";

export default function Home() {
  return (
    <>
      <NavBar />
      <div id="map">
        <Map />
      </div>
    </>
  );
}
