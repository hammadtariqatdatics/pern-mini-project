import React from "react";
import MuiButton from "../MuiButton";
import HeroLayout from "./HeroLayout";
import { Typography } from "@mui/material";
import heroBg from "../../assets/img/reading.jpg";
import { Link } from "react-router-dom";
import Theme from "../../theme/Theme";

const Hero = () => {
  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${heroBg})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: "none" }} src={heroBg} alt="increase priority" />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{
          fontFamily: Theme.typography.fontFamily,
          fontWeight: Theme.typography.fontWeightMedium,
          marginBottom: "50px",
        }}
      >
        Welcome to Mini Project
      </Typography>
      <MuiButton
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
      >
        <Link to="/signup" style={{ color: "#fff", textDecoration: "none" }}>
          Register
        </Link>
      </MuiButton>
    </HeroLayout>
  );
};

export default Hero;
