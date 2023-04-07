import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import GLogout from "../components/googleAuth/GLogout";

const Login = () => {
  return (
    <>
      <HeroBanner
        headingText="Logout"
      />
      <GLogout />
    </>
  );
};

export default Login;
