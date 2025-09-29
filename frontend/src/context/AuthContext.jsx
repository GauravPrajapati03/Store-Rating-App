import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else [localStorage.removeItem("user"), localStorage.removeItem("token")];
  }, [token, user]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout, loading };

  return <AuthContext.Provider value={value}>{! loading &&children}</AuthContext.Provider>;
};

export default AuthContext;
