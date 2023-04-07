import React from "react";
import AppBar from "../components/header/AppBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

const index = () => {
  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default index;
