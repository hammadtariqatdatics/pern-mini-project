import React from "react";
import { TextField } from "@mui/material";

const MuiTextField = ({
  color,
  variant,
  value,
  sx,
  helperText,
  onChange,
  placeholder,
  name,
  type,
  label,
  fullWidth,
}) => {
  return (
    <TextField
      color={color}
      variant={variant}
      value={value}
      sx={sx}
      helperText={helperText}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      type={type}
      label={label}
      fullWidth={fullWidth}
    />
  );
};

export default MuiTextField;
