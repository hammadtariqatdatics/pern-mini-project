import * as yup from "yup";

const signUpSchema = yup.object().shape({
  name: yup.string().min(3).max(25).required("Name is required..."),
  email: yup.string().email().required("Email is required..."),
  phone: yup.number().positive().required("Phone number is required..."),
  password: yup.string().required("Password is required..."),
  userRole: yup.string().required("Mention your roles ..."),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required..."),
  password: yup.string().required("Password is required..."),
});

const verifyOTPSchema = yup.object().shape({
  phone: yup.number().positive().required("Phone number is required..."),
  otp: yup.number().positive().required("OTP is required..."),
});

const createPostSchema = yup.object().shape({
  title: yup.string().min(3).max(25).required("Title is required..."),
  content: yup.string().required("Content is required..."),
  createdDate: yup.string().required("Date is required..."),
  status: yup.string().required("Status is required..."),
});

export default signUpSchema;
export { loginSchema, verifyOTPSchema, createPostSchema };
