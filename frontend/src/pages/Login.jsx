import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import LoginForm from "../components/loginform/LoginForm";

const Login = () => {
  return (
    <>
      <HeroBanner
        headingText="Login"
        paraText="Here are the Login, you can login here to visit our website"
      />
      <LoginForm />
    </>
  );
};

export default Login;
