import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import NavBar from "../navBar/navBar";

const DictionaryDashboard = () => {
  return (
    <Grid container>
      <NavBar />
      <Outlet />
    </Grid>
  );
};

export default DictionaryDashboard;
