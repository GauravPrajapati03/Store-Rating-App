import React from "react";

const DashboardLayout = () => {

  return (
    <>

      {/* Dashbord */}
      <div className="bg-gray-100 pt-10 p-6">
        <h1 className="mb-8 ml-[10%] text-3xl font-semibold">Overview</h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[30px] w-[80%] mx-auto mb-10">
          <div className="bg-white border border-gray-300 shadow-xl rounded-md h-28">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-light text-gray-900 mt-3">
                Total Users
              </h2>
              <p className="text-[#ba699b] text-5xl">4</p>
            </div>
          </div>
          <div className="bg-white border border-gray-300 shadow-xl rounded-md h-28">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-light text-gray-900 mt-3">
                Total Stores
              </h2>
              <p className="text-[#ba699b] text-5xl">2</p>
            </div>
          </div>
          <div className="bg-white border border-gray-300 shadow-xl rounded-md h-28">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-light text-gray-900 mt-3">
                Total Ratings
              </h2>
              <p className="text-[#ba699b] text-5xl">6</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
