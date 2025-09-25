import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthDataContext);

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData
      );

      if (res.status === 200) {
        // localStorage.setItem("token", res.data.token);
        const userData = {
          ...res.data.user,
          token: res.data.token,
        };
        login(userData);

        toast.success("Login Successful");
        navigate("/dashboard/user");
      }
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.msg || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-gray-300 flex justify-center items-center">
        <div className="h-[450px] w-[400px] bg-white rounded-2xl p-10 relative">
          <h1 className="text-4xl font-light mb-5 text-center">Login</h1>
          <hr className="border-1 border-[#EAE3E7]" />
          <form onSubmit={HandleSubmit} className="relative">
            <div className="my-6">
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-[100%] px-4 py-[8px] rounded-md border-1 border-[#EAE3E7] placeholder:text-[0.9rem] text-[0.9rem]"
                required
              />
            </div>

            <div className="my-6">
              <label
                htmlFor="password"
                className="text-[#828282] cursor-pointer inline-block mb-1"
              >
                Password
              </label>{" "}
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Your password"
                className="w-[100%] px-4 py-[8px] rounded-md border-1 border-[#EAE3E7] placeholder:text-[0.9rem]"
                required
              />
            </div>
            <a
              href=""
              className="text-[#7F265B] text-sm cursor-pointer absolute top-41 right-0"
            >
              Forgot Password?
            </a>
            <button className="bg-[#a0497e] w-[100%] py-[8px] font-extralight rounded-md text-[#fff] text-[16px] mt-8 cursor-pointer">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-[#7F265B] text-sm cursor-pointer"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
