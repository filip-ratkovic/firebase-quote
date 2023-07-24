import React from "react";
import {  useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import Nav from "../Pages/Nav/Nav";

function Layout(props) {
  const theme = useTheme();

  return (
    <Box style={{ backgroundColor: theme.palette.background, minHeight: "100vh"}}>
      <Nav />
      <Box p={5} bgcolor={theme.palette.background}
       style={{display:"flex", justifyContent: "center", alignItems:"center"}}>
        {props.children}
      </Box>
    </Box>
  );
}

export default Layout;
