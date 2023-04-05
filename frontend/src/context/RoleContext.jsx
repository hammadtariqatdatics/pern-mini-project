import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const roleContext = createContext();

const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const value = {
    role,
    setRole,
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    // console.log(loggedInUser);
    if (loggedInUser) {
      setRole(loggedInUser.userRole);
    } else {
      navigate("/");
    }
  }, []);

  return <roleContext.Provider value={value}>{children}</roleContext.Provider>;
};

const useRoleContext = () => {
  const isRole = useContext(roleContext);
  if (!isRole) {
    console.log("Need a provider");
  }
  return isRole;
};

export { RoleProvider, useRoleContext };
