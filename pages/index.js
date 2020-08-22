import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <body>
      <div className="without_footer">
        <NavBar />
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Hero title</h1>
              <h2 className="subtitle">Hero subtitle</h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title">Section</h1>
            <h2 className="subtitle">
              A simple container to divide your page into
              <strong>sections</strong>, like the one you're currently reading
            </h2>
          </div>
        </section>
      </div>
      <Footer />
    </body>
  );
}
