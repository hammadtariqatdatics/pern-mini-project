const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const countryCode = "+92";

async function userSMS(phoneNumber) {
  try {
    const otpResponse = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({
        to: `${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    if (otpResponse) {
      console.log(" OTP send successfully", otpResponse);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function userSMSVerify(phoneNumber, otp) {
  try {
    const verifiedResponse = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `${countryCode}${phoneNumber}`,
        code: otp,
      });
    if (verifiedResponse) {
      console.log(" OTP verified successfully", verifiedResponse);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function resendVerifySMS(phoneNumber) {
  try {
    const otpResponse = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.update({
        to: `${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    if (otpResponse) {
      console.log(" OTP resend successfully", otpResponse);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { userSMS, userSMSVerify, resendVerifySMS };
