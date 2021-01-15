import Head from "next/head";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { fetchContent } from "../../utils/networking";

function Post({ content }) {
  const {
    title,
    article_teaser: description,
    article_image_thumbnail: { url },
  } = content;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content={"https://api.tatortrechts.de" + url}
          key="preview-image"
        />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const content = await fetchContent(slug);
  return { props: { content } };
}

export default Post;
