import React from "react";
import { Stack, Typography } from "@mui/material";

const MuiResponsive = () => {
  return (
    <Stack
      sx={{
        background: {
          lg: "#000",
          md: "#6a5454",
          sm: "#8a0000",
          xs: "#284455",
        },
        width: "300px",
        height: "300px",
        color: "#fff",
      }}
    >
      <Typography variant="h5">heading 5</Typography>
    </Stack>
  );
};

export default MuiResponsive;
