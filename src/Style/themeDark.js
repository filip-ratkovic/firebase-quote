import { createTheme } from "@mui/material/styles";

export const themeDark = createTheme({
  palette: {
    primary: {
      main: "#2e9959",
      light: "#6bb771",
    },
    secondary : {
      main: "#252d32"
    },
   
    background: "#2c2c2c",
    text: {
      primary: "#f5f4f5",
      secondary: "#d3d1cb",
        // disabled: "#ccc",
    },
  },
});