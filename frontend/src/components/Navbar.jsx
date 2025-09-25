import React, { useContext, useState } from "react";
import { AuthDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthDataContext);

  const navigate = useNavigate();

  console.log(user);

  const HandleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <nav className="backdrop-blur-md bg-[#ba699b] shadow-xl px-24 py-4 flex items-center justify-between rounded-b-xl">
      <div className="text-3xl font-light tracking-wide text-white drop-shadow-lg">
        Welcome👋<span className="font-bold">{user?.name}</span>
        <span className="text-sm">({user?.role})</span>
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
  );
}

export default Navbar;

// <nav>
//     //   {/* {user ? (
//     //     <>
//     //       <span>Welcome, {user.name}</span>
//     //       <button className="px-4 py-2 bg-blue-500 text-white" onClick={HandleLogout}>Logout</button>
//     //     </>
//     //   ) : (
//     //     <span>You are not logged in</span>
//     //   )} */}
//     //    {/* <header className="dashboard-header">
//     //         <div className="header-content">
//     //             <h1>Store Ratings</h1>
//     //             {user && (
//     //                 <div className="user-info">
//     //                     <span>Welcome, {user.name} ({user.role})</span>
//     //                     <button onClick={logout} className="btn-secondary">Logout</button>
//     //                 </div>
//     //             )}
//     //         </div>
//     //     </header> */}

//     // </nav>
