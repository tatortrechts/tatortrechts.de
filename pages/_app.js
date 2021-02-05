import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import * as deLocale from "dayjs/locale/de";
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/custom-bulma.scss";
import "../styles/globals.css";
import "../styles/mapbox-gl.css";

// https://nextjs.org/docs/api-reference/next/head

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils} locale={deLocale}>
      <Head>
        <link rel="mask-icon" href="/tor_logo.svg" color="blue" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:url" content={"https://tatortrechts.de" + asPath} />
        <meta
          property="og:image"
          content={"https://tatortrechts.de/images/preview.jpg"}
          key="preview-image"
        />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="tatortrechts.de" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="tatortrechts.de" />
        <meta name="twitter:site" content="@tatortrechts" />
        <meta property="fb:app_id" content="100776818676812" />
      </Head>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
