import React from "react";
import {
  Container,
  Box,
  Grid,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { Form, Formik } from "formik";
import signUpSchema from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import CustomSelectFields from "../CustomSelectFields";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import MuiTypography from "../MuiTypography";
import CustomLink from "../CustomLink";

const SignupForm = () => {
  const navigate = useNavigate();
  const postData = (payload) => http.post("/users/register", payload);
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      console.log("User registered succesfully...", successData);
    },
    onError: (Error) => {
      console.log("User is not registered...", Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    userRole: "",
  };

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({});
            navigate("/verify-otp");
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container rowSpacing={5} columnSpacing={5}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomTextFields
                    variant="outlined"
                    label="Name"
                    color="secondary"
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomTextFields
                    variant="outlined"
                    label="Email"
                    color="secondary"
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomTextFields
                    variant="outlined"
                    label="Phone"
                    color="secondary"
                    type="number"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+92</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomTextFields
                    variant="outlined"
                    label="Password"
                    color="secondary"
                    type="password"
                    placeholder="Your Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <CustomSelectFields
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="User Role"
                      name="userRole"
                      value={values.userRole}
                      onChange={handleChange}
                      color="primary"
                      fullWidth={true}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box marginTop={6}>
                <MuiButton
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                >
                  Submit
                </MuiButton>
              </Box>
              <Box marginTop={5}>
                <MuiTypography text="Have an account - ">
                  <CustomLink
                    url="/login"
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    Login Here
                  </CustomLink>
                </MuiTypography>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
export default SignupForm;
