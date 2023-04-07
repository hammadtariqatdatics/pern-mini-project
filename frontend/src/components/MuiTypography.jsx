import React from "react";
import { Typography } from "@mui/material";

const MuiTypography = ({ children, variant, component, align, sx, text }) => {
  return (
    <Typography variant={variant} component={component} align={align} sx={sx}>
      {text}
      {children}
    </Typography>
  );
};

export default MuiTypography;
