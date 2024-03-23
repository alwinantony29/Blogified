import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const userRole = useSelector((state) => state.user?.role);

  const isAuthenticated = userRole !== null;
  const isAllowed = roles.includes(userRole);

  return (
    <>
      {isAuthenticated && isAllowed ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateRoute;
