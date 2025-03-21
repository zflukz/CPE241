// src/components/Navbar.tsx
import React, { useState } from "react";
import { IoMdAirplane, IoIosLogOut  } from "react-icons/io";
import { BiSolidCoupon, BiSolidReport } from "react-icons/bi";
import { HiMiniUserGroup, HiUserCircle  } from "react-icons/hi2";
import { AiFillPieChart } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`flex flex-col items-center space-y-6 p-6 bg-white shadow-md transition-all duration-100
        ${isExpanded ? "w-64" : "w-16"} min-h-screen`} 
      onMouseEnter={() => setIsExpanded(true)} 
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Icon 1: Placeholder for Chicken Logo */}
      <div className="w-max flex">
        <img src="images/logo/logo.png" width={50} alt=""/>
        {isExpanded && <h2 className="text-xl font-bold mt-2 ml-2">OakAirline</h2>}
      </div>

      {/* Dashboard Section */}
      <div className="mt-8 text-black">
        {isExpanded && <h3 className="text-sm font-semibold">Dashboards</h3>}
        <div className="space-y-4 ">
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg px-4 ${isExpanded ? "mt-4 hover:bg-[#D4D4D4] transition-colors duration-500" : ""}`}>
            <AiFillPieChart className="text-[22px]"/>
            {isExpanded && <span>Default</span>}
          </div>
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg px-4 ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <BiSolidReport className="text-[22px]"/>
            {isExpanded && <span>Reports & Analytics</span>}
          </div>
        </div>
      </div>

      {/* Pages Section */}
      <div className="mt-8">
        {isExpanded && <h3 className="text-sm font-semibold">Pages</h3>}
        <div className="space-y-4">
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg px-4 ${isExpanded ? "mt-4 hover:bg-[#D4D4D4] transition-colors duration-500" : ""}`}>
            <IoMdAirplane className="text-[22px]" />
            {isExpanded && <span>Manage Flights</span>}
          </div>
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg px-4 ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <BiSolidCoupon className="text-[22px]"/>
            {isExpanded && <span>Manage Booking</span>}
          </div>
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg px-4 ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <HiMiniUserGroup className="text-[22px]"/>
            {isExpanded && <span>User Management</span>}
          </div>
        </div>
      </div>

      {/* User Mode */}
      <div className="">
        <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg bg-gray-100 ${isExpanded ? "hover:bg-[#D4D4D4] transition-colors duration-500 px-12" : ""}`}>
          <HiUserCircle className="text-[22px]"/>
          {isExpanded && <span>SaMuii72</span>}
        </div>
        <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg border-2 mt-4 ${isExpanded ? "hover:bg-[#D4D4D4] transition-colors duration-500 px-12" : ""}`}>
          <IoIosLogOut className="text-[22px]"/>
          {isExpanded && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
