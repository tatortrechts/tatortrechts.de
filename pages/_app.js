import "../styles/globals.css";
import "../styles/custom-bulma.scss";

import DayjsUtils from "@date-io/dayjs";

import Head from "next/head";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function MyApp({ Component, pageProps }) {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
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
