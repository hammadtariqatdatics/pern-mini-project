import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
// import signUpSchema from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ open, onClose }) {
  const updateData = (payload) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const { id } = loggedInUser;
    const response = http.put(`/users/${id}`, payload);
    return response;
  };

  const { isLoading, mutate } = useMutation(updateData, {
    onSuccess: (successData) => {
      console.log("User updated successfully...", successData);
    },
    onError: (Error) => {
      console.log("User is not updated...", Error);
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
    userRole: "user",
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          //   validationSchema={signUpSchema}
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
                  <CustomTextFields
                    variant="outlined"
                    label="User Role"
                    color="secondary"
                    type="text"
                    name="userRole"
                    value={values.userRole}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                    InputProps={{
                      readOnly: true,
                    }}
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
                  Edit
                </MuiButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
