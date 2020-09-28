import "../styles/globals.css";
import "../styles/custom-bulma.scss";

import DayjsUtils from "@date-io/dayjs";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function MyApp({ Component, pageProps }) {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
