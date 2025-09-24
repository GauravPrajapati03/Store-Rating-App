import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard/user" element={<h1>User Dashboard</h1>} />
        <Route path="/dashboard/admin" element={<h1>Admin Dashboard</h1>} />
        <Route
          path="/dashboard/store-owner"
          element={<h1>Store Owner Dashboard</h1>}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
