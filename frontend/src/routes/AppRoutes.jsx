import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";
import User from "../pages/dashboard/User";
import Profile from "../components/Profile";
import Admin from "../pages/dashboard/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<User />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/store-owner" element={<h1>Store Owner Dashboard</h1>} />
    </Routes>
  );
};

export default AppRoutes;
