import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
// import signUpSchema from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";

const EditPost = ({ open, onClose, PostId }) => {
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

  // updating post
  const updateData = (payload) => {
    const response = http.put(`/posts/${PostId}`, payload);
    return response;
  };

  const { isLoading, mutate } = useMutation(updateData, {
    onSuccess: (successData) => {
      toast("Post Published...");
      console.log("Post updated successfully...", successData);
    },
    onError: (Error) => {
      console.log("Post is not updated...", Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    status: "",
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
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({});
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container rowSpacing={5} columnSpacing={5}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <CustomTextFields
                    variant="outlined"
                    label="Status"
                    color="secondary"
                    type="text"
                    name="status"
                    value={values.status}
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
                  Edit
                </MuiButton>
                <ToastContainer />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditPost;
