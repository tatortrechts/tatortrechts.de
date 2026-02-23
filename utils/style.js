import { createTheme } from "@mui/material/styles";

const torPrimaryColor = "#a50f15";

const theme = createTheme({
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
