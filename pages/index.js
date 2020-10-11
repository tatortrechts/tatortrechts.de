import Head from "next/head";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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
      {/* <section className="hero">
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
      </section> */}

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
