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
