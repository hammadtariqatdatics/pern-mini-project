import React from "react";
import { useRoutes } from "react-router-dom";
import { useRoleContext } from "./context/RoleContext";
import { getRoutes } from "./routes";

const App = () => {
  const { role } = useRoleContext();
  const routes = getRoutes(role);
  const router = useRoutes(routes);
  return <>{router};</>;
};

export default App;
