import React from "react";
import { Container, Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { loginSchema } from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRoleContext } from "../../context/RoleContext";
import MuiTypography from "../MuiTypography";
import CustomLink from "../CustomLink";

const LoginForm = () => {
  const navigate = useNavigate();
  // const { setRole } = useRoleContext();

  const postData = (payload) => http.post("/users/login", payload);
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      console.log("User Login succesfully...", successData);
      const { id, email, userRole, token } = successData.data;
      // setRole(userRole);
      const userObj = {
        id: id,
        email: email,
        userRole: userRole,
        token: token,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(userObj));
      navigate("/home");
    },
    onError: (Error) => {
      console.log("User is not Logged In...", Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({});
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container rowSpacing={5} columnSpacing={5}>
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
              </Grid>
              <Box marginTop={6}>
                <MuiButton
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                >
                  Login
                </MuiButton>
              </Box>
              <Box marginTop={5}>
                <MuiTypography text="Dont't have an account - ">
                  <CustomLink
                    url="/signup"
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    SignUp Here
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
export default LoginForm;
