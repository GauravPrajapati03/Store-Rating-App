import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Navbar from "../../components/Navbar";
import "flowbite";

const Admin = () => {
  return (
    <>
      <Navbar />
      <DashboardLayout />

      {/* Users */}

      <div className="bg-gray-100 px-6">
        <h1 className="mb-6 ml-[10%] text-3xl font-semibold">Manage Users</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-[#363335] dark:bg-[#484747] dark:text-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">Admin</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:scale-110 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline hover:scale-110 ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">Store Owner</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:scale-110 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline hover:scale-110 ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">User</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:scale-110 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline hover:scale-110 ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">Admin</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:scale-110 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline hover:scale-110 ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4">gaurav@example.com</td>
                <td className="px-6 py-4">Pune, Maharashtra</td>
                <td className="px-6 py-4">Admin</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4">gaurav@example.com</td>
                <td className="px-6 py-4">Pune, Maharashtra</td>
                <td className="px-6 py-4">Admin</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stores */}
      <div className="bg-gray-100 px-6 py-10">
        <h1 className="mb-6 ml-[10%] text-3xl font-semibold">Manage Stores</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mx-auto">
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-[#363335] dark:bg-[#484747] dark:text-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Overall Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">5</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:scale-110 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline hover:scale-110 ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200 dark:hover:bg-">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">5</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200 dark:hover:bg-">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">5</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-300 dark:border-white border-gray-200 hover:bg-gray-200 dark:hover:bg-">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4 text-[#000]">gaurav@example.com</td>
                <td className="px-6 py-4 text-[#000]">Pune, Maharashtra</td>
                <td className="px-6 py-4 text-[#000]">5</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>

              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gaurav P
                </th>
                <td className="px-6 py-4">gaurav@example.com</td>
                <td className="px-6 py-4">Pune, Maharashtra</td>
                <td className="px-6 py-4">4</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
               */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;
