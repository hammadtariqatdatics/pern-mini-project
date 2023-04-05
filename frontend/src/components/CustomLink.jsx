import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ children, url, style }) => {
  return (
    <Link to={url} style={style}>
      {children}
    </Link>
  );
};

export default CustomLink;
