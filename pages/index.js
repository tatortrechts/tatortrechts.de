import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
  fetchChroHisto,
  fetchContent,
  fetchOrganizations,
} from "../utils/networking";

function Home({ content, histoData, orgs }) {
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
      {/* <HistogramSmallMultiple histoData={histoData} orgs={orgs} /> */}
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("home");
  const histo = await fetchChroHisto();
  const orgs = await fetchOrganizations();

  const histoData = {};
  histo.forEach((x) => {
    x["time_interval"] = "year";
    x["date_histogram"] = x["year"];

    if (x["chronicle"] in histoData) {
      histoData[x["chronicle"]] = histoData[x["chronicle"]].concat([x]);
    } else {
      histoData[x["chronicle"]] = [x];
    }
  });
  return { props: { content, histoData, orgs } };
}

export default Home;
