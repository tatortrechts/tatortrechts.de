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
        <link rel="icon" sizes="192x192" href="/path/to/icon.png" />
        <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png" />
        <link rel="mask-icon" href="/path/to/icon.svg" color="blue" />
        <meta property="og:url" content={"https://tatortrechts.de" + asPath} />
        <meta
          property="og:image"
          content={"https://tatortrechts.de/tor_logo.jpg"}
          key="preview-image"
        />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tatortrechts.de" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Tatortrechts.de" />
        <meta name="twitter:site" content="@tatortrechts" />
        <meta property="fb:app_id" content="100776818676812" />
      </Head>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
