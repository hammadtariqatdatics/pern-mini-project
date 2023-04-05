import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Facebook, Twitter } from "@mui/icons-material";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Footer = () => {
  return (
    <Box sx={{ background: "#fff5f8" }}>
      <Box
        sx={{
          padding: "64px 0px 64px 0px",
        }}
      >
        <Container>
          <Grid container rowGap={5}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: {
                    xl: "flex-start",
                    lg: "flex-start",
                    md: "flex-start",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                <Box
                  sx={{
                    height: "48px",
                    width: "48px",
                    background: "#ffc071",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  marginRight={2}
                >
                  <Link href="https://www.facebook.com/">
                    <Facebook fontSize="large" />
                  </Link>
                </Box>
                <Box
                  sx={{
                    height: "48px",
                    width: "48px",
                    background: "#ffc071",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link href="https://www.twitter.com/">
                    <Twitter fontSize="large" />
                  </Link>
                </Box>
              </Stack>
              <Typography
                marginTop={4}
                sx={{
                  textAlign: {
                    xl: "left",
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                © Mini Project 2023
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  textAlign: {
                    xl: "left",
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                LEGAL
              </Typography>
              <Box>
                <Box
                  sx={{
                    width: "28px",
                    height: "3px",
                    display: "block",
                    margin: {
                      xl: "8px 0px",
                      lg: "8px 0px",
                      md: "8px 0px",
                      sm: "8px auto",
                      xs: "8px auto",
                    },
                    background: "#000",
                  }}
                />
              </Box>
              <MenuList
                sx={{
                  textAlign: {
                    xl: "left",
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                <Link href="#">
                  <ListItemText>Terms</ListItemText>
                </Link>
                <Link href="#">
                  <ListItemText>Privacy</ListItemText>
                </Link>
              </MenuList>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  textAlign: {
                    xl: "left",
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                LANGUAGE
              </Typography>
              <Box>
                <Box
                  sx={{
                    width: "28px",
                    height: "3px",
                    display: "block",
                    margin: {
                      xl: "8px 0px 20px 0px",
                      lg: "8px 0px 20px 0px",
                      md: "8px 0px 20px 0px",
                      sm: "8px auto 20px auto",
                      xs: "8px auto 20px auto",
                    },
                    background: "#000",
                  }}
                />
              </Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Language"
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
