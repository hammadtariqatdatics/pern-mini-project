import React from "react";
import { Container, Box, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import { verifyOTPSchema } from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const VerifyOtpForm = () => {
  const navigate = useNavigate();
  const postData = (payload) => http.post("/users/verify-otp", payload);
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      console.log("OTP verified succesfully...", successData);
    },
    onError: (Error) => {
      console.log("OTP is not verified...", Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    phone: "",
    otp: "",
  };
  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={verifyOTPSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({});
            navigate("/");
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container rowSpacing={5} columnSpacing={5}>
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
                    label="Otp"
                    color="secondary"
                    type="number"
                    placeholder="Your OTP"
                    name="otp"
                    value={values.otp}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <MuiButton
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                  >
                    Send
                  </MuiButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default VerifyOtpForm;
