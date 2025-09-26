import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setLoading(true);

    // Validate name
    if (formData.name.length < 20 || formData.name.length > 60) {
      toast.error("Name must be between 20 and 60 characters");
      setLoading(false);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Validate address
    if (formData.address.length > 400) {
      toast.error("Address cannot exceed 400 characters");
      setLoading(false);
      return;
    }

    // Validate password
    const password = formData.password;
    if (password.length < 8 || password.length > 16) {
      toast.error("Password must be 8 to 16 characters long");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      toast.error(
        "Password must contain at least one special character (!@#$%^&*)"
      );
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        formData
      );

      if (res.status === 201) {
        // localStorage.setItem("token", res.data.token);
        toast.success("Registered successfully");
        navigate("/login");
      }
      setformData({ name: "", email: "", address: "", password: "" });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-gray-300 flex justify-center items-center">
        <div className="h-[530px] w-[400px] bg-white rounded-2xl p-10 relative">
          <h1 className="text-4xl font-light mb-5 text-center">Register</h1>
          <hr className="border-1 border-[#EAE3E7]" />
          <form onSubmit={HandleSubmit} className="relative">
            <div className="my-2">
              <label
                htmlFor="name"
                className="text-[#828282] cursor-pointer inline-block mb-1"
              >
                Name
              </label>{" "}
              <br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={HandleChange}
                placeholder="John Doe"
                className="w-[100%] px-4 py-[8px] rounded-md border-1 border-[#EAE3E7] placeholder:text-[0.9rem] text-[0.9rem]"
                required
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="email"
                className="text-[#828282] cursor-pointer inline-block mb-1"
              >
                Email
              </label>{" "}
              <br />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={HandleChange}
                placeholder="john@gmail.com"
                className="w-[100%] px-4 py-[8px] rounded-md border-1 border-[#EAE3E7] placeholder:text-[0.9rem] text-[0.9rem]"
                required
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="address"
                className="text-[#828282] cursor-pointer inline-block mb-1"
              >
                Address
              </label>
              <br />
              <textarea
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={HandleChange}
                placeholder="Your Address"
                className="w-[100%] px-4 py-[8px] rounded-md border-1 border-[#EAE3E7] placeholder:text-[0.9rem]"
                required
              />
            </div>

            <div className="mb-2 mt-[-10px]">
              <label
                htmlFor="password"
                className="text-[#828282] cursor-pointer inline-block mb-1"
              >
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={HandleChange}
                placeholder="Create password"
                className="w-[100%] px-4 py-[8px] rounded-md border-1 mb-2 border-[#EAE3E7] placeholder:text-[0.9rem]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#a0497e] w-[100%] py-[8px] font-extralight rounded-md mt-1 text-[#fff] text-[16px] cursor-pointer"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-1 text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#7F265B] text-sm cursor-pointer"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
