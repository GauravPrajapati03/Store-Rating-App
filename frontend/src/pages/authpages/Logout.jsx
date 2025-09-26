import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        toast.success("Logout successful");
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return <></>;
};

export default Logout;
