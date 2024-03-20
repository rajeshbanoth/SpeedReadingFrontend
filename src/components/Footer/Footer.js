// Footer/Footer.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar sx={{ boxShadow: "none" }} position="static" color="transparent">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="body1" color="inherit" fontFamily={"Poppins"}>
          &copy; {new Date().getFullYear()} Speed Reading
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
