import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { fetchContent } from "../utils/networking";

function Kontakt({ content }) {
  const { seo_title: title, search_description: description } = content.meta;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div className="tor-margin-top"></div>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("kontakt");
  return { props: { content } };
}

export default Kontakt;
