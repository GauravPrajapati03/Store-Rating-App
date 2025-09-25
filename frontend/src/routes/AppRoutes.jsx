import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";
import User from "../pages/dashboard/User";
import Profile from "../components/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/dashboard/user" element={<User />} />
      <Route path="/dashboard/admin" element={<h1>Admin Dashboard</h1>} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/dashboard/store-owner"
        element={<h1>Store Owner Dashboard</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
