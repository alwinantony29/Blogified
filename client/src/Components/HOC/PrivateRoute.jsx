import React from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, roles }) => {
  const userRole = useSelector((state) => state.user?.value?.role);
  const isAuthenticated = userRole !== null;
  const isAllowed = roles.includes(userRole);

  return <>{isAuthenticated && isAllowed && children}</>;
};

export default PrivateRoute;
