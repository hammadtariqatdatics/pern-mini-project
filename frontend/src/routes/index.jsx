import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout";
import HOME_PAGE from "../pages/Home";
import LOGIN_PAGE from "../pages/Login";
import SIGNUP_PAGE from "../pages/Signup";
import VERIFY_OTP_PAGE from "../pages/VerifyOtp";
import USERS_PAGE from "../pages/Users";
import CREATE_POST_PAGE from "../pages/CreatePost";
import VIEW_POST_PAGE from "../pages/ViewPost";

const adminRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LOGIN_PAGE />,
      },
      {
        path: "home",
        element: <HOME_PAGE />,
      },
      {
        path: "signup",
        element: <SIGNUP_PAGE />,
      },
      {
        path: "users",
        element: <USERS_PAGE />,
      },
      {
        path: "verify-otp",
        element: <VERIFY_OTP_PAGE />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const userRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LOGIN_PAGE />,
      },
      {
        path: "home",
        element: <HOME_PAGE />,
      },
      {
        path: "login",
        element: <LOGIN_PAGE />,
      },
      {
        path: "signup",
        element: <SIGNUP_PAGE />,
      },
      {
        path: "create-post",
        element: <CREATE_POST_PAGE />,
      },
      {
        path: "verify-otp",
        element: <VERIFY_OTP_PAGE />,
      },
      {
        path: "view-post",
        element: <VIEW_POST_PAGE />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const unauthorizedRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LOGIN_PAGE />,
      },
      {
        path: "signup",
        element: <SIGNUP_PAGE />,
      },
      {
        path: "home",
        element: <HOME_PAGE />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const ROLES_ROUTES = {
  user: userRoutes,
  admin: adminRoutes,
  undefined: unauthorizedRoutes,
};

const ROLES_NAMES = {
  user: "userRoutes",
  admin: "adminRoutes",
  undefined: "unauthorizedRoutes",
};

export const getRoutes = (role) => {
  console.log({ role: ROLES_NAMES[role] });
  return ROLES_ROUTES[role] ?? unauthorizedRoutes;
};
