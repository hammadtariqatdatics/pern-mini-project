import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import VerifyOtpForm from "../components/verifyotp/VerifyOtpForm";
const VerifyOtp = () => {
  return (
    <>
      <HeroBanner
        headingText="OTP VErified"
        paraText="Please verified OTP in order to login into website"
      />
      <VerifyOtpForm />
    </>
  );
};

export default VerifyOtp;
