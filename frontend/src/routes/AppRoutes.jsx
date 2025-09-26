import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";
import User from "../pages/dashboard/User";
import Profile from "../components/Profile";
import Admin from "../pages/dashboard/Admin";
import ProtectedRoute from "../components/ProtectedRoute";
import StoreOwner from "../pages/dashboard/StoreOwner";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute role={["USER"]}>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role={["ADMIN"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/store-owner"
        element={
          <ProtectedRoute role={["OWNER"]}>
            <StoreOwner />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
