import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!token || !user) return <Navigate to="/" replace />;

  if (role && !role.includes(user?.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
