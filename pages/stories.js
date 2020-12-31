import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
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
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you're currently reading
          </h2>
        </div>
      </section>
      <Footer />
    </>
  );
}
