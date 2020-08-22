import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Map from "../components/Map";

export default function Home() {
  return (
    <body>
      <div id="without_footer">
        <NavBar />
        <div id="map">
          <Map />
        </div>
      </div>
    </body>
  );
}
