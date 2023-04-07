import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const roleContext = createContext();

const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const value = {
    role,
    setRole,
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setRole(loggedInUser.userRole);
      navigate(location.pathname);
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
