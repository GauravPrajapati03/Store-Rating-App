import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const {user} = useContext(AuthContext);
  console.log(user);

  if(!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-gray-700">No user data found. Please login.</p>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 w-full max-w-md">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              User Profile
            </h2>
            <p className="text-gray-500">
              This is some information about the user.
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="flex px-8 py-4 items-center">
              <div className="w-32 text-gray-700 font-semibold">Full name</div>
              <div className="text-gray-900">{user.name}</div>
            </div>
            <div className="flex px-8 py-4 items-center">
              <div className="w-32 text-gray-700 font-semibold">
                Email address
              </div>
              <div className="text-gray-900">{user.email}</div>
            </div>
            <div className="flex px-8 py-4 items-center">
              <div className="w-32 text-gray-700 font-semibold">Role</div>
              <div className="text-gray-900">{user.role}</div>
            </div>
            <div className="flex px-8 py-4 items-center">
              <div className="w-32 text-gray-700 font-semibold">Address</div>
              <div className="text-gray-900">{user.address}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
