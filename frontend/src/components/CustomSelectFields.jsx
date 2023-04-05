import React from "react";
import { useField } from "formik";
import MuiTypography from "./MuiTypography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const CustomSelectFields = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <InputLabel id="demo-simple-select-label">Roles</InputLabel>
      <Select {...field} {...props}>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </Select>
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

export default CustomSelectFields;
