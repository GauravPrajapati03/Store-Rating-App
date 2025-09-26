import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthDataContext);

  if (!user) return <Navigate to="/" replace />;

  if (role && !role.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
