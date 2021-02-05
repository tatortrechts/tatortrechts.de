import Head from "next/head";
import ContentMiddle from "../components/ContentMiddle";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { fetchContent } from "../utils/networking";

function Hintergrund({ content }) {
  const { seo_title: title, search_description: description } = content.meta;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content="http://euro-travel-example.com/thumbnail.jpg"
          key="preview-image"
        />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div className="tor-margin-top"></div>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      <ContentMiddle>
        <div>
          <small>
            Das Vorhaben wurde mit Mitteln des Bundesministeriums für Bildung
            und Forschung unter dem Förderkennzeichen 01IS20S43 gefördert. Die
            Verantwortung für den Inhalt dieser Veröffentlichung liegt bei den
            Autoren.
          </small>
        </div>
        <div className="columns is-centered level mt-5">
          <div className="column is-4">
            <img src="/logo-bmbf.svg" />
          </div>
          <div className="column is-3">
            <img src="/logo-ptf.svg" />
          </div>
        </div>
      </ContentMiddle>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("hintergrund");
  return { props: { content } };
}

export default Hintergrund;
