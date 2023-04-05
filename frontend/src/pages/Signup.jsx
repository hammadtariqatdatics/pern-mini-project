import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import SignupForm from "../components/signupform/SignupForm";

const Signup = () => {
  return (
    <>
      <HeroBanner
        headingText="Sign Up"
        paraText="Here are the Sign Up form, you can become part of our community"
      />
      <SignupForm />
    </>
  );
};

export default Signup;
