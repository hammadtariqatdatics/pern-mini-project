import React from "react";
import { Container, Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { createPostSchema } from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";

const PostForm = () => {
  const postData = (payload) => http.post("/posts/create", payload);
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      console.log("Post created succesfully...", successData);
    },
    onError: (Error) => {
      console.log("Post is not created...", Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    title: "",
    content: "",
    createdDate: "",
    status: "pending",
  };
  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={createPostSchema}
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
                    label="Title"
                    color="secondary"
                    type="text"
                    placeholder="Post Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomTextFields
                    variant="outlined"
                    label="Content"
                    color="secondary"
                    type="text"
                    placeholder="Post content"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomTextFields
                    variant="outlined"
                    color="secondary"
                    type="date"
                    name="createdDate"
                    value={values.createdDate}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                  Create
                </MuiButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default PostForm;
