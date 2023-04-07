import React from "react";
import { Box, Container } from "@mui/material";
import MuiTypography from "../MuiTypography";

const HeroBanner = ({ headingText, paraText }) => {
  return (
    <Box sx={{ background: "#000", height: "5vh", padding: "100px 0px" }}>
      <Container>
        <MuiTypography
          variant="h2"
          component="h1"
          sx={{ color: "#fff", marginBottom: "20px" }}
          align="center"
          text={headingText}
        />
        <MuiTypography
          variant="h6"
          component="h2"
          sx={{ color: "rgb(255, 51, 102)", textTransform: "capitalize" }}
          align="center"
          text={paraText}
        />
      </Container>
    </Box>
  );
};

export default HeroBanner;
