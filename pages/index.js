import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { fetchContent } from "../utils/networking";

function Home({ content }) {
  const title = content.meta.seo_title;
  const description = content.meta.search_description;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div style={{ position: "relative" }}>
        <img src="/strasse.png" style={{ width: "100%" }}></img>
        {/* <video playsinline autoplay loop mute>
          <source src="/strasse.mov" type="video/mp4" />
        </video> */}
        <div style={{ position: "absolute", top: "500px", left: "500px" }}>
          <h1 class="title has-text-white is-size-1">Tatort Rechts</h1>
          <h2 class="subtitle has-text-white is-size-1">
            Werkzeug für digitale Recherche zu Rechter Gewalt
          </h2>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("home");
  return { props: { content } };
}

export default Home;
