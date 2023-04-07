import React from "react";
import { Grid, Box, Typography } from "@mui/material";
const MuiGrid = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Box>
          <Typography variant="h6">Box 1</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Box>
          <Typography variant="h6">Box 2</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Box>
          <Typography variant="h6">Box 3</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Box>
          <Typography variant="h6">Box 4</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MuiGrid;
