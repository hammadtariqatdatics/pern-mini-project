import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import MuiTypography from "./MuiTypography";

const CustomTextFields = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField {...field} {...props} />
      {meta.touched && meta.error ? (
        <MuiTypography
          text={meta.error}
          variant="subtitle2"
          component="h6"
          sx={{ color: "rgb(255, 51, 102)" }}
        />
      ) : null}
    </>
  );
};

export default CustomTextFields;
