import { createMuiTheme } from "@material-ui/core/styles";

const torPrimaryColor = "#a50f15";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: torPrimaryColor,
    },
    secondary: {
      main: torPrimaryColor,
    },
  },
});

export { theme };
