import "../styles/globals.css";
import "../styles/custom-bulma.scss";

import DayjsUtils from "@date-io/dayjs";

import * as deLocale from "dayjs/locale/de";

import Head from "next/head";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function MyApp({ Component, pageProps }) {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils} locale={deLocale}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
