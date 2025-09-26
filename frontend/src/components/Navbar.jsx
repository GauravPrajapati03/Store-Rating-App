import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useContext(AuthDataContext);
  const navigate = useNavigate();

  const HandleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="backdrop-blur-md bg-gray-800 shadow-2xl px-24 py-4 flex items-center justify-between">
        <div className="text-3xl font-light tracking-wide text-white drop-shadow-lg">
          Admin Dashboard
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-violet-500/30 transition-all duration-200 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <FaUserCircle className="text-2xl text-white drop-shadow" />
            <span className="font-medium text-white">Your Account</span>
            <FaChevronDown className="text-lg text-violet-100" />
          </button>
          <div
            className={`absolute right-0 mt-3 min-w-[190px] bg-white shadow-xl rounded-xl overflow-hidden transition-all transform duration-200 ${
              open
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <a
              href="/profile"
              className="flex px-5 py-3 items-center gap-2 text-gray-700 hover:bg-violet-50 transition-colors text-sm"
            >
              Profile
            </a>
            <a
              href="/settings"
              className="flex px-5 py-3 items-center gap-2 text-gray-700 hover:bg-violet-50 transition-colors text-sm"
            >
              Settings
            </a>
            <button
              className="w-full flex px-5 py-3 items-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 transition-colors text-sm"
              onClick={HandleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
